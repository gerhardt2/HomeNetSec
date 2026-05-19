import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, Depends
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import datetime
from sqlalchemy.orm import Session

from websocket.live_scan import connection_manager
from scanner.discovery import async_arp_scan, get_mock_devices
from reports.generator import generate_pdf_report
from database import engine, Base, SessionLocal
from models import ScanHistory, Settings

# Inicializa banco de dados SQLite
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HomeNetSec API", description="Security Scanner API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"status": "HomeNetSec API is running"}

@app.get("/api/scan/devices")
async def scan_devices(ip_range: str = "192.168.1.0/24"):
    devices = await async_arp_scan(ip_range)
    return {"status": "success", "data": devices}

@app.get("/api/reports/pdf")
def get_pdf_report():
    mock_data = {
        "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "devices": get_mock_devices(),
        "vulnerabilities": 2,
        "score": 85
    }
    filepath = generate_pdf_report(mock_data)
    return FileResponse(filepath, media_type="application/pdf", filename="HomeNetSec_Report.pdf")

@app.get("/api/vulnerabilities")
def get_vulnerabilities():
    return {
        "status": "success",
        "data": [
            {
                "id": "VULN-001",
                "name": "FTP Aberto",
                "severity": "Alta",
                "description": "O serviço FTP transmite dados e senhas em texto plano.",
                "recommendation": "Desabilite o FTP ou utilize SFTP/FTPS.",
                "cvss": 7.5,
                "device": "192.168.1.1"
            },
            {
                "id": "VULN-003",
                "name": "HTTP Sem HTTPS",
                "severity": "Média",
                "description": "O tráfego web não está criptografado, sujeito a interceptação.",
                "recommendation": "Configure um certificado SSL/TLS.",
                "cvss": 4.3,
                "device": "192.168.1.1"
            }
        ]
    }

@app.get("/api/history")
def get_history(db: Session = Depends(get_db)):
    scans = db.query(ScanHistory).order_by(ScanHistory.date.desc()).all()
    if not scans:
        scan1 = ScanHistory(devices_found=4, vulnerabilities_found=2, overall_score=85.0)
        scan2 = ScanHistory(devices_found=3, vulnerabilities_found=0, overall_score=100.0, date=datetime.datetime.utcnow() - datetime.timedelta(days=1))
        db.add_all([scan1, scan2])
        db.commit()
        scans = db.query(ScanHistory).order_by(ScanHistory.date.desc()).all()
    return {"status": "success", "data": scans}

@app.websocket("/ws/scan")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    await connection_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if data == "start_scan":
                await connection_manager.send_personal_message('{"event": "log", "message": "Starting network scan..."}', websocket)
                
                for i in range(1, 11):
                    await asyncio.sleep(0.5)
                    await connection_manager.send_personal_message(f'{{"event": "progress", "value": {i*10}}}', websocket)
                    await connection_manager.send_personal_message(f'{{"event": "log", "message": "Scanning chunk {i}..."}}', websocket)
                
                await connection_manager.send_personal_message('{"event": "done", "message": "Scan complete"}', websocket)
                
                # Salvar no histórico
                new_scan = ScanHistory(devices_found=4, vulnerabilities_found=2, overall_score=85.0)
                db.add(new_scan)
                db.commit()
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
