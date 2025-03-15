import React, { useContext } from 'react';
import { EncDecTabs } from '@/components/EncDecTabs';
import { PassGeneration } from '@/components/PassGeneration';
import { UserDataContext } from '@/context/UserInfoContext';

function Home() {
  const { hiddenFile, imgSrc } = useContext(UserDataContext);
  return (
    <div className="w-full bg-gray-400 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
      <div className="w-full h-full flex justify-center pt-[1rem] pb-[5rem]">
        <EncDecTabs />
      </div>
      <div className="h-full flex justify-center items-center flex-col mt-[10px] pb-[5rem]">
        {/* <div className="w-full h-full flex justify-center">
          <PassGeneration />
        </div>
        <div className="w-full h-full flex justify-center pb-[5rem]">
          <PassGeneration />
        </div> */}
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm mb-4">
          <img src={imgSrc} alt="Preview Image" className="h-full w-full" />
        </div>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm mt-4">
          <img
            src={hiddenFile}
            alt="Decrypted Image"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
