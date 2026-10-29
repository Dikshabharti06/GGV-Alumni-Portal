import os, uuid

from lib.db import db
from lib.security import hash_password
from lib.utils import now


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
    if await db.alumni.count_documents({}) == 0:
        seeds = [
            {
                "id": "a1",
                "name": "Dr. Ananya Sharma",
                "email": "ananya.sharma@ggu.ac.in",
                "contact": "9876500001",
                "headline": "Research Scientist · Sustainable Materials",
                "company": "CSIR-NCL, Pune",
                "location": "Pune, Maharashtra",
                "graduation_year": "2012",
                "department": "School of Engineering & Technology",
                "bio": "Building a more sustainable future through materials research.",
                "mentorship": True,
                "verified": True,
                "claimed": False,
            },
            {
                "id": "a2",
                "name": "Rahul Verma",
                "email": "rahul.verma@alumni.ggu.ac.in",
                "contact": "9876500002",
                "headline": "Product Leader · Fintech",
                "company": "BharatPay",
                "location": "Bengaluru, Karnataka",
                "graduation_year": "2017",
                "department": "Department of Computer Science & Engineering",
                "bio": "Helping young builders turn campus ideas into products.",
                "mentorship": True,
                "verified": True,
                "claimed": False,
            },
            {
                "id": "a3",
                "name": "Meera Ekka",
                "email": "meera.ekka@alumni.ggu.ac.in",
                "contact": "9876500003",
                "headline": "IAS Officer · Public Administration",
                "company": "Government of Chhattisgarh",
                "location": "Raipur, Chhattisgarh",
                "graduation_year": "2010",
                "department": "Department of Political Science",
                "bio": "Serving communities and staying connected to the GGV family.",
                "mentorship": False,
                "verified": True,
                "claimed": False,
            },
            {
                "id": "a4",
                "name": "Arjun Singh",
                "email": "arjun.singh@alumni.ggu.ac.in",
                "contact": "9876500004",
                "headline": "Founder · ClimateTech Entrepreneur",
                "company": "GreenGrid Labs",
                "location": "New Delhi",
                "graduation_year": "2019",
                "department": "Department of Energy & Environmental Engineering",
                "bio": "Working at the intersection of technology and climate action.",
                "mentorship": True,
                "verified": True,
                "claimed": False,
            },
        ]
        for item in seeds:
            item["created_at"] = now()
        await db.alumni.insert_many(seeds)
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
