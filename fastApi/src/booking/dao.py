from .models import Booking
from ..dao import BaseDAO


class BookingDAO(BaseDAO):
    model = Booking
