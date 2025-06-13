from fastapi import FastAPI, Query, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated, List
from model import ShowBlog, ShowUser, Token, User
from database import create_db_and_tables, BlogDB, UserDB, SessionDep
from sqlmodel import select
from hashing import Hash
from token_gen import create_access_token
from oauth2 import get_current_user
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()
# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_origins=["https://blogspace-web.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
def home():
    return {"message": "Blog website"}
 

@app.on_event("startup")
def on_start():
    "creates DB when app is started"
    create_db_and_tables()
    return {"message": "DB created"}


@app.post("/login", tags=["login"])
def login(current_user: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep):
    user = session.query(UserDB).filter(UserDB.username == current_user.username).first()
    if not user:
        raise HTTPException(status_code=404, detail='Invalid Credentials')
    if not Hash.verify_password(current_user.password, user.password):
        raise HTTPException(status_code=404, detail='Incorrect password')
    
    access_token = create_access_token(data={"sub": user.username})
    return Token(access_token=access_token, token_type="bearer")

# ---BLOGS-----
@app.post("/create-blog", tags=["blogs"])
def create_blog(blog: BlogDB, session: SessionDep) -> BlogDB:
    "Add blog data into DB"
    if isinstance(blog.published_on, str):
        blog.published_on = datetime.strptime(blog.published_on, "%Y-%m-%d").date()
    session.add(blog)
    session.commit()
    session.refresh(blog)
    return blog

@app.get("/read-blogs", response_model=List[ShowBlog], tags=["blogs"])
def read_all_blogs(session: SessionDep, limit: Annotated[int, Query(le=100)]=10) -> List[BlogDB]:
    blogs = session.exec(select(BlogDB).limit(limit)).all()
    return blogs

@app.get("/read-blog", response_model=ShowBlog, tags=["blogs"])
def read_blog(session: SessionDep, 
    title: str = Query(..., description="Title of the blog"),
    ):

    blog = session.exec(
        select(BlogDB).where(BlogDB.title == title)
    ).first()
    if not blog:
        raise HTTPException(status_code=404, detail='Blog not found')
    return blog

@app.delete("/delete-blog/{blog_id}", tags=["blogs"])
def delete_blog(blog_id:int, session:SessionDep, get_current_user: UserDB = Depends(get_current_user)):
    blog = session.get(BlogDB, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail='Blog not found')
    session.delete(blog)
    session.commit()
    return {"ok": True}

# ---USERS-----
@app.post("/create-user", response_model=ShowUser, tags=["users"])
def create_user(new_user: UserDB, session:SessionDep):
    hashed_pw = Hash.bcrypt(new_user.password)
    new_user.password=hashed_pw
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

@app.get("/get-user/{username}", response_model=ShowUser, tags=["users"])
def get_user(username: str, session: SessionDep, get_current_user: UserDB = Depends(get_current_user)):
    user = session.get(UserDB, username)
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return user


@app.get("/get-user-by-username/{username}", response_model=User, tags=["users"])
def get_user_by_username(username: str, session: SessionDep, get_current_user: UserDB = Depends(get_current_user)):
    user = session.query(UserDB).filter(UserDB.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return user
