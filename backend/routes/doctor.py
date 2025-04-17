from fastapi import APIRouter
from database.schema import createDoctor, getDoctor, addPatientToDoctor, addAppointmentToDoctor, getDoctors
from database.models import Doctor, ptToDoc, Appointment

router = APIRouter(
    prefix="/doctor",
    tags=["doctor"]
)

@router.post("/createDoctor")
async def create_doctor(doctor: Doctor):
    return createDoctor(doctor)

@router.get("/getDoctor/{doctorEmail}")
async def get_doctor(doctorEmail: str):
    return getDoctor(doctorEmail)

@router.post("/addPatientToDoctor")
async def add_patient_to_doctor(ptToDoc: ptToDoc):
    return addPatientToDoctor(ptToDoc.doctorEmail, ptToDoc.patientEmail)

@router.post("/addAppointmentToDoctor/{doctorEmail}")
async def add_appointment_to_doctor(doctorEmail: str, appointment: Appointment):
    return addAppointmentToDoctor(doctorEmail, appointment)

@router.get("/getDoctors")
async def get_doctors():
    return getDoctors()