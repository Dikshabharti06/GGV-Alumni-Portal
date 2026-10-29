from fastapi import APIRouter, HTTPException, Depends

from lib.db import db
from lib.security import current_user

router = APIRouter()


@router.post("/student/graduate")
async def graduate(user=Depends(current_user)):
    if user["role"] != "student":
        raise HTTPException(403, "Only students can request alumni transition")
    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {"role": "alumni", "status": "pending_verification"}},
    )
    return {
        "ok": True,
        "message": "Your alumni transition request has been submitted for verification.",
    }
