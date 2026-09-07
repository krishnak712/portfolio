from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class ProjectSection(Base):
    __tablename__ = "project_sections"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    project_id = Column(
        Integer,
        ForeignKey(
            "projects.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    section_type = Column(
        String(50),
        nullable=False
    )

    eyebrow = Column(
        String(150),
        nullable=True
    )

    title = Column(
        String(500),
        nullable=False
    )

    subtitle = Column(
        Text,
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    layout_type = Column(
        String(50),
        nullable=False,
        default="default"
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
    project = relationship(
    "Project",
    back_populates="sections"
    )

    items = relationship(
    "ProjectSectionItem",
    back_populates="section",
    cascade="all, delete-orphan"
    )