from typing import Optional
import uuid

from jose import jwt, ExpiredSignatureError
from fastapi import Depends, HTTPException, status

from .models import UserModel
from .utils import OAuth2PasswordBearerWithCookie
from .service import UserService
from ..exceptions import InvalidTokenException
from ..config import settings

oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="/auth/login")


async def get_current_user(
        token: str = Depends(oauth2_scheme)
) -> Optional[UserModel]:
    try:
        payload = jwt.decode(token,
                             settings.auth_jwt.public_key_path.read_text(),
                             algorithms=[settings.auth_jwt.algorithm]
                             )
        user_id = payload.get("sub")
        if user_id is None:
            raise InvalidTokenException
    except ExpiredSignatureError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired.")
    except Exception as e:
        print(e)
        raise InvalidTokenException
    current_user = await UserService.get_user(uuid.UUID(user_id))
    if not current_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Verify email")
    return current_user


async def get_current_superuser(current_user: UserModel = Depends(get_current_user)) -> UserModel:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
    return current_user


async def get_current_active_user(current_user: UserModel = Depends(get_current_user)) -> UserModel:
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="User is not active")
    return current_user
