import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="font-body text-on-surface antialiased bg-background min-h-screen">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-8 lg:p-12">
        <Outlet />
      </main>
    </div>
  );
}
