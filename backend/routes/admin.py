from fastapi import APIRouter, HTTPException, Depends
import re, uuid

from lib.db import db
from lib.security import require_admin
from lib.utils import now
from models.schemas import AnnouncementInput, AlumniRecord

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


def clean_alumni(data: AlumniRecord):
    record = {k: v.strip() if isinstance(v, str) else v for k, v in data.model_dump().items()}
    if len(record["name"]) < 2:
        raise HTTPException(400, "Enter the alumni name")
    record["email"] = record["email"].lower()
    if record["email"] and not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", record["email"]):
        raise HTTPException(400, "Enter a valid email address")
    return record


@router.get("/admin/alumni")
async def admin_alumni(user=Depends(require_admin)):
    return await db.alumni.find({}, {"_id": 0}).sort("name", 1).to_list(2000)


@router.post("/admin/alumni")
async def admin_add_alumni(data: AlumniRecord, user=Depends(require_admin)):
    record = clean_alumni(data)
    record.update(
        {
            "id": "a" + uuid.uuid4().hex[:8],
            "verified": True,
            "claimed": False,
            "source": "admin",
            "created_at": now(),
        }
    )
    item = dict(record)
    await db.alumni.insert_one(record)
    return item


@router.put("/admin/alumni/{alumni_id}")
async def admin_update_alumni(
    alumni_id: str, data: AlumniRecord, user=Depends(require_admin)
):
    record = clean_alumni(data)
    result = await db.alumni.update_one({"id": alumni_id}, {"$set": record})
    if not result.matched_count:
        raise HTTPException(404, "Alumni record not found")
    return await db.alumni.find_one({"id": alumni_id}, {"_id": 0})


@router.delete("/admin/alumni/{alumni_id}")
async def admin_delete_alumni(alumni_id: str, user=Depends(require_admin)):
    result = await db.alumni.delete_one({"id": alumni_id})
    if not result.deleted_count:
        raise HTTPException(404, "Alumni record not found")
    return {"ok": True}
