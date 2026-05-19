import asyncio
import socket

COMMON_PORTS = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    135: "RPC",
    139: "NetBIOS",
    143: "IMAP",
    443: "HTTPS",
    445: "SMB",
    3389: "RDP"
}

async def scan_port(ip: str, port: int, timeout: int = 1):
    try:
        conn = asyncio.open_connection(ip, port)
        reader, writer = await asyncio.wait_for(conn, timeout=timeout)
        writer.close()
        await writer.wait_closed()
        return {"port": port, "service": COMMON_PORTS.get(port, "Unknown"), "state": "open"}
    except (asyncio.TimeoutError, ConnectionRefusedError, OSError):
        return None

async def scan_common_ports(ip: str):
    tasks = [scan_port(ip, port) for port in COMMON_PORTS.keys()]
    results = await asyncio.gather(*tasks)
    return [r for r in results if r is not None]
