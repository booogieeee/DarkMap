import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/zones")
def zones():
    #return json data
    pass


@app.get("/summary")
def summary():
    #return json data
    pass


uvicorn.run(app, host='0.0.0.0', port=8000)