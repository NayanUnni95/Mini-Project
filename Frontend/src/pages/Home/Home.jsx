import React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/BreadcrumbWithCustomSeparator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

function Home() {
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundColor: 'rgb(230, 230, 230)',
      }}
    >
      <div className="flex items-center pt-[10px] pl-[20px] pb-[10px]">
        <div className="">
          <SidebarTrigger />
        </div>
        <Separator
          orientation="vertical"
          className="h-[15px] m-[10px] mr-[17px] bg-red-900"
        />
        <BreadcrumbWithCustomSeparator />
      </div>
      <div className="w-full h-full bg-gray-400 grid"></div>
    </div>
  );
}

export default Home;
