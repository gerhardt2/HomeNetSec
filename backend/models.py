from sqlalchemy import Column, Integer, String, DateTime, Float
from database import Base
import datetime

class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    devices_found = Column(Integer, default=0)
    vulnerabilities_found = Column(Integer, default=0)
    overall_score = Column(Float, default=100.0)
    status = Column(String, default="completed")

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    ip_scope = Column(String, default="192.168.1.0/24")
    timeout = Column(Integer, default=3)
    theme = Column(String, default="dark")
