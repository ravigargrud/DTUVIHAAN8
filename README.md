# Synapse

Synapse is an AI-driven telephone assistant for healthcare websites built with FastAPI and React. It leverages Gemini for NLP, Twilio for calls, and WebSockets for real-time communication. medAI automates routine inquiries, triages symptoms, schedules appointments, securely stores patient data, sends medication reminders, scrapes healthcare schemes, and assists with preliminary diagnosis.

---

## Features

- **Automated Health Q&A:**  
  Uses Gemini-powered NLP to understand and answer frequently asked health questions with accurate, empathetic responses.

- **Symptom Triage & Appointment Scheduling:**  
  Classifies symptoms by urgency and recommends appropriate actions. Automatically schedules appointments based on the severity of the user's condition.

- **Medication Reminders:**  
  Triggers automated calls via Twilio to remind patients to take medications on time, ensuring adherence and continuity of care.

- **Healthcare Schemes Scraper:**  
  Scrapes and aggregates relevant government and private healthcare schemes, presenting users with up-to-date benefits and programs tailored to their needs.

- **Preliminary Medical Report Analysis:**  
  Analyzes uploaded medical reports to provide initial diagnostic insights, supporting healthcare professionals with early detection and consultation assistance.

- **Real-Time Communication:**  
  Uses WebSockets to maintain live, bidirectional connections between the client and server, ensuring immediate updates and seamless interaction.

---

## Technologies

- **Backend:** FastAPI  
- **Frontend:** React  
- **NLP Engine:** Gemini  
- **Telephony:** Twilio  
- **Real-Time Communication:** WebSockets

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ravigargrud/synapse.git
   cd synapse
   ```

2. **Backend Setup:**

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend Setup:**

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Configuration:**

   Create a `.env` file in the backend folder with necessary keys (e.g., TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, DATABASE_URL).

---

## Usage

- **Patients:** Interact via telephone or the web interface to get instant health guidance, symptom triage, and appointment scheduling.
- **Healthcare Providers:** Monitor and manage patient inquiries and appointment schedules through the integrated dashboard.

---

## Contributing

Contributions are welcome! Please fork the repo, create a branch for your changes, commit, and open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---