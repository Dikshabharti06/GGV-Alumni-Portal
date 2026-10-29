from typing import Optional
from pydantic import BaseModel, Field

class AlumniSelfWrite(BaseModel):
    """Fields an alumnus may edit on their OWN profile (no email/enrollment/year)."""
    phone: Optional[str] = Field(None, max_length=20)
    organization: Optional[str] = Field(None, max_length=120)
    current_position: Optional[str] = Field(None, max_length=120)
    city: Optional[str] = Field(None, max_length=80)
    bio: Optional[str] = Field(None, max_length=1000)
    linkedin_url: Optional[str] = Field(None, max_length=200)
    mentorship_willing: bool = False