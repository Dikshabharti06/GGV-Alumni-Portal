from fastapi import APIRouter, Depends

from lib.security import current_user

router = APIRouter()


@router.get("/events")
async def events(user=Depends(current_user)):
    return [
        {
            "id": "e1",
            "title": "GGV Alumni Meet 2026",
            "date": "12 December 2026",
            "location": "University Campus, Bilaspur",
            "type": "Reunion",
        },
        {
            "id": "e2",
            "title": "Career Bridge: Industry Connect",
            "date": "28 November 2026",
            "location": "Virtual · GGV Alumni Network",
            "type": "Industry",
        },
    ]
