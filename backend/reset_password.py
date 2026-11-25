"""Reset the password of any account.

Run from the backend folder (with the virtual environment active):
    python reset_password.py user@example.com "NewPassword123"
"""
from dotenv import load_dotenv

load_dotenv()

import asyncio
import os
import sys

from lib.db import client, db
from lib.security import hash_password


async def main(email, password):
    if len(password) < 6:
        sys.exit("Password must be at least 6 characters.")
    result = await db.users.update_one(
        {"email": email.strip().lower()},
        {"$set": {"password_hash": hash_password(password)}},
    )
    if not result.matched_count:
        sys.exit(f"No account found with email {email}")
    await db.login_attempts.delete_many({})  # also clears any 15-minute lockout
    print(f"Password updated for {email}. You can sign in now.")
    client.close()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit('Usage: python reset_password.py <email> "<new password>"')
    asyncio.run(main(sys.argv[1], sys.argv[2]))
