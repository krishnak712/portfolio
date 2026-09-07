from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database import Base


class Visitor(Base):
    __tablename__ = "visitors"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    visitor_id = Column(
        UUID(as_uuid=True),
        unique=True,
        nullable=False,
        server_default=func.gen_random_uuid()
    )

    first_visit_at = Column(
        DateTime,
        server_default=func.now()
    )

    last_visit_at = Column(
        DateTime,
        server_default=func.now()
    )

    visit_count = Column(
        Integer,
        nullable=False,
        default=1
    )

    ip_hash = Column(
        String(255),
        nullable=True
    )

    country = Column(
        String(100),
        nullable=True
    )

    city = Column(
        String(100),
        nullable=True
    )

    device_type = Column(
        String(50),
        nullable=True
    )

    browser = Column(
        String(100),
        nullable=True
    )

    operating_system = Column(
        String(100),
        nullable=True
    )

    referrer = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )