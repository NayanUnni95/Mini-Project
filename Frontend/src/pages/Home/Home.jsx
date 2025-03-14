import React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/BreadcrumbWithCustomSeparator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { EncDecTabs } from '@/components/EncDecTabs';

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
      <div className="w-full h-full bg-gray-400 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="w-full h-full flex justify-center pt-[5rem]">
          <EncDecTabs />
        </div>
        <div className="h-full bg-red-400 flex justify-center items-center flex-col">
          <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm mb-4">
            Preview Image
          </div>
          <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm mt-4">
            Decrypted Image
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
