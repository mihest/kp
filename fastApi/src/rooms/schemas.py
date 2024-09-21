import uuid

from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from sqlalchemy import JSON


class RoomBase(BaseModel):
    title: str
    description: str
    price: int
    square: int
    sleeping_places: int
    conditioner: bool
    wi_fi: bool
    amenities: List[str] | Dict[str, Any]
    room_number: int
    floor_number: int
    room_type_id: uuid.UUID




class RoomCreate(RoomBase):
    pass


class RoomPut(RoomBase):
    pass


class RoomCreateDB(RoomBase):
    pass


class RoomUpdateDB(RoomBase):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    square: Optional[int] = None
    sleeping_places: Optional[int] = None
    amenities: Optional[Dict[str, Any]] = None
    room_number: Optional[int] = None
    floor_number: Optional[int] = None
    room_type_id: Optional[int] = None
    conditioner: Optional[bool] = None
    wi_fi: Optional[bool] = None


class RoomPatch(RoomBase):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    square: Optional[int] = None
    sleeping_places: Optional[int] = None
    amenities: Optional[Dict[str, Any]] = None
    room_number: Optional[int] = None
    floor_number: Optional[int] = None
    room_type_id: Optional[int] = None
    conditioner: Optional[bool] = None
    wi_fi: Optional[bool] = None

