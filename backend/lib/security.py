from fastapi import HTTPException, Request, Depends
from datetime import datetime, timezone, timedelta
import os, bcrypt, jwt

from lib.db import db

JWT_ALGORITHM = "HS256"


def hash_password(value):
    return bcrypt.hashpw(value.encode(), bcrypt.gensalt()).decode()


def verify_password(value, hashed):
    return bcrypt.checkpw(value.encode(), hashed.encode())


def token_for(user):
    payload = {
        "sub": user["id"],
        "email": user["email"],
        "role": user["role"],
        "exp": datetime.now(timezone.utc) + timedelta(days=2),
        "type": "access",
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def public_user(user):
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user.get("name", "Member"),
        "role": user["role"],
        "status": user.get("status", "active"),
    }


async def current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(401, "Please sign in to continue")
    try:
        payload = jwt.decode(
            token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM]
        )
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0})
        if not user:
            raise HTTPException(401, "Account not found")
        return user
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Your session has expired")


def require_admin(user=Depends(current_user)):
    if user["role"] != "admin":
        raise HTTPException(403, "Administrator access required")
    return user
