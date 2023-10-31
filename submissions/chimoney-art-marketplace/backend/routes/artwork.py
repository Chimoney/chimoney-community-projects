from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.crud import get_artworks, get_artwork_by_id, create_artwork
from database.database import get_db

from schemas.artwork import ArtworkSchema

from models.user import User
from models.artwork import Artwork

from services.auth import get_current_user

from responses.response import ResponseClass

router = APIRouter(prefix='/api', tags=['Artwork'])


@router.get('/')
async def get_art():
    return get_artworks()

@router.post('/', response_model=ResponseClass, status_code=201)
async def create_art(data: ArtworkSchema, db: Session = Depends(get_db), artist: User = Depends(get_current_user)):
    new_artwork = Artwork(
        **data,
        artist_id = artist.id,
        owner_id = artist.id
    )
    create_artwork(new_artwork)
    
    return ResponseClass(
        message='Artwork created successfully',
        statusCode=201,
        data=None
    )

@router.get('/art/{art_id}')
async def get_art_by_id(art_id: int):
    artwork = await get_artwork_by_id(artwork_id=art_id)

    return artwork
