# HomeNetSec

![Python](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Licença](https://img.shields.io/badge/Uso-Educacional%20%2F%20Autorizado-yellow)

HomeNetSec é um scanner de segurança de rede profissional e defensivo, desenvolvido para ambientes domésticos e de laboratório.

> **⚠️ Aviso:** Esta ferramenta é destinada exclusivamente para fins educacionais, auditoria pessoal e uso em redes autorizadas. O uso não autorizado é estritamente proibido.

---

## 👤 Sobre o autor

Este projeto faz parte do meu portfólio pessoal de segurança.  
Fique à vontade para explorar meus outros projetos e ferramentas no GitHub:

**🔗 [github.com/gerhardt2](https://github.com/gerhardt2)**

---

## 🖼️ Screenshots

### SOC Dashboard
<img width="1885" height="846" alt="dashboard" src="https://github.com/user-attachments/assets/8f3dbe5f-ba32-4b6f-857b-f0438182ce24" />

### Dispositivos Encontrados
<img width="1867" height="600" alt="dispositivos" src="https://github.com/user-attachments/assets/f06a5d13-1f90-49f1-abac-a1c7f6f1626f" />

### Vulnerabilidades Criticas
<img width="1685" height="627" alt="Vulnerabilidades" src="https://github.com/user-attachments/assets/dd5325e7-fd21-4016-82e4-4bfe87ce6424" />

### Historico de Scans
<img width="1897" height="795" alt="historico" src="https://github.com/user-attachments/assets/c4494f2e-a590-49f6-a40e-79dc7d20946e" />

### Configuracoes
<img width="1240" height="761" alt="Configuracoes" src="https://github.com/user-attachments/assets/716b7381-1d3c-4343-af20-dc1d74b437b7" />

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🔍 **Descoberta de dispositivos** | Varredura ARP e ping para encontrar dispositivos conectados |
| 🔌 **Escaneamento de portas** | Escaneamento TCP assíncrono para serviços comuns |
| 🛡️ **Análise de vulnerabilidades** | Verificações defensivas (ex.: FTP e Telnet expostos) |
| 📊 **Dashboard em tempo real** | Desenvolvido com Next.js, Tailwind CSS, Framer Motion e WebSockets |
| 📄 **Relatórios em PDF** | Exporte avaliações de segurança em PDF |

---

## 🖥️ Requisitos (Windows)

- Node.js 20+
- Python 3.11+
- [Npcap](https://npcap.com/) — necessário para varredura ARP com Scapy no Windows

---

## 🚀 Instalação e execução local

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

### 3. Docker Compose (alternativa)

```bash
docker-compose up --build
```
