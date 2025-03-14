import React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/BreadcrumbWithCustomSeparator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

function Navigate() {
  return (
    <div className="flex items-center pt-[10px] pl-[20px] pb-[10px] bg-white">
      <div className="">
        <SidebarTrigger />
      </div>
      <Separator
        orientation="vertical"
        className="h-[15px] m-[10px] mr-[17px] bg-red-900"
      />
      <BreadcrumbWithCustomSeparator />
    </div>
  );
}

export default Navigate;
