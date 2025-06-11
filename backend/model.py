"Page with Pydantic models"
from pydantic import BaseModel, EmailStr
from typing import List


class Login(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    name: str
    user_id: int

class BlogList(BaseModel):
    title: str
    body: str

class ShowUser(BaseModel):
    name: str
    username: str
    email: EmailStr
    blogs: List[BlogList]

class ShowBlog(BaseModel):
    id: int
    title: str
    body: str
    published_by: User
