from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(150), nullable=False)
    role = Column(String(150), nullable=False)

    short_bio = Column(Text, nullable=True)
    about = Column(Text, nullable=True)

    email = Column(String(255), nullable=True)
    phone = Column(String(30), nullable=True)
    location = Column(String(255), nullable=True)

    profile_image = Column(Text, nullable=True)
    resume_url = Column(Text, nullable=True)

    github_url = Column(Text, nullable=True)
    linkedin_url = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )