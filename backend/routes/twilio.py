from fastapi import APIRouter
from fastapi.responses import Response
from twilio.twiml.voice_response import VoiceResponse, Connect, Pause
from twilio.rest import Client
from fastapi import WebSocket
import base64
import pywav
import numpy as np
import subprocess
from gtts import gTTS
import os
import whisper
from websockets.exceptions import ConnectionClosed
import google.generativeai as genai
import asyncio
from database.schema import addMedicalRecord
from datetime import datetime


router = APIRouter(
    prefix="/twilio",
    tags=["twilio"]
)

TEXT = ""

model = whisper.load_model("small")

# genai.configure(api_key=os.getenv("GEMINI_API_KEY", "AIzaSyBYbrHE6hU-emdaUfqxDa_tZByKy8i9ufo"))
# genai.configure(api_key="AIzaSyBYbrHE6hU-emdaUfqxDa_tZByKy8i9ufo")

# TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
# TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
# TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}


modelAI = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  system_instruction="You are a highly advanced Medical AI Assistant designed to assist doctors, researchers, and patients in providing accurate, evidence-based medical insights. Your primary responsibilities include analyzing symptoms, suggesting possible diagnoses, recommending treatments, interpreting lab reports, and answering health-related queries.\n\nYou should base your responses on peer-reviewed medical literature, clinical guidelines, and best practices from organizations like WHO, CDC, and NIH. If a condition requires a professional diagnosis, you must clearly state that a licensed medical professional should be consulted.\n\nFor patient interactions, explain medical concepts in simple, easy-to-understand language, ensuring clarity without compromising accuracy. For doctors, provide detailed insights, medical terminologies, and research-backed references.\n\nWhen asked about medications, include information on dosage, side effects, contraindications, and interactions but always advise consulting a doctor before taking any drug.\n\nWhen dealing with emergency symptoms (e.g., chest pain, difficulty breathing, stroke symptoms, or severe bleeding), immediately instruct the user to seek urgent medical attention.\n\nFormat your responses in a structured manner, such as:\n\nSymptoms Analysis\nPossible Diagnoses (if applicable)\nRecommended Next Steps\nPrecautionary Measures\nSources & References (if needed)\nMaintain a professional, empathetic, and unbiased tone in all responses. If a query is beyond your scope, politely decline to answer and suggest consulting a healthcare professional.\n\nMAKE IT SHORT within 100 words, and frame it in a paragraph such that it can be used with a text to speech model and a conversational flow is maintained.",
)

modelAppointment = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  system_instruction="You are an AI assistant that extracts appointment details from natural language input and returns them in JSON format.\n\nExtract key details such as date, time, symptoms, and urgency level.\nEnsure the JSON structure follows this format:\n{\n  \"appointment_date_time\": \"YYYY-MM-DD HH:MM\",\n  \"symptoms\": \"Cough, Cold, etc. or null\",\n  \"urgency\": \"Low, Medium, or High\"\n}\nGuidelines for Extraction:\nDate & Time: Convert relative terms (e.g., \"tomorrow at 11 AM\") into YYYY-MM-DD HH:MM format.\nSymptoms: Extract symptoms if mentioned, else set to null.\nUrgency:\nIf words like \"urgent, immediately, emergency\" appear → \"High\".\nIf words like \"soon, as early as possible\" appear → \"Medium\".\nOtherwise, default to \"Low\".\nExamples:\nInput:\n👉 \"Book an appointment for tomorrow at 11 AM for fever and headache.\"\n\nOutput:\n{\n  \"appointment_date_time\": \"2025-02-22 11:00\",\n  \"symptoms\": \"Fever, Headache\",\n  \"urgency\": \"Low\"\n}\n\nInput:\n👉 \"I need an urgent appointment today at 3 PM. Having chest pain.\"\n\nOutput:\n{\n  \"appointment_date_time\": \"2025-02-21 15:00\",\n  \"symptoms\": \"Chest Pain\",\n  \"urgency\": \"High\"\n}\n\nInput:\n👉 \"Schedule a check-up next Monday at 9 AM.\"\n\nOutput:\n{\n  \"appointment_date_time\": \"2025-02-24 09:00\",\n  \"symptoms\": null,\n  \"urgency\": \"Low\"\n}\nInput:\n👉 \"I have a cold and cough. Need an appointment as soon as possible, maybe around 5 PM today.\"\n\nOutput:\n{\n  \"appointment_date_time\": \"2025-02-21 17:00\",\n  \"symptoms\": \"Cold, Cough\",\n  \"urgency\": \"Medium\"\n}",
)

appointment_session = modelAppointment.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "I am having cold, cough and fever. Get me an appointment for tomorrow",
      ],
    },
    {
      "role": "model",
      "parts": [
        "```json\n{\n  \"appointment_date_time\": \"2025-02-22 10:00\",\n  \"symptoms\": \"Cold, Cough, Fever\",\n  \"urgency\": \"Low\"\n}\n```\n",
      ],
    },
  ]
)



chat_session = modelAI.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "Hi, I am having cold and cough from yesterday",
      ],
    },
    {
      "role": "model",
      "parts": [
        "I understand you're experiencing a cold and cough.  Common colds often resolve on their own with rest and fluids.  Over-the-counter medications like acetaminophen or ibuprofen can help manage fever and discomfort.  However, if your symptoms worsen, are accompanied by high fever, difficulty breathing, or last longer than a week, it's important to see a doctor to rule out other potential illnesses.  For now, rest, hydrate, and consider a humidifier to ease congestion.\n",
      ],
    },
  ]
)

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@router.post("/voice")
async def handle_incoming_call():
    """Handles incoming call and starts WebSocket stream"""
    response = VoiceResponse()

    response.say("Hello, I am your digital medical assitant! What problem are you facing today?")
    
    genai.configure(api_key="AIzaSyBYbrHE6hU-emdaUfqxDa_tZByKy8i9ufo")
    # response.say("Hello, I am your AI powered financial and business mentor! How can I help you today?")

    start = Connect()
    start.stream(url="wss://cc64-14-195-19-210.ngrok-free.app/twilio/ws")
    response.append(start)

    # pause = Pause(length=30)

    response.say("Thank you for calling Digital Medical Assistant. Goodbye!")
    # response.say("Thank you for calling AI powered financial and business mentor. Goodbye!")

    # response.append(pause)
    return Response(content=str(response), media_type="application/xml")

