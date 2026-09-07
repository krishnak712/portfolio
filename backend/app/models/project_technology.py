from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    UniqueConstraint
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class ProjectTechnology(Base):
    __tablename__ = "project_technologies"

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

    technology = Column(
        String(100),
        nullable=False
    )

    display_order = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    __table_args__ = (
        UniqueConstraint(
            "project_id",
            "technology",
            name="uq_project_technology"
        ),
    )

    project = relationship(
        "Project",
        back_populates="technologies"
    )