import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '../components/AppSidebar/AppSidebar'

function AppLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
          <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
