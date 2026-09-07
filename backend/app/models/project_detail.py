from sqlalchemy import (
    Column,
    Integer,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class ProjectDetail(Base):
    __tablename__ = "project_details"

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
        nullable=False,
        unique=True
    )

    overview = Column(
        Text,
        nullable=True
    )

    problem_statement = Column(
        Text,
        nullable=True
    )

    solution = Column(
        Text,
        nullable=True
    )

    my_role = Column(
        Text,
        nullable=True
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
    back_populates="detail"
)