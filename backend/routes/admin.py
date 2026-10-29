from fastapi import APIRouter, Depends
import uuid

from lib.db import db
from lib.security import require_admin
from models.schemas import AnnouncementInput

router = APIRouter()


@router.post("/admin/announcements")
async def add_announcement(data: AnnouncementInput, user=Depends(require_admin)):
    item = {"id": str(uuid.uuid4()), **data.model_dump(), "date": "Just now"}
    response_item = dict(item)
    await db.announcements.insert_one(item)
    return response_item


@router.get("/admin/pending")
async def pending(user=Depends(require_admin)):
    return await db.alumni.find({"verified": False}, {"_id": 0, "contact": 0}).to_list(
        100
    )
