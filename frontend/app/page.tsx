"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ShieldAlert, Cpu, Server, CheckCircle2, Download, Terminal, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";

const pieData = [
  { name: 'Seguro', value: 75, color: '#00ff9d' },
  { name: 'Risco Médio', value: 15, color: '#ffaa00' },
  { name: 'Vulnerável', value: 10, color: '#ff3366' },
];

export default function Dashboard() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Busca dados iniciais caso houver
    fetch("http://localhost:8000/api/scan/devices")
      .then(r => r.json())
      .then(d => {
        if(d.data) setDevices(d.data);
        setLoadingInitial(false);
      })
      .catch(() => {
        setLoadingInitial(false);
        toast.error("Erro ao carregar dispositivos. Backend está online?");
      });
  }, []);

  const exportPDF = async () => {
    toast.info("Gerando relatório PDF...");
    try {
      const res = await fetch("http://localhost:8000/api/reports/pdf");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "HomeNetSec_Report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Download concluído com sucesso!");
    } catch (e) {
      toast.error("Erro ao gerar o PDF.");
    }
  };

  const startScan = () => {
    if (scanning) return;
    
    setScanning(true);
    setProgress(0);
    setLogs(["Conectando ao motor de varredura..."]);
    
    try {
      ws.current = new WebSocket("ws://localhost:8000/ws/scan");
      
      ws.current.onopen = () => {
        ws.current?.send("start_scan");
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event === "log") {
          setLogs(prev => [...prev.slice(-4), data.message]);
        } else if (data.event === "progress") {
          setProgress(data.value);
        } else if (data.event === "done") {
          setScanning(false);
          ws.current?.close();
          // Atualiza lista
          fetch("http://localhost:8000/api/scan/devices")
            .then(r => r.json())
            .then(d => { if(d.data) setDevices(d.data); });
        }
      };

      ws.current.onerror = () => {
        setLogs(prev => [...prev, "Erro de conexão com o WebSocket."]);
        setScanning(false);
      };
    } catch (e) {
      setLogs(prev => [...prev, "Falha ao iniciar."]);
      setScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">SOC Dashboard</h2>
          <p className="text-gray-400">Monitoramento e análise em tempo real da rede local</p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 glass-panel hover:bg-white/5 rounded-lg text-white transition-all">
            <Download className="w-4 h-4" /> Exportar PDF
          </button>
          <button 
            onClick={startScan}
            disabled={scanning}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-black font-semibold transition-all ${
              scanning ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#00ff9d] hover:bg-[#00cc7d] shadow-[0_0_15px_rgba(0,255,157,0.4)]'
            }`}
          >
            {scanning ? (
              <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></span> Varrendo... {progress}%</span>
            ) : (
              <><Play className="w-4 h-4" /> Iniciar Scan</>
            )}
          </button>
        </div>
      </div>

      {/* Live Logs Terminal */}
      {scanning && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 rounded-xl border border-[#00ccff]/30 font-mono text-sm relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
            <Terminal className="w-4 h-4 text-[#00ccff]" />
            <span className="text-gray-300">Live Engine Logs</span>
          </div>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="text-[#00ff9d] opacity-80">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {log}
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-[#00ff9d] transition-all duration-300" style={{width: `${progress}%`}}></div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Cpu className="w-16 h-16 text-[#00ccff]" /></div>
          <h3 className="text-gray-400 text-sm mb-1">Dispositivos</h3>
          <div className="text-4xl font-bold text-white neon-text-info">{devices.length}</div>
        </motion.div>
        
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Server className="w-16 h-16 text-[#ffaa00]" /></div>
          <h3 className="text-gray-400 text-sm mb-1">Portas Abertas</h3>
          <div className="text-4xl font-bold text-white">24</div>
        </motion.div>
        
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><ShieldAlert className="w-16 h-16 text-[#ff3366]" /></div>
          <h3 className="text-gray-400 text-sm mb-1">Vulnerabilidades</h3>
          <div className="text-4xl font-bold text-[#ff3366] neon-text-danger">3</div>
        </motion.div>
        
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="glass-panel p-6 rounded-2xl relative overflow-hidden flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm mb-1">Score de Segurança</h3>
            <div className="text-4xl font-bold text-[#00ff9d] neon-text-primary">85/100</div>
          </div>
          <div className="w-16 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={20} outerRadius={30} paddingAngle={5}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Device List */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 relative">
          {loadingInitial && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl z-10 backdrop-blur-sm">
              <span className="animate-pulse text-[#00ff9d] font-mono">Carregando dispositivos...</span>
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Inventário de Rede</h3>
          </div>
          <div className="overflow-x-auto">
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
          </div>
        </div>

        {/* Vulnerabilities Summary */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Alertas Críticos</h3>
          <div className="space-y-4">
            
            <div className="p-4 rounded-xl border border-[#ff3366]/30 bg-[#ff3366]/5 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff3366]"></div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[#ff3366] font-semibold mb-1">FTP Aberto (Porta 21)</h4>
                  <p className="text-gray-400 text-sm">Detectado em 192.168.1.1</p>
                </div>
                <span className="bg-[#ff3366] text-black text-xs font-bold px-2 py-1 rounded">CVSS 7.5</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#ffaa00]/30 bg-[#ffaa00]/5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffaa00]"></div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[#ffaa00] font-semibold mb-1">HTTP Sem TLS</h4>
                  <p className="text-gray-400 text-sm">Detectado em 192.168.1.1</p>
                </div>
                <span className="bg-[#ffaa00] text-black text-xs font-bold px-2 py-1 rounded">CVSS 4.3</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
