from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class Income(str, Enum):
    range1 = "0-1L"
    range2 = "1-3L"
    range3 = "3-5L"
    range4 = "5-10L"
    range5 = "10-20L"
    range6 = "20L+"

class Status(str, Enum):
    pending = "Pending"
    approved = "Approved"
    rejected = "Rejected"

class Reminder(str, Enum):
    on = "On"
    off = "Off"

class Urgency(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class MedicalRecord(BaseModel):
    date: str
    disease: str
    report: Optional[str]
    reportSummary: Optional[str]

class Appointment(BaseModel):
    callDate: str
    appointmentDate: str
    patientID: str
    doctorID: str
    urgency: Urgency
    status: Status

class Medications(BaseModel):
    name: str
    dosage: str
    duration: str
    reminder: Reminder

class Patient(BaseModel):
    pName: str
    mobNo: str
    email: str
    age: int
    income: Income
    medicalRecords: List[MedicalRecord] = []
    appointments: List[Appointment] = []
    medications: List[Medications] = []

class Doctor(BaseModel):
    dName: str
    mobNo: str
    email: str
    institutionName: str
    speciality: str
    patients: List[Patient] = []
    appointments: List[Appointment] = []

class ptToDoc(BaseModel):
    patientEmail: str
    doctorEmail: str