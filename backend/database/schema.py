from config import patientCollection, doctorCollection, appointmentCollection

def createPatient(patient):
    newPatient = {
        "pname": patient.pName,
        "mobNo": patient.mobNo,
        "email": patient.email,
        "age": patient.age,
        "income": patient.income,
        "medicalRecords": [],
        "appointments": [],
        "medications": []
    }
    patientCollection.insert_one(newPatient)
    return {"message": "Patient created successfully"}

def getPatient(patientEmail):
    patient = patientCollection.find_one({"email": patientEmail})
    if patient:
        result = {
            "pname": patient["pname"],
            "mobNo": patient["mobNo"],
            "email": patient["email"],
            "age": patient["age"],
            "income": patient["income"],
            "medicalRecords": patient["medicalRecords"],
            "appointments": patient["appointments"],
            "medications": patient["medications"]
        }
        return result
    else:
        return {"message": "Patient not found"}

def addMedicalRecord(patientEmail, record):
    patient = patientCollection.find_one({"email": patientEmail})
    if patient:
        new_patient = {
            "pname": patient["pname"],
            "mobNo": patient["mobNo"],
            "email": patient["email"],
            "age": patient["age"],
            "income": patient["income"],
            "medicalRecords": patient["medicalRecords"],
            "appointments": patient["appointments"],
            "medications": patient["medications"]
        }
        newRecord = {
            "date": record.date,
            "disease": record.disease,
            "report": record.report if "report" in record else None,
            "reportSummary": record.reportSummary if "reportSummary" in record else None
        }
        existingRecords = new_patient["medicalRecords"]
        existingRecords.append(newRecord)
        patientCollection.update_one({"email": patientEmail}, {"$set": {"medicalRecords": existingRecords}})
        return {"message": "Record added successfully"}
    else:
        return {"message": "Patient not found"}
    
def addMedication(patientEmail, medication):
    patient = patientCollection.find_one({"email": patientEmail})
    if patient:
        new_patient = {
            "pname": patient["pname"],
            "mobNo": patient["mobNo"],
            "email": patient["email"],
            "age": patient["age"],
            "income": patient["income"],
            "medicalRecords": patient["medicalRecords"],
            "appointments": patient["appointments"],
            "medications": patient["medications"]
        }
        newMedication = {
            "name": medication.name,
            "dosage": medication.dosage,
            "duration": medication.duration,
            "reminder": medication.reminder
        }
        existingMedications = new_patient["medications"]
        existingMedications.append(newMedication)
        patientCollection.update_one({"email": patientEmail}, {"$set": {"medications": existingMedications}})
        return {"message": "Medication added successfully"}
    else:
        return {"message": "Patient not found"}

def addAppointment(patientEmail, appointment):
    patient = patientCollection.find_one({"email": patientEmail})
    if patient:
        new_patient = {
            "pname": patient["pname"],
            "mobNo": patient["mobNo"],
            "email": patient["email"],
            "age": patient["age"],
            "income": patient["income"],
            "medicalRecords": patient["medicalRecords"],
            "appointments": patient["appointments"],
            "medications": patient["medications"]
        }
        newAppointment = {
            "callDate": appointment.callDate,
            "appointmentDate": appointment.appointmentDate,
            "patientID": appointment.patientID,
            "doctorID": appointment.doctorID,
            "urgency": appointment.urgency,
            "status": appointment.status
        }
        existingAppointments = new_patient["appointments"]
        existingAppointments.append(newAppointment)
        patientCollection.update_one({"email": patientEmail}, {"$set": {"appointments": existingAppointments}})
        return {"message": "Appointment added successfully"}
    else:
        return {"message": "Patient not found"}

def createDoctor(doctor):
    newDoctor = {
        "dname": doctor.dName,
        "mobNo": doctor.mobNo,
        "email": doctor.email,
        "institutionName": doctor.institutionName,
        "speciality": doctor.speciality,
        "patients": [],
        "appointments": []
    }
    doctorCollection.insert_one(newDoctor)
    return {"message": "Doctor created successfully"}

def getDoctor(doctorEmail):
    doctor = doctorCollection.find_one({"email": doctorEmail})
    if doctor:
        result = {
            "dname": doctor["dname"],
            "mobNo": doctor["mobNo"],
            "email": doctor["email"],
            "institutionName": doctor["institutionName"],
            "speciality": doctor["speciality"],
            "patients": doctor["patients"],
            "appointments": doctor["appointments"]
        }
        return result
    else:
        return {"message": "Doctor not found"}
    
def addPatientToDoctor(doctorEmail, patientEmail):
    doctor = doctorCollection.find_one({"email": doctorEmail})
    patient = patientCollection.find_one({"email": patientEmail})

    if doctor and patient:
        new_doctor = {
            "dname": doctor["dname"],
            "mobNo": doctor["mobNo"],
            "email": doctor["email"],
            "institutionName": doctor["institutionName"],
            "speciality": doctor["speciality"],
            "patients": doctor["patients"],
            "appointments": doctor["appointments"]
        }
        new_patient = {
            "pname": patient["pname"],
            "mobNo": patient["mobNo"],
            "email": patient["email"],
            "age": patient["age"],
            "income": patient["income"],
            "medicalRecords": patient["medicalRecords"],
            "appointments": patient["appointments"],
            "medications": patient["medications"]
        }
        existingPatients = new_doctor["patients"]
        existingPatients.append(new_patient)
        doctorCollection.update_one({"email": doctorEmail}, {"$set": {"patients": existingPatients}})
        return {"message": "Patient added to doctor successfully"}
    else:
        return {"message": "Doctor or patient not found"}
    
def addAppointmentToDoctor(doctorEmail, appointment):
    doctor = doctorCollection.find_one({"email": doctorEmail})
    if doctor:
        new_doctor = {
            "dname": doctor["dname"],
            "mobNo": doctor["mobNo"],
            "email": doctor["email"],
            "institutionName": doctor["institutionName"],
            "speciality": doctor["speciality"],
            "patients": doctor["patients"],
            "appointments": doctor["appointments"]
        }
        newAppointment = {
            "callDate": appointment.callDate,
            "appointmentDate": appointment.appointmentDate,
            "patientID": appointment.patientID,
            "doctorID": appointment.doctorID,
            "urgency": appointment.urgency,
            "status": appointment.status
        }
        existingAppointments = new_doctor["appointments"]
        existingAppointments.append(newAppointment)
        doctorCollection.update_one({"email": doctorEmail}, {"$set": {"appointments": existingAppointments}})

        appointmentCollection.insert_one({
            "callDate": appointment.callDate,
            "appointmentDate": appointment.appointmentDate,
            "patientID": appointment.patientID,
            "doctorID": appointment.doctorID,
            "urgency": appointment.urgency,
            "status": appointment.status
        })

        return {"message": "Appointment added to doctor successfully"}
    else:
        return {"message": "Doctor not found"}
    
def getDoctors():
    doctors = doctorCollection.find()
    result = []
    for doctor in doctors:
        result.append({
            "dname": doctor["dname"],
            "mobNo": doctor["mobNo"],
            "email": doctor["email"],
            "institutionName": doctor["institutionName"],
            "speciality": doctor["speciality"],
        })
    return result