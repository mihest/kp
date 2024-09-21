import uuid
from datetime import date

from sqlalchemy import (
    UUID,
    ForeignKey,
    CheckConstraint,
    Computed,
    Integer,
    Date,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.BaseModelORM import Base


class Booking(Base):
    __tablename__ = 'booking'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        primary_key=True,
        index=True,
        default=uuid.uuid4
    )

    room_id: Mapped[uuid.UUID] = mapped_column(
        UUID, ForeignKey('room.id'),
        nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID, ForeignKey('user.id'),
        nullable=False
    )

    date_from: Mapped[date] = mapped_column(Date, nullable=False)
    date_to: Mapped[date] = mapped_column(Date, nullable=False)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    total_cost: Mapped[int] = mapped_column(Integer, Computed("(date_to - date_from) * price"))
    total_days: Mapped[int] = mapped_column(Integer, Computed("date_to - date_from"))

    room: Mapped["Room"] = relationship("Room", back_populates="bookings")
    user: Mapped["UserModel"] = relationship("UserModel", back_populates="bookings")

    __table_args__ = (
        CheckConstraint('total_cost >= 0', name='check_total_price_positive'),
    )

