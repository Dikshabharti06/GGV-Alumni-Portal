from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from lib.db import client
from lib.seed import seed
from routes import api

app = FastAPI(title="GGV Alumni Portal API")


@app.on_event("startup")
async def startup():
    await seed()


app.include_router(api)
frontend_origins = [
    x.strip()
    for x in os.getenv("FRONTEND_URL", "http://localhost:5173").split(",")
    if x.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown():
    client.close()
