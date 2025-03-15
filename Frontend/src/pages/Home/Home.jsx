import React, { useContext, useEffect } from 'react';
import { EncDecTabs } from '@/components/EncDecTabs';
import { PassGeneration } from '@/components/PassGeneration';
import { UserDataContext } from '@/context/UserInfoContext';
import { Image } from 'lucide-react';

function Home() {
  const { hiddenFile, imgSrc } = useContext(UserDataContext);
  return (
    <div className="w-full h-[100%] bg-gray-400 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 p-[5px]">
      <div className="w-full flex justify-center pt-[0.5rem] bg-green-500 rounded-[0.5rem]">
        <EncDecTabs />
      </div>
      <div className="flex justify-center items-center flex-col bg-blue-500 rounded-[0.5rem] ml-[5px] md:mt-[5px] sm:mt-[5px]">
        <div className="w-full flex justify-center">
          <PassGeneration />
        </div>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm mb-8 mt-10">
          {imgSrc ? (
            <img src={imgSrc} alt="Preview Image" className="h-full w-full" />
          ) : (
            <>
              <Image />
              <h3>Preview Image</h3>
            </>
          )}
        </div>
        <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm mt-8 mb-10">
          {imgSrc ? (
            <img
              src={hiddenFile}
              alt="Decrypted Image"
              className="h-full w-full"
            />
          ) : (
            <>
              <Image />
              <h3>Decrypted Image</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
