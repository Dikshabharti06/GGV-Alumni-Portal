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

