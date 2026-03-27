import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-body text-on-surface antialiased bg-background min-h-screen">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-surface border-b border-surface-container-highest sticky top-0 z-30">
        <h1 className="font-headline font-extrabold text-[#0052CC] text-xl">Admin Console</h1>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-on-surface hover:bg-surface-container rounded-lg transition-colors">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>

      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 min-h-screen p-4 sm:p-6 md:p-8 lg:py-10 lg:pr-10 lg:pl-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
