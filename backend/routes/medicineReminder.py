from fastapi import APIRouter, Query
import os
from twilio.rest import Client
from fastapi.responses import Response

router = APIRouter(
    prefix="/medicine-reminder",
    tags=["medicine-reminder"],
)


TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

TWIML_URL = "https://78f3-182-79-215-75.ngrok-free.app/medicine-reminder/twiml"

def make_twilio_call(to_number, user_name, medicine_name, dosage):
    """Initiates a Twilio call with a personalized medicine reminder message."""
    try:
        call = client.calls.create(
            # url=f"{TWIML_URL}?user_name={user_name}&medicine_name={medicine_name}&dosage={dosage}",
            url=f"{TWIML_URL}",
            to=to_number,
            from_=TWILIO_PHONE_NUMBER
        )
        return {"message": "Call initiated successfully!", "call_sid": call.sid}
    except Exception as e:
        return {"error": str(e)}

@router.post("/make-call/")
async def make_call(
    phone_number: str,
    user_name: str,
    medicine_name: str,
    dosage: str
):
    """API endpoint to trigger a personalized medicine reminder call."""
    return make_twilio_call(phone_number, user_name, medicine_name, dosage)

@router.post("/twiml")
async def twiml_response(
    # user_name: str = Query(..., title="User Name") or "User",
    # medicine_name: str = Query(..., title="Medicine Name") or "Medicine",
    # dosage: str = Query(..., title="Dosage Amount") or "Dosage"
):
    """TwiML response for Twilio to read a personalized medicine reminder message."""
    # message = f"""
    # Hello {user_name}. This is a reminder to take your medicine.
    # Your prescribed medicine is {medicine_name}, and your dosage is {dosage}.
    # Please take it on time and stay healthy.
    # """

    message = "Hello, this is a reminder to take your medicine. Please take it on time and stay healthy."

    twiml = f"""<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Say voice="alice">{message}</Say>
    </Response>"""

    return Response(content=twiml, media_type="application/xml")
