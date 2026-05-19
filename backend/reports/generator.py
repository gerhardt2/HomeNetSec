from fastapi.responses import FileResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os
import matplotlib.pyplot as plt

def generate_pdf_report(scan_data: dict, filename: str = "report.pdf"):
    os.makedirs("reports_output", exist_ok=True)
    filepath = os.path.join("reports_output", filename)
    
    # Gerar um gráfico temporário com matplotlib
    score = scan_data.get('score', 85)
    labels = ['Seguro', 'Risco']
    sizes = [score, 100 - score]
    fig, ax = plt.subplots(figsize=(3,3))
    ax.pie(sizes, labels=labels, colors=['#00ff9d', '#ff3366'], startangle=90)
    ax.axis('equal')
    chart_path = os.path.join("reports_output", "chart_temp.png")
    plt.savefig(chart_path, transparent=True)
    plt.close()

    c = canvas.Canvas(filepath, pagesize=letter)
    
    # Capa Profissional
    c.setFont("Helvetica-Bold", 24)
    c.drawString(180, 600, "HomeNetSec - Relatório de Auditoria")
    c.setFont("Helvetica", 14)
    c.drawString(240, 560, "Rede Local Doméstica")
    c.drawString(200, 530, f"Data da Análise: {scan_data.get('date', 'N/A')}")
    c.drawImage(chart_path, 200, 300, width=200, height=200)
    
    c.showPage()
    
    # Resumo Executivo
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, 750, "Resumo Executivo")
    c.setFont("Helvetica", 12)
    c.drawString(50, 720, f"Dispositivos Encontrados: {len(scan_data.get('devices', []))}")
    c.drawString(50, 700, f"Vulnerabilidades Críticas: {scan_data.get('vulnerabilities', 0)}")
    c.drawString(50, 680, f"Score Geral de Segurança: {score}/100")
    
    y_pos = 630
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_pos, "Lista de Dispositivos e Riscos:")
    y_pos -= 30
    
    c.setFont("Helvetica", 10)
    for device in scan_data.get("devices", []):
        c.drawString(50, y_pos, f"IP: {device.get('ip')} | MAC: {device.get('mac')}")
        c.drawString(300, y_pos, f"OS: {device.get('os')} | Risco: {device.get('risk')}")
        y_pos -= 20
        
        if y_pos < 100:
            c.showPage()
            y_pos = 750
            
    c.save()
    
    if os.path.exists(chart_path):
        os.remove(chart_path)
        
    return filepath
