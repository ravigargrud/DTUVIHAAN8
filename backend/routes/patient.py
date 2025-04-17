from fastapi import APIRouter, HTTPException
from database.schema import createPatient, getPatient, addMedicalRecord, addMedication, addAppointment
from database.models import Patient, MedicalRecord, Medications, Appointment

router = APIRouter(
    prefix="/patient",
    tags=["patient"]
)

@router.post("/createPatient")
async def create_patient(patient: Patient):
    return createPatient(patient)

@router.get("/getPatient/{patientEmail}")
async def get_patient(patientEmail: str):
    return getPatient(patientEmail)

@router.post("/addMedicalRecord/{patientEmail}")
async def add_medical_record(patientEmail: str, record: MedicalRecord):
    return addMedicalRecord(patientEmail, record)

@router.post("/addMedication/{patientEmail}")
async def add_medication(patientEmail: str, medication: Medications):
    return addMedication(patientEmail, medication)

@router.post("/addAppointment/{patientEmail}")
async def add_appointment(patientEmail: str, appointment: Appointment):
    return addAppointment(patientEmail, appointment)