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


class ProjectSectionItem(Base):
    __tablename__ = "project_section_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    section_id = Column(
        Integer,
        ForeignKey(
            "project_sections.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    item_number = Column(
        String(20),
        nullable=True
    )

    label = Column(
        String(150),
        nullable=True
    )

    title = Column(
        String(500),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    badge = Column(
        String(100),
        nullable=True
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
    section = relationship(
    "ProjectSection",
    back_populates="items"
)