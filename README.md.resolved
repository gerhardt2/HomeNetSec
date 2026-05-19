# HomeNetSec

HomeNetSec is a professional, defensively-oriented network security scanner for home and lab environments.

> **Warning:** This tool is intended for educational purposes, personal auditing, and use on authorized networks only. It should not be used for malicious purposes.

## Features
- **Device Discovery:** ARP and Ping sweeps to find connected devices.
- **Port Scanning:** Asynchronous TCP port scanning for common services.
- **Vulnerability Analysis:** Basic defensive checks (e.g., exposed FTP, Telnet).
- **Real-time Dashboard:** Built with Next.js, Tailwind CSS, Framer Motion, and WebSockets.
- **Reporting:** Export security assessments to PDF.

## Requirements (Windows)
- Node.js 20+
- Python 3.11+
- Npcap (if you plan to use `scapy` natively on Windows for ARP scanning).

## Setup & Run Locally

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### 3. Docker Compose (Alternative)
```bash
docker-compose up --build
```
