"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Download } from "lucide-react";
import { toast } from "sonner";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/history")
      .then(r => r.json())
      .then(d => { if(d.data) setHistory(d.data); })
      .catch(() => {});
  }, []);

  const downloadReport = async () => {
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

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Histórico de Scans</h2>
        <p className="text-gray-400">Verifique os resultados das varreduras anteriores.</p>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-sm">
              <th className="pb-3 px-4">Data do Scan</th>
              <th className="pb-3 px-4">Dispositivos</th>
              <th className="pb-3 px-4">Vulnerabilidades</th>
              <th className="pb-3 px-4">Score</th>
              <th className="pb-3 px-4">Ação</th>
            </tr>
          </thead>
          <tbody>
            {history.map((scan, i) => {
              const date = new Date(scan.date).toLocaleString();
              return (
                <motion.tr 
                  initial={{opacity:0, x:-10}} 
                  animate={{opacity:1, x:0}} 
                  transition={{delay: 0.1 * i}}
                  key={i} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-white flex items-center gap-2"><Clock className="w-4 h-4 text-[#00ccff]"/>{date}</td>
                  <td className="py-4 px-4 text-gray-300 font-mono">{scan.devices_found}</td>
                  <td className="py-4 px-4 text-[#ff3366] font-mono">{scan.vulnerabilities_found}</td>
                  <td className="py-4 px-4 text-[#00ff9d] font-mono">{scan.overall_score}/100</td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={downloadReport}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {history.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhum histórico encontrado.</div>
        )}
      </div>
    </div>
  );
}
