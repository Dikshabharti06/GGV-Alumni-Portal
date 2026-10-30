from fastapi import APIRouter, Depends

from lib.db import db
from lib.security import current_user, public_user

router = APIRouter()


@router.get("/dashboard/public")
async def public_dashboard():
    return {
        "alumni_count": await db.alumni.count_documents({"verified": True}),
        "mentor_count": await db.alumni.count_documents(
            {"mentorship": True, "verified": True}
        ),
        "announcement_count": await db.announcements.count_documents({}),
    }


@router.get("/dashboard")
async def dashboard(user=Depends(current_user)):
    return {
        "user": public_user(user),
        "alumni_count": await db.alumni.count_documents({"verified": True}),
        "mentor_count": await db.alumni.count_documents(
            {"mentorship": True, "verified": True}
        ),
        "announcement_count": await db.announcements.count_documents({}),
    }
