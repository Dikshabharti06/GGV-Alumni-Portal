from pydantic import BaseModel, EmailStr
from typing import Optional


class AuthInput(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    role: str = "student"
    enrollment: Optional[str] = None


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    headline: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    graduation_year: Optional[str] = None
    department: Optional[str] = None
    bio: Optional[str] = None
    mentorship: Optional[bool] = None


class AnnouncementInput(BaseModel):
    title: str
    body: str
    category: str = "Community"


class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    enrollment: Optional[str] = None


class AlumniRecord(BaseModel):
    name: str
    department: str = ""
    graduation_year: str = ""
    program: str = ""
    company: str = ""
    headline: str = ""
    location: str = ""
    email: str = ""
    contact: str = ""
    enrollment: str = ""
    address: str = ""
    bio: str = ""
    mentorship: bool = False
