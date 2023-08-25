import logging
from http import HTTPStatus

from fastapi import APIRouter
from fastapi import status

health_router = APIRouter()
logger = logging.getLogger()


@health_router.get('/health',
                   status_code=status.HTTP_200_OK)
def heath_check():
    return HTTPStatus.OK
