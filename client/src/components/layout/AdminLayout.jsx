import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="font-body text-on-surface antialiased bg-background min-h-screen">
      <AdminSidebar />
      <main className="ml-64 min-h-screen py-8 pr-8 pl-4 lg:py-10 lg:pr-10 lg:pl-6">
        <Outlet />
      </main>
    </div>
  );
}
