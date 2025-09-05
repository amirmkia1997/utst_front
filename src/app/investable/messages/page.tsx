'use client';

import Image from 'next/image';

export default function Messages() {
  return (
    <>
      <div className=" bg-white shadow-sm flex justify-center flex-col items-center h-full ">
        <Image src="/images/Union.svg" alt="logo" width={100} height={100} />
        <p className=" text-sm pt-4">هیچ پیامی ندارید</p>
        <p className=" text-sm">پیام‌ها اینجا نمایش داده میشود</p>
      </div>
    </>
  );
}
