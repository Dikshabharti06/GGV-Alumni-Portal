from fastapi import APIRouter, HTTPException, Request, Depends

from lib.db import db
from lib.security import current_user, require_admin
from lib.utils import HIDDEN_ALUMNI_FIELDS
from models.schemas import ProfileUpdate

router = APIRouter()


@router.get("/alumni")
async def alumni(
    request: Request, q: str = "", department: str = "", user=Depends(current_user)
):
    query = {"verified": True}
    if q:
        query["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"company": {"$regex": q, "$options": "i"}},
            {"headline": {"$regex": q, "$options": "i"}},
        ]
    if department:
        query["department"] = department
    docs = (
        await db.alumni.find(query, HIDDEN_ALUMNI_FIELDS)
        .sort("name", 1)
        .to_list(100)
    )
    return docs


@router.get("/alumni/spotlight")
async def alumni_spotlight():
    return (
        await db.alumni.find({"verified": True}, HIDDEN_ALUMNI_FIELDS)
        .sort("name", 1)
        .limit(6)
        .to_list(6)
    )


@router.get("/alumni/{alumni_id}")
async def alumni_detail(alumni_id: str, user=Depends(current_user)):
    doc = await db.alumni.find_one(
        {"id": alumni_id, "verified": True}, HIDDEN_ALUMNI_FIELDS
    )
    if not doc:
        raise HTTPException(404, "Alumni profile not found")
    return doc


@router.put("/alumni/{alumni_id}")
async def update_alumni(
    alumni_id: str, data: ProfileUpdate, user=Depends(require_admin)
):
    update = {k: v for k, v in data.model_dump().items() if v is not None}
    await db.alumni.update_one({"id": alumni_id}, {"$set": update})
    return {"ok": True}


@router.post("/alumni/{alumni_id}/claim")
async def claim(alumni_id: str, user=Depends(current_user)):
    if user["role"] != "alumni":
        raise HTTPException(403, "Alumni accounts can claim profiles")
    result = await db.alumni.update_one(
        {"id": alumni_id, "email": user["email"]}, {"$set": {"claimed": True}}
    )
    if not result.modified_count:
        raise HTTPException(404, "No matching alumni record found for this account")
    return {"ok": True}
