import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")

TOKEN_EXPIRE_MIN = os.getenv("TOKEN_EXPIRE_MIN")
TOKEN_EXPIRE_DAYS = os.getenv("TOKEN_EXPIRE_DAYS")


BASE_DIR = Path(__file__).parent.parent


class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"
    algorithm: str = "RS256"
    access_token_expire_minutes: int = int(TOKEN_EXPIRE_MIN)
    refresh_token_expire_days: int = int(TOKEN_EXPIRE_DAYS)


class Settings(BaseSettings):
    # DB_HOST: str
    # DB_PORT: str
    # DB_NAME: str
    # DB_USER: str
    # DB_PASS: str

    @property
    def db_url(self) -> str:
        # return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?async_fallback=True"
        return f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?async_fallback=True"

    db_echo: bool = False
    # model_config = SettingsConfigDict(env_file=".env")

    auth_jwt: AuthJWT = AuthJWT()


settings = Settings()



