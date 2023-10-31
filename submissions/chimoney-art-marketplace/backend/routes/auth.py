from datetime import datetime, timedelta
from typing import Optional, Annotated
from fastapi import status, Depends, HTTPException, Header, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database.database import get_db

from models.user import User, TokenTable

from schemas.user import UserSchema, UpdateUserSchema, TokenSchema

from responses.response import ResponseClass

from services.auth import create_user, create_access_token, decode_token, get_current_user, authenticate_user

ACCESS_TOKEN_EXPIRE_MINUTES = 60
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7


router = APIRouter(prefix='/api/auth', tags=['Authentication'])

@router.post('/user/signup', response_model=ResponseClass, status_code=201)
async def signup(data: UserSchema, db: Session = Depends(get_db)):
    new_user = create_user(db, data)

    return ResponseClass(
        message='User registered successfully',
        statusCode=201,
        data=new_user
    )

@router.post("/login", response_model=TokenSchema)
async def login(request: UserSchema, db: Session = Depends(get_db)):
    print(request.username)
    user = authenticate_user(get_db, username=request.username, password=request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.username},
    )
    return {"access_token": access_token, "token_type": "bearer"}