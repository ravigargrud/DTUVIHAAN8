from fastapi import APIRouter, UploadFile, File
import fitz
import google.generativeai as genai
import os
import io

router = APIRouter(
    prefix="/report",
    tags=["report"],
)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

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
  system_instruction="\"You are a highly intelligent medical AI assistant. Given a medical report, analyze it carefully and extract the following details in JSON format:\n\nsummary: A concise, high-level summary of the report in simple terms.\nsymptoms: A list of symptoms mentioned in the report.\ndiseases: A list of potential diseases or conditions inferred from the symptoms and findings.\nEnsure that the JSON output follows this structure:\n{\n  \"summary\": \"<Brief summary of the medical report>\",\n  \"symptoms\": [\"<Symptom 1>\", \"<Symptom 2>\", \"<Symptom 3>\", ...],\n  \"diseases\": [\"<Possible disease 1>\", \"<Possible disease 2>\", ...]\n}\n\nIf the report does not mention symptoms or diseases explicitly, infer them based on the context. Use only medical knowledge and do not make assumptions beyond the report's content.",
)


chat_session = modelAI.start_chat(
  history=[
    # {
    #   "role": "user",
    #   "parts": [
    #     "Hi, I am having cold and cough from yesterday",
    #   ],
    # },
    # {
    #   "role": "model",
    #   "parts": [
    #     "I understand you're experiencing a cold and cough.  Common colds often resolve on their own with rest and fluids.  Over-the-counter medications like acetaminophen or ibuprofen can help manage fever and discomfort.  However, if your symptoms worsen, are accompanied by high fever, difficulty breathing, or last longer than a week, it's important to see a doctor to rule out other potential illnesses.  For now, rest, hydrate, and consider a humidifier to ease congestion.\n",
    #   ],
    # },
  ]
)

def extract_text_from_pdf(pdf_bytes):
    """Extracts text from a PDF using PyMuPDF."""
    text = ""
    pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
    for page in pdf_document:
        text += page.get_text("text") + "\n"
    pdf_document.close()
    print(text)
    return text

async def analyze_text_with_gemini(text):
    """Analyzes text using Google Gemini AI."""
    response = chat_session.send_message(f"Summarize this document:\n\n{text}")
    return response.text

@router.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """Uploads PDF, extracts text, and analyzes it using Gemini AI."""
    pdf_bytes = await file.read()
    extracted_text = extract_text_from_pdf(pdf_bytes)
    
    if not extracted_text.strip():
        return {"error": "No text found in PDF"}
    
    analysis_result = await analyze_text_with_gemini(extracted_text)
    return {"summary": analysis_result}

