import json, os, uuid
from pathlib import Path

from lib.db import db
from lib.security import hash_password
from lib.utils import now

ALUMNI_FILE = Path(__file__).parent.parent / "data" / "alumni_data.json"
ALUMNI_SOURCE = "nexus_alumni_data"


async def seed_alumni():
    """Load the official alumni list (data/alumni_data.json).

    Runs only when the official list is not in the database yet. It replaces any
    older sample alumni, and never runs again afterwards, so edits made by the
    admin are kept across restarts.
    """
    if await db.alumni.count_documents({"source": ALUMNI_SOURCE}) > 0:
        return
    records = json.loads(ALUMNI_FILE.read_text(encoding="utf-8"))
    for item in records:
        item["created_at"] = now()
    await db.alumni.delete_many({})
    await db.alumni.insert_many(records)


async def seed():
    await db.users.create_index("email", unique=True)
    if not await db.users.find_one({"email": os.environ["ADMIN_EMAIL"]}):
        await db.users.insert_one(
            {
                "id": str(uuid.uuid4()),
                "email": os.environ["ADMIN_EMAIL"],
                "password_hash": hash_password(os.environ["ADMIN_PASSWORD"]),
                "name": "Portal Administrator",
                "role": "admin",
                "status": "active",
                "created_at": now(),
            }
        )
    await seed_alumni()
    if await db.announcements.count_documents({}) == 0:
        await db.announcements.insert_many(
            [
                {
                    "id": "n1",
                    "title": "GGV Alumni Meet 2026",
                    "body": "Reconnect, reminisce, and shape the next chapter of our university community.",
                    "category": "Reunion",
                    "date": "12 Dec 2026",
                },
                {
                    "id": "n2",
                    "title": "Mentorship circle is open",
                    "body": "Alumni volunteers are now welcoming conversations with students across disciplines.",
                    "category": "Mentorship",
                    "date": "This month",
                },
                {
                    "id": "n3",
                    "title": "Industry connects: Energy & Environment",
                    "body": "Join the university–industry dialogue led by our alumni network.",
                    "category": "Workshop",
                    "date": "28 Nov 2026",
                },
            ]
        )
