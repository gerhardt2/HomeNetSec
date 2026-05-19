"use client";
import { toast } from "sonner";

export default function SettingsPage() {
  
  const saveSettings = (e: any) => {
    e.preventDefault();
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Configurações</h2>
        <p className="text-gray-400">Ajuste os parâmetros do scanner de rede.</p>
      </div>

      <form onSubmit={saveSettings} className="glass-panel p-6 rounded-2xl space-y-6">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Escopo de IP da Varredura</label>
          <input 
            type="text" 
            defaultValue="192.168.1.0/24"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00ff9d] transition-colors font-mono"
          />
          <p className="text-xs text-gray-500 mt-2">Dica: Use notação CIDR. O sistema bloqueia IPs externos (ex: 8.8.8.8) por segurança.</p>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Timeout do Scanner de Portas (segundos)</label>
          <input 
            type="number" 
            defaultValue="1"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00ff9d] transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Tema Visual</label>
          <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00ff9d] transition-colors">
            <option>Dark/Neon Cyber</option>
            <option>Dark Minimalista</option>
          </select>
        </div>

        <button 
          type="submit"
          className="px-6 py-3 bg-[#00ff9d] text-black font-bold rounded-lg hover:bg-[#00cc7d] transition-colors w-full"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}
