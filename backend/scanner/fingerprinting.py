def estimate_os(ttl: int, ports: list):
    # Estimativa basica por TTL de pacotes ICMP/IP
    # Linux/Mac costuma ter TTL 64, Windows 128, Cisco 255
    if ttl <= 64:
        return "Linux / Unix / macOS"
    elif ttl <= 128:
        return "Windows"
    else:
        return "Network Device / Router"
        
def estimate_device_type(mac_vendor: str, open_ports: list):
    if "Apple" in mac_vendor:
        return "Apple Device"
    if 3389 in open_ports:
        return "Windows PC"
    if 22 in open_ports and 80 in open_ports:
        return "Server / NAS"
    return "Unknown Device"
