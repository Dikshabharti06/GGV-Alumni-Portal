# GGV Alumni Network — corrected starter project

A React/Vite frontend inspired by the supplied GGV Alumni Network screenshot, with a FastAPI + MongoDB API.

## Features included

- Responsive landing page with a campus-gate hero, GGV brand treatment, feature cards and career-bridge section.
- Role-aware sign-in and separate admin/student/alumni experiences.
- Student registration; administrator accounts are created through environment configuration and cannot be self-registered.
- Authenticated alumni directory with contact information excluded from directory/detail API responses.
- Alumni mentorship opt-in endpoint with server-side role and profile-ownership checks.
- Announcements and event foundations.
- Student graduation-status request; account role stays `student` until an administrator approves it.
- Admin overview, announcement publishing and graduation-request review.
- HTTP-only access cookie, password hashing, CORS configuration and environment-based secrets.

## 1. Configure backend

Requirements: Python 3.10+ and a MongoDB database (local or Atlas).

PowerShell:
```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `backend/.env`. Set `MONGO_URL`, `DB_NAME`, a unique random `JWT_SECRET`, `FRONTEND_URL=http://localhost:5173`, and a unique admin email/password. Keep `.env` private.

Run:
```powershell
uvicorn server:app --reload
```
Open `http://localhost:8000/docs` to inspect the API.

The API seeds demo alumni/announcement records on first startup. Admin creation is optional and occurs only when both `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set. Do not use example credentials in a real deployment.

## 2. Configure frontend

In another terminal:
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```
Open the local URL printed by Vite (normally `http://localhost:5173`). `VITE_API_URL` should point to the backend API, normally `http://localhost:8000/api`.

Build verification:
```powershell
npm run build
```

## Roles and verification

- **Student:** can use the directory and request alumni status.
- **Alumni:** can use the directory; backend mentorship changes are limited to their own profile.
- **Administrator:** can publish announcements and approve graduation requests.
- A student does **not** become an alumnus merely by clicking the request button. The backend changes the role only after administrator approval.

The current UI includes the admin mentorship/admin moderation foundation. The mentorship endpoint is available at `PATCH /api/alumni/{alumni_id}/mentorship`; connect it to the alumni's own profile control once profile editing is added.

## Privacy and production checklist

- Contact fields are omitted from alumni list/detail responses by default.
- Do not add private contact fields to public homepage cards.
- Never trust a role supplied by the browser for authorization; the backend checks the stored account role.
- Alumni can update mentorship status only for a profile whose email matches their signed-in account; admins can manage verified profiles.
- Use HTTPS in production, set secure cookies, configure the exact frontend origin(s), and rotate any credentials that may have been shared.
- Add a formal university verification process before relying on graduation transitions in production.
- The sample event dates and seeded alumni are illustrative demo content, not verified university announcements.

## Notes

This corrected package uses `backend/server.py` as the **single backend entry point**. The duplicate root-level React app and the incomplete alternative backend modules from the original ZIP were excluded to avoid ambiguous entry points. MongoDB is required for authentication and the directory API; the app is not a production deployment until environment configuration, authorization tests and real university data are reviewed.
