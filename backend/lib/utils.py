from datetime import datetime, timezone


def now():
    return datetime.now(timezone.utc).isoformat()


# Personal details that are stored for each alumnus but never sent to the website.
HIDDEN_ALUMNI_FIELDS = {"_id": 0, "contact": 0, "email": 0, "address": 0, "enrollment": 0}
