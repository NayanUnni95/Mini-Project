import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../components/AppSidebar/AppSidebar';

function AppLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