AUDIO_FILE = "twilio_audio.wav"

AUDIO_BUFFER = bytearray()
BUFFER_DURATION = 8
FILE_NO = 0
STREAM_SID = ""

async def save_mulaw_to_wav(audio_bytes, filename="twilio_audio.wav"):
    """Writes μ-law (G.711) audio to a proper WAV file using pywav."""
    wave_write = pywav.WavWrite(filename, 1, 8000, 8, 7)  # 1 = Mono, 8000Hz, 8-bit, 7 = μ-law
    wave_write.write(audio_bytes)
    wave_write.close()
    return await transcribe_audio(filename)

async def transcribe_audio(filename):
    # result = model.transcribe(filename, language="hi")
    global TEXT
    result = model.transcribe(filename)
    TEXT+="User: "+result["text"]+"\n"
    print(TEXT)
    response = chat_session.send_message(TEXT)
    TEXT+="Model: "+response.text+"\n"

    return response.text

async def getAppointmentDetails(text):
    response = appointment_session.send_message(text)
    return response.text

def mulaw_decode(audio_bytes, quantization_channels=256):
    """Decodes μ-law audio to PCM (16-bit)."""
    mu = quantization_channels - 1
    signal = np.frombuffer(audio_bytes, dtype=np.uint8)
    signal = 2 * (signal.astype(np.float32) / mu) - 1
    signal = np.sign(signal) * (1 / mu) * ((1 + mu) ** np.abs(signal) - 1)
    return (signal * 32767).astype(np.int16)

def convert_mulaw_to_wav(audio_bytes):
    """Converts μ-law (G.711) buffer to WAV format in-memory."""
    pcm_data = mulaw_decode(audio_bytes)

    pcm_float = pcm_data.astype(np.float32) / 32768.0

    return pcm_float

def transcribe_audio_chunk(pcm_array):
    """Transcribes buffered audio using Whisper"""
    try:
        pcm_array = np.array(pcm_array, dtype=np.float32)
        result = model.transcribe(pcm_array, fp16=False, language="hi")
        return result["text"]
    except Exception as e:
        print("❌ Whisper Error:", e)
        return ""

jsonMed = ""

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """Handles WebSocket streaming from Twilio"""
    await websocket.accept()
    print("✅ Twilio WebSocket Connected")
    
    audio_data = b""

    global AUDIO_BUFFER
    global FILE_NO
    global STREAM_SID
    global TEXT
    global BUFFER_DURATION
    global jsonMed

    try:
        while True:
            data = await websocket.receive_json()

            if data.get("event") == "start":
                STREAM_SID = data.get("streamSid")
                print("🟢 Starting audio recording")

            if data.get("event") == "media":
                audio_chunk = base64.b64decode(data["media"]["payload"])
                audio_data += audio_chunk
                AUDIO_BUFFER.extend(audio_chunk)
                if len(AUDIO_BUFFER) >= 30000:
                    if FILE_NO < 2:
                        response_text = await save_mulaw_to_wav(AUDIO_BUFFER, f"twilio_audio_{FILE_NO}.wav")
                    elif FILE_NO == 2:
                        response_text = "Successfully Booked your appointment."
                        # jsonMed = await getAppointmentDetails(TEXT)
                        # print(jsonMed)
                    
                    FILE_NO += 1

                    response_text = response_text or "Message Recieved."
                    tts = gTTS(text=response_text)
                    tts.save("output.mp3")

                    # Convert MP3 to raw μ-law (G.711) format
                    subprocess.run(["ffmpeg", "-y", "-i", "output.mp3", "-ar", "8000", "-ac", "1", "-c:a", "pcm_mulaw", "-f", "mulaw", "output.raw"], check=True)

                    with open("output.raw", "rb") as f:
                        audio_raw = f.read()

                    # Debug: Save raw output for local testing
                    with open("debug_output.raw", "wb") as f:
                        f.write(audio_raw)

                    # Send raw μ-law audio to Twilio
                    encoded_audio = base64.b64encode(audio_raw).decode("utf-8")
                    objA = {"event": "media", "streamSid": STREAM_SID, "media": {"payload": encoded_audio}}
                    objB = {"event": "mark", "streamSid": STREAM_SID, "mark": {"name": "message"}}
                    await websocket.send_json(objA)
                    await websocket.send_json(objB)

                    print("✅ Sent Audio response to Twilio.")

                    # Clear buffer after processing
                    AUDIO_BUFFER = bytearray()

                    #wait for 10 seconds
                    await asyncio.sleep(30)

            if data.get("event") == "mark":
                print("🔵 Mark:", data["mark"]["name"])

            elif data.get("event") == "stop":
                print("🔴 Stopping audio recording")
                break

    except ConnectionClosed:
        print("🔴 WebSocket Disconnected")

    await save_mulaw_to_wav(audio_data)
    print(TEXT)
    record = {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "disease": "Cold and Cough",
        "report": jsonMed or None,
        "reportSummary": TEXT or None
    }
    await addMedicalRecord("ravi@gmai.com", record)
    print("✅ WAV file saved successfully!")

    await websocket.close()
