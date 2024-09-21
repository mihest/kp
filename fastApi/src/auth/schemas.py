import uuid
from typing import Optional

from pydantic import BaseModel, Field, EmailStr, SecretStr


class UserBase(BaseModel):
    login: str
    email: Optional[str] = Field(None)
    is_active: bool = Field(True)
    is_verified: bool = Field(False)
    is_superuser: bool = Field(False)


class UserCreate(UserBase):
    email: str
    login: str
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class User(UserBase):
    id: uuid.UUID
    login: str
    email: str
    is_active: bool
    is_verified: bool
    is_superuser: bool
    role: str

    class Config:
        from_attributes = True

    @classmethod
    def from_orm(cls, user):
        user_data = user.__dict__.copy()
        user_data['role'] = user.role.name if user.role else None
        return cls(**user_data)


class UserCreateDB(UserBase):
    hashed_password: Optional[str] = None


class UserUpdateDB(UserBase):
    hashed_password: str


class RefreshSessionCreate(BaseModel):
    refresh_token: uuid.UUID
    expires_in: int
    user_id: uuid.UUID


class RefreshSessionUpdate(RefreshSessionCreate):
    user_id: Optional[uuid.UUID] = Field(None)


class Token(BaseModel):
    access_token: str
    refresh_token: uuid.UUID
    token_type: str

class Credentials(BaseModel):
    email: EmailStr
    password: SecretStr
