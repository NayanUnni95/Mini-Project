import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../components/AppSidebar/AppSidebar';
import Navigate from '@/components/Navigate';

function AppLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div
          className="w-full h-screen"
          style={{
            backgroundColor: 'rgb(230, 230, 230)',
          }}
        >
          <Navigate />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
