from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(255),
        nullable=False
    )

    slug = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    project_type = Column(
        String(100),
        nullable=True
    )

    project_mode = Column(
        String(20),
        nullable=False
    )

    short_description = Column(
        Text,
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    role = Column(
        String(255),
        nullable=True
    )

    github_url = Column(
        Text,
        nullable=True
    )

    live_url = Column(
        Text,
        nullable=True
    )

    image_url = Column(
        Text,
        nullable=True
    )

    featured = Column(
        Boolean,
        default=False
    )

    status = Column(
        String(50),
        default="In Progress"
    )

    display_order = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    technologies = relationship(
        "ProjectTechnology",
        back_populates="project",
        cascade="all, delete-orphan"
    )
    detail = relationship(
    "ProjectDetail",
    back_populates="project",
    uselist=False,
    cascade="all, delete-orphan"
    )

    sections = relationship(
    "ProjectSection",
    back_populates="project",
    cascade="all, delete-orphan"
)