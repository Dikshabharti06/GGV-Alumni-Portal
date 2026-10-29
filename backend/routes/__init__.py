from fastapi import APIRouter

from routes import auth, dashboard, alumni, announcements, events, admin, student

api = APIRouter(prefix="/api")


@api.get("/")
async def root():
    return {"message": "GGV Alumni Portal"}


api.include_router(auth.router)
api.include_router(dashboard.router)
api.include_router(alumni.router)
api.include_router(announcements.router)
api.include_router(events.router)
api.include_router(admin.router)
api.include_router(student.router)
