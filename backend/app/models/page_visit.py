from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database import Base


class PageVisit(Base):
    __tablename__ = "page_visits"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    visitor_id = Column(
        Integer,
        ForeignKey(
            "visitors.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    page_path = Column(
        String(500),
        nullable=False
    )

    page_title = Column(
        String(255),
        nullable=True
    )

    visited_at = Column(
        DateTime,
        server_default=func.now(),
        index=True
    )

    session_id = Column(
        UUID(as_uuid=True),
        nullable=True
    )

    duration_seconds = Column(
        Integer,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )