from fastapi import APIRouter, HTTPException, Request, Response, Depends
from datetime import datetime, timezone, timedelta
import uuid

from lib.db import db
from lib.security import hash_password, verify_password, token_for, public_user, current_user
from lib.utils import now
from models.schemas import AuthInput

router = APIRouter()


@router.post("/auth/register")
async def register(data: AuthInput, response: Response):
    if data.role not in ("student", "alumni", "college faculty"):
        raise HTTPException(
            status_code=400,
            detail="Choose a valid account role",
        )
    email = data.email.lower()
    if await db.users.find_one({"email": email}):
        raise HTTPException(409, "An account with this email already exists")
    user = {
        "id": str(uuid.uuid4()),
        "email": email,
        "password_hash": hash_password(data.password),
        "name": data.name or "New member",
        "role": data.role,
        "status": "active",
        "created_at": now(),
    }
    await db.users.insert_one(user)
    response.set_cookie(
        "access_token", token_for(user), httponly=True, samesite="lax", max_age=172800
    )
    return public_user(user)


@router.post("/auth/login")
async def login(data: AuthInput, response: Response, request: Request):
    identifier = (
        f"{request.client.host if request.client else 'unknown'}:{data.email.lower()}"
    )
    attempt = await db.login_attempts.find_one({"identifier": identifier}, {"_id": 0})
    if attempt and attempt.get("locked_until") and attempt["locked_until"] > now():
        raise HTTPException(429, "Too many attempts. Please try again in 15 minutes.")
    user = await db.users.find_one({"email": data.email.lower()}, {"_id": 0})
    if not user or not verify_password(data.password, user["password_hash"]):
        failures = (attempt.get("failures", 0) if attempt else 0) + 1
        update = {"identifier": identifier, "failures": failures, "last_failed": now()}
        if failures >= 5:
            update["locked_until"] = (
                datetime.now(timezone.utc) + timedelta(minutes=15)
            ).isoformat()
        await db.login_attempts.update_one(
            {"identifier": identifier}, {"$set": update}, upsert=True
        )
        raise HTTPException(401, "Email or password is incorrect")
    await db.login_attempts.delete_one({"identifier": identifier})
    response.set_cookie(
        "access_token", token_for(user), httponly=True, samesite="lax", max_age=172800
    )
    return public_user(user)


@router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"ok": True}


@router.get("/auth/me")
async def me(user=Depends(current_user)):
    return public_user(user)
