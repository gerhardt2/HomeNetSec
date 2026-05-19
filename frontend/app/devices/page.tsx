"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export default function DevicesPage() {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/scan/devices")
      .then(r => r.json())
      .then(d => { if(d.data) setDevices(d.data); })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Dispositivos Encontrados</h2>
        <p className="text-gray-400">Gerencie todos os dispositivos identificados na sua rede.</p>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-sm">
              <th className="pb-3 px-4">Endereço IP</th>
              <th className="pb-3 px-4">Endereço MAC</th>
              <th className="pb-3 px-4">Fabricante</th>
              <th className="pb-3 px-4">SO Estimado</th>
              <th className="pb-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, i) => (
              <motion.tr 
                initial={{opacity:0, x:-10}} 
                animate={{opacity:1, x:0}} 
                transition={{delay: 0.1 * i}}
                key={i} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <td className="py-4 px-4 text-white font-mono">{device.ip}</td>
                <td className="py-4 px-4 text-gray-400 font-mono text-sm">{device.mac}</td>
                <td className="py-4 px-4 text-gray-300">{device.vendor}</td>
                <td className="py-4 px-4 text-gray-300">{device.os}</td>
                <td className="py-4 px-4">
                  {device.risk === 'Low' ? (
                    <span className="flex items-center gap-1 text-[#00ff9d] text-xs px-2 py-1 bg-[#00ff9d]/10 rounded-full w-max">
                      <CheckCircle2 className="w-3 h-3" /> Seguro
                    </span>
                  ) : device.risk === 'Medium' ? (
                    <span className="flex items-center gap-1 text-[#ffaa00] text-xs px-2 py-1 bg-[#ffaa00]/10 rounded-full w-max">
                      <AlertTriangle className="w-3 h-3" /> Atenção
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#ff3366] text-xs px-2 py-1 bg-[#ff3366]/10 rounded-full w-max">
                      <ShieldAlert className="w-3 h-3" /> Risco
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {devices.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhum dispositivo encontrado. Faça um scan no Dashboard.</div>
        )}
      </div>
    </div>
  );
}
