import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";
import { ToastProvider } from "../components/ToastProvider";

export const metadata: Metadata = {
  title: "HomeNetSec - Professional Scanner",
  description: "Advanced Network Security Scanner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased flex h-screen overflow-hidden bg-[#0a0a0f]" suppressHydrationWarning>
        <ToastProvider />
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00ff9d]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00ccff]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="p-8 relative z-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
