def analyze_vulnerabilities(ports: list):
    vulnerabilities = []
    
    # Regras defensivas simples baseadas em portas abertas
    port_numbers = [p.get("port") for p in ports]
    
    if 21 in port_numbers:
        vulnerabilities.append({
            "id": "VULN-001",
            "name": "FTP Aberto",
            "severity": "Alta",
            "description": "O serviço FTP transmite dados e senhas em texto plano.",
            "recommendation": "Desabilite o FTP ou utilize SFTP/FTPS.",
            "cvss": 7.5
        })
        
    if 23 in port_numbers:
        vulnerabilities.append({
            "id": "VULN-002",
            "name": "Telnet Habilitado",
            "severity": "Crítica",
            "description": "Telnet é um protocolo inseguro, transmitindo tudo em texto plano.",
            "recommendation": "Desabilite imediatamente e utilize SSH.",
            "cvss": 9.0
        })
        
    if 80 in port_numbers and 443 not in port_numbers:
        vulnerabilities.append({
            "id": "VULN-003",
            "name": "HTTP Sem HTTPS",
            "severity": "Média",
            "description": "O tráfego web não está criptografado, sujeito a interceptação.",
            "recommendation": "Configure um certificado SSL/TLS e redirecione HTTP para HTTPS.",
            "cvss": 4.3
        })
        
    if 445 in port_numbers:
        vulnerabilities.append({
            "id": "VULN-004",
            "name": "SMB Exposto",
            "severity": "Alta",
            "description": "Serviço de compartilhamento de arquivos exposto, possível vetor para ransomware.",
            "recommendation": "Restrinja o acesso via firewall e desabilite SMBv1.",
            "cvss": 7.8
        })

    return vulnerabilities
