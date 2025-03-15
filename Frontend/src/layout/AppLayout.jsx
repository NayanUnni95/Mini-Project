import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import Navigate from '@/components/Navigate';
import UserInfoContext from '@/context/UserInfoContext';

function AppLayout() {
  return (
    <div>
      <UserInfoContext>
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
      </UserInfoContext>
    </div>
  );
}

export default AppLayout;
