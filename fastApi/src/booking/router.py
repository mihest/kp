import uuid
from datetime import date

from fastapi import APIRouter, Depends, Query

from src.auth.dependencies import get_current_active_user
from src.auth.models import UserModel
from src.booking.schemas import CreateBooking
from src.booking.service import BookingService

router = APIRouter()


@router.post("")
async def booking_room(
        room_id: uuid.UUID,
        date_from: date,
        date_to: date,
        price: int,
        user: UserModel = Depends(get_current_active_user)
):
    create_booking = CreateBooking(
        room_id=room_id,
        user_id=user.id,
        date_from=date_from,
        date_to=date_to,
        price=price
    )
    return await BookingService.create_booking(create_booking)


@router.get("")
async def bookings_user(
        limit: int = Query(default=30, le=100),
        page: int = Query(default=1, ge=1),
        user: UserModel = Depends(get_current_active_user)
):
    offset = (page - 1) * limit
    bookings = await BookingService.get_bookings_list(user_id=user.id, offset=offset, limit=limit)
    return {
        "data": bookings,
        "limit": limit,
        "page": page
    }


