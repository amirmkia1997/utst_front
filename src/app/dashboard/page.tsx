'use client';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DangerCircle, UserCircle } from '@solar-icons/react';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCompleteProfile = () => {
    setIsModalOpen(false);
    setIsProfileModalOpen(true);
  };

  const handleBackToInogate = () => {
    router.push('/ecosystem');
  };

  const handleProfileModalOk = () => {
    setIsProfileModalOpen(false);
    router.push('/profile');
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#1B36FF] mb-4">
          سلام! 👋
        </h1>
        <p className="text-center text-gray-600">
          به داشبورد اینوگیت خوش آمدید
        </p>
      </div>

      <Modal open={isModalOpen} centered closable={false} footer={null}>
        <>
          <div className=" w-full flex justify-center items-center">
            <Image
              src="/images/Layer 1.png"
              alt="dashboard"
              width={70}
              height={70}
            />
          </div>
          <p className="text-center text-[#1B36FF] pt-4 text-xl font-bold">
            به اینوگیت خوش آمدید
          </p>
          <p className="text-center ">
            حالا شما عضو اینوگیت هستید و صدها پروژه مختلف در دسترس شماست
          </p>
          <div className=" w-full flex justify-between gap-2 mt-4">
            <Button
              className=" w-full"
              type="primary"
              onClick={handleCompleteProfile}
              size="large"
            >
              تکمیل مشخصات
            </Button>
            <Button
              color="primary"
              variant="outlined"
              className=" w-full"
              onClick={handleBackToInogate}
              size="large"
            >
              بازگشت به اینوگیت
            </Button>
          </div>
        </>
      </Modal>

      <Modal open={isProfileModalOpen} centered closable={false} footer={null}>
        <>
          <div className=" w-full flex justify-center items-center">
            <UserCircle size={64} color="#1B36FF" />
          </div>
          <p className=" py-4 text-center ">
            {' '}
            برای تکمیل مشخصات، ابتدا دسته پروفایل خود را انتخاب کنید
          </p>
          <div className=" w-full flex justify-center">
            <div className=" w-fit px-2 py-2 rounded-lg text-sm flex gap-2 bg-[#FFAB0014] items-center">
              <DangerCircle size={24} color="#F0A100" />
              <p>شما در هر زمان امکان انتخاب دسته دیگر را دارید</p>
            </div>
          </div>

          <div className=" flex items-center justify-between w-full gap-2 mt-8">
            <Button
              color="primary"
              variant="outlined"
              className=" w-full"
              size="large"
              onClick={() => router.push('/investor/profile')}
            >
              سرمایه‌گذار
            </Button>
            <Button
              color="primary"
              variant="outlined"
              className=" w-full"
              size="large"
              onClick={() => router.push('/investable/profile')}
            >
              سرمایه‌پذیر
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
}
