# from sqlalchemy import create_engine
from fastapi import Depends
from sqlmodel import create_engine, Session, SQLModel, Field, Relationship
from typing import Annotated
from pydantic import EmailStr


class UserDB(SQLModel, table=True):
    "User DB table, this creates a table with table name same as class name"
    user_id: Annotated[int, Field(primary_key=True, default=None)]
    username: str
    name: str
    email: EmailStr
    password: str
    blogs: list["BlogDB"] = Relationship(back_populates="published_by")

class BlogDB(SQLModel, table=True):
    "DB model, this creates a table with table name same as class name ie. blogdb"
    id: Annotated[int, Field(primary_key=True, default=None)]
    title: str
    body: str
    user_id: int | None = Field(default=None, foreign_key="userdb.user_id")
    published_by: UserDB | None = Relationship(back_populates="blogs")

"A SQLModel engine (underneath it's actually a SQLAlchemy engine) is what holds the connections to the database."
sqlite_file_name = "blog.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}

engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    "create the tables for all the table models."
    SQLModel.metadata.create_all(engine)


def get_session():
    """A Session is what stores the objects in memory 
    and keeps track of any changes needed in the data, 
    then it uses the engine to communicate with the database."""
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]


