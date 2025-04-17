from fastapi import FastAPI
from gtts import gTTS
from routes.patient import router as patientRouter
from routes.twilio import router as twilioRouter
from routes.doctor import router as doctorRouter
from routes.report import router as reportRouter
from routes.medicineReminder import router as medicineReminderRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(patientRouter)
app.include_router(twilioRouter)
app.include_router(doctorRouter)
app.include_router(reportRouter)
app.include_router(medicineReminderRouter)