from datetime import date
from uuid import UUID

from pydantic import BaseModel


class BaseBooking(BaseModel):
    date_from: date
    date_to: date


class CreateBooking(BaseBooking):
    room_id: UUID
    user_id: UUID
    price: int


class GetBooking(BaseBooking):
    room_id: UUID
    user_id: UUID
    price: int
    total_cost: int
    total_days: int



