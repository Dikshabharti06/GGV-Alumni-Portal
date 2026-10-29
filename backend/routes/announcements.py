from fastapi import APIRouter, Depends

from lib.db import db
from lib.security import current_user

router = APIRouter()


@router.get("/announcements")
async def announcements(user=Depends(current_user)):
    return await db.announcements.find({}, {"_id": 0}).sort("id", -1).to_list(20)
