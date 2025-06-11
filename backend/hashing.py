from passlib.context import CryptContext
import bcrypt
if not hasattr(bcrypt, '__about__'):  # to solve bcrypt bug
    bcrypt.__about__ = type('about', (object,), {'__version__': bcrypt.__version__})

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hash():
    def bcrypt(password:str):
        return pwd_context.hash(password)

    def verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

