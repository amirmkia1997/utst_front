'use client';

import {
  Bell,
  FolderWithFiles,
  UserCircle,
  WalletMoney,
} from '@solar-icons/react';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function EcosystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white shadow-sm ">
        <div className=" w-full py-4">
          <div className="flex items-center space-x-2 bg-[#F6F7FF] justify-between max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
            <Image
              src="/images/Layer 1 (1).png"
              alt="logo"
              width={100}
              height={100}
            />
            <div className="flex items-center space-x-4 gap-4">
              <Bell className="text-xl text-[#1B36FF]" />
              <Link href="/investable/profile">
                <Button
                  color="primary"
                  variant="outlined"
                  icon={<UserCircle size={24} />}
                >
                  پروفایل من
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6 gap-4">
                <Link
                  href="/ecosystem"
                  className="flex items-center space-x-2 text-[#1B36FF] gap-2 border-b-2 border-[#1B36FF] pb-1"
                >
                  <FolderWithFiles />
                  <span>اکوسیستم مجازی</span>
                </Link>
                <Link
                  href="/investors"
                  className="flex gap-2 items-center space-x-2 text-gray-600 hover:text-[#1B36FF]"
                >
                  <WalletMoney />
                  <span>سرمایه گذاران</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
