import uuid
from datetime import datetime
from typing import List

from sqlalchemy import String, ForeignKey, Boolean, UUID, TIMESTAMP
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func

from src.BaseModelORM import Base


class Role(Base):
    name: Mapped[str] = mapped_column(String(30), nullable=False)

    users: Mapped[List["UserModel"]] = relationship(
        "UserModel", back_populates="role", cascade="all, delete-orphan"
    )


class UserModel(Base):
    __tablename__ = 'user'
    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, index=True, default=uuid.uuid4)
    login: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(
        String(length=320), unique=True, index=True, nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(
        String(length=1024), nullable=False
    )

    role_id: Mapped[int] = mapped_column(ForeignKey(Role.id), nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(default=datetime.utcnow,onupdate=datetime.utcnow, nullable=False)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )

    role: Mapped[Role] = relationship("Role", back_populates='users')
    bookings: Mapped[List["Booking"]] = relationship("Booking", back_populates="user")
    

class RefreshSessionModel(Base):
    __tablename__ = 'refresh_session'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    refresh_token: Mapped[uuid.UUID] = mapped_column(UUID, index=True)
    expires_in: Mapped[int]
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True),
                                                 server_default=func.now())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey(
        "user.id", ondelete="CASCADE"))
