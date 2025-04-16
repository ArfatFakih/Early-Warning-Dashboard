import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load model
model = joblib.load("finalized_model.sav")

app = FastAPI()

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to localhost:3000 if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input format
class StabilityInput(BaseModel):
    cc: float
    ge: float
    rl: float
    rq: float
    va: float

@app.post("/predict")
def predict_stability(data: StabilityInput):
    input_features = np.array([[data.cc, data.ge, data.rl, data.rq, data.va]])
    prediction = model.predict(input_features)[0]
    return {"prediction": prediction}
