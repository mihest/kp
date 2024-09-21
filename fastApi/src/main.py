import sys
import os
import uuid
from pathlib import Path

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from src.auth import router_auth
from src.rooms import router_rooms
from src.booking import router_booking

app = FastAPI(
    title="FastAPI",
    openapi_url="/api/openapi.json",
    redoc_url="/redoc",
    docs_url="/docs"
)

app.mount("/storage", StaticFiles(directory="storage"), name="storage")


@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    for file in files:
        file_location = f'storage/{uuid.uuid4()}{Path(file.filename).suffix}'
        with open(file_location, 'wb') as f:
            f.write(await file.read())

app.include_router(
    router=router_auth,
    prefix='/auth',
    tags=["Auth"]
)

app.include_router(
    router=router_rooms,
    prefix='/rooms',
    tags=["Rooms"]
)

app.include_router(
    router=router_booking,
    prefix='/booking',
    tags=["Booking"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://78.85.21.104",
        'http://localhost:3000'
    ],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=8000, log_level="info", reload=True, workers=6, env_file=".env")
