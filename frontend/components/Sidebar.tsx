"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Activity, List, Settings, AlertTriangle, Clock } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: Activity, color: "text-[#00ccff]" },
    { href: "/devices", label: "Dispositivos", icon: List, color: "" },
    { href: "/vulnerabilities", label: "Vulnerabilidades", icon: AlertTriangle, color: "" },
    { href: "/history", label: "Histórico", icon: Clock, color: "" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 glass-panel border-r border-r-white/5 flex flex-col z-10">
      <div className="p-6 flex items-center gap-3">
        <Shield className="text-[#00ff9d] w-8 h-8" />
        <h1 className="text-xl font-bold tracking-wider text-white">HomeNet<span className="text-[#00ff9d]">Sec</span></h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-white/10 text-white border border-white/10" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? link.color : ""}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6">
        <Link 
          href="/settings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            pathname === "/settings" 
              ? "bg-white/10 text-white border border-white/10" 
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
      </div>
    </aside>
  );
}
