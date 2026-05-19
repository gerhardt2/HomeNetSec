"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function VulnerabilitiesPage() {
  const [vulns, setVulns] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/vulnerabilities")
      .then(r => r.json())
      .then(d => { if(d.data) setVulns(d.data); })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Vulnerabilidades Críticas</h2>
        <p className="text-gray-400">Análise de falhas defensivas na sua rede local.</p>
      </div>

      <div className="space-y-4">
        {vulns.map((v, i) => (
          <motion.div 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}} 
            transition={{delay: 0.1 * i}}
            key={i} 
            className={`p-6 rounded-xl border relative overflow-hidden group ${
              v.severity === 'Crítica' || v.severity === 'Alta' 
                ? 'border-[#ff3366]/30 bg-[#ff3366]/5' 
                : 'border-[#ffaa00]/30 bg-[#ffaa00]/5'
            }`}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              v.severity === 'Crítica' || v.severity === 'Alta' ? 'bg-[#ff3366]' : 'bg-[#ffaa00]'
            }`}></div>
            
            <div className="flex items-start justify-between">
              <div>
                <h4 className={`text-xl font-bold mb-2 flex items-center gap-2 ${
                  v.severity === 'Crítica' || v.severity === 'Alta' ? 'text-[#ff3366]' : 'text-[#ffaa00]'
                }`}>
                  {v.severity === 'Crítica' || v.severity === 'Alta' ? <ShieldAlert className="w-5 h-5"/> : <AlertTriangle className="w-5 h-5"/>}
                  {v.name}
                </h4>
                <p className="text-gray-300 mb-4">{v.description}</p>
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="text-[#00ff9d] font-semibold text-sm">RECOMENDAÇÃO: </span>
                  <span className="text-gray-400 text-sm">{v.recommendation}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-black text-xs font-bold px-3 py-1 rounded ${
                  v.severity === 'Crítica' || v.severity === 'Alta' ? 'bg-[#ff3366]' : 'bg-[#ffaa00]'
                }`}>
                  CVSS {v.cvss}
                </span>
                <span className="text-gray-500 text-xs font-mono">ID: {v.id}</span>
                <span className="text-gray-500 text-xs font-mono">Alvo: {v.device}</span>
              </div>
            </div>
          </motion.div>
        ))}
        
        {vulns.length === 0 && (
          <div className="text-center py-8 text-gray-500 glass-panel rounded-xl">
            Nenhuma vulnerabilidade detectada. Faça um scan no Dashboard.
          </div>
        )}
      </div>
    </div>
  );
}
