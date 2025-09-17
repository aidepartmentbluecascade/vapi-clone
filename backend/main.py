from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

class Form(BaseModel):
    details : str
    phone : str
    name : str
    email : str

app = FastAPI()

origins = [
    "http://localhost:5173/",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/form')
def form(arg:Form):
    return JSONResponse({
        "details": arg.details,
        "phone": arg.phone,
        "name": arg.name,
        "email": arg.email
        })
