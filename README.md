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
![Dashboard](docs/screenshots/dashboard.png)

### Dispositivos Encontrados
![Dispositivos](docs/screenshots/dispositivos.png)

### Vulnerabilidades Criticas
![Vulnerabilidades](docs/screenshots/vulnerabilidades.png)

### Historico de Scans
![Historico](docs/screenshots/historico.png)

### Configuracoes
![Configuracoes](docs/screenshots/configuracoes.png)

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
