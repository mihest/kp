from typing import List, Optional
import uuid

from fastapi import APIRouter, Depends, Response, Request, status
from fastapi.security import OAuth2PasswordRequestForm

from .models import UserModel
from .schemas import UserCreate, Token, User, UserUpdate, Credentials
from .service import AuthService, UserService
from .dependencies import get_current_user, get_current_superuser, get_current_active_user
from ..exceptions import InvalidCredentialsException
from ..config import settings

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    user: UserCreate,
    response: Response
) -> Token:
    user_db = await UserService.register_new_user(user)
    credentials = Credentials(email=user.email, password=user.password)
    return await login(response=response, credentials=credentials)


@router.post("/login")
async def login(
    response: Response,
    credentials: Credentials
):

    user = await AuthService.authenticate_user(credentials.email, credentials.password.get_secret_value())
    if not user:
        raise InvalidCredentialsException
    token = await AuthService.create_token(user.id)
    response.set_cookie(
        'access_token',
        token.access_token,
        max_age=settings.auth_jwt.refresh_token_expire_days * 60 * 24 * 60,
        httponly=True
    )
    response.set_cookie(
        'refresh_token',
        token.refresh_token,
        max_age=settings.auth_jwt.refresh_token_expire_days * 60 * 24 * 60,
        httponly=True
    )
    user_res = User.from_orm(user)

    return {'token': token, 'user': user_res}


@router.post("/logout")
async def logout(
    request: Request,
    response: Response,
    user: UserModel = Depends(get_current_active_user),
):
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')

    await AuthService.logout(
        uuid.UUID(request.cookies.get('refresh_token'))
    )
    return {"message": "Logged out successfully"}


@router.post("/refresh")
async def refresh_token(
    request: Request,
    response: Response
) -> Token:
    print((await request.json())['refresh'])
    try:
        new_token = await AuthService.refresh_token(
            uuid.UUID((await request.json())['refresh'])
        )
    except ValueError as e:
        print(1)

    print(f'new ref_token: {new_token.refresh_token}')

    response.set_cookie(
        'access_token',
        new_token.access_token,
        max_age=settings.auth_jwt.refresh_token_expire_days * 60 * 24 * 60,
        httponly=True,
    )
    response.set_cookie(
        'refresh_token',
        new_token.refresh_token,
        max_age=settings.auth_jwt.refresh_token_expire_days * 60 * 24 * 60,
        httponly=True,
    )
    return new_token


@router.get("/user")
async def get_user(
    user: UserModel = Depends(get_current_active_user)
) -> User:
    return User.from_orm(user)
