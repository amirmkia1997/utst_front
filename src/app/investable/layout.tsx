'use client';

import {
  AddCircle,
  Bell,
  Eye,
  File,
  FolderWithFiles,
  LockPassword,
  Logout2,
  Settings,
  UserCircle,
  WalletMoney,
  Library,
} from '@solar-icons/react';
import { Button, Modal, Badge } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

export default function InvestableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { getCartCount } = useCart();

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    router.push('/auth');
  };

  // Check if current route is upload related
  const isUploadRoute = pathname.includes('/upload');
  const isInvestorsRoute = pathname.includes('/investors');
  const isProfileRoute = pathname.includes('/profile');

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
              <Link href="/cart">
                <Badge count={getCartCount()} size="small">
                  <Button
                    color="primary"
                    variant="outlined"
                    icon={<Library size={24} />}
                  >
                    کارتابل
                  </Button>
                </Badge>
              </Link>
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
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#1B36FF] gap-2"
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
        {isUploadRoute || isInvestorsRoute ? (
          // For upload routes, show only children without sidebar
          children
        ) : (
          // For other routes, show sidebar + children
          <div className="flex gap-8">
            {/* Right Sidebar */}
            <div className="w-80 bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-1">
                <div className=" bg-[#E8EBFF] rounded-lg">
                  <Link
                    href="/investable/profile"
                    className={`flex items-center space-x-3 p-3 gap-2 rounded-lg ${
                      pathname === '/investable/profile'
                        ? 'text-[#1B36FF]'
                        : 'text-gray-700'
                    }`}
                  >
                    <UserCircle weight="Bold" size={20} color="#1B36FF" />
                    <span>اطلاعات حساب کاربری</span>
                  </Link>
                  <Link
                    href="/investable/profile"
                    className={`flex items-center space-x-3 p-3 gap-2 rounded-lg ${
                      pathname === '/investable/profile'
                        ? 'text-[#1B36FF]'
                        : 'text-gray-700'
                    }`}
                  >
                    <Image
                      src="/images/Default.svg"
                      alt="project"
                      width={20}
                      height={20}
                    />
                    <div>
                      <p className=" my-1 text-sm">سرمایه‌پذیر</p>
                      <p className="  text-xs">۰۹۱۲۳۴۵۶۷۸۹</p>
                    </div>
                  </Link>
                </div>
                <Link
                  href="/investable/projects"
                  className={`flex items-center space-x-3 p-3 gap-2 rounded-lg hover:bg-gray-50 ${
                    pathname === '/investable/projects'
                      ? 'bg-[#E8EBFF] text-[#1B36FF]'
                      : 'text-gray-700'
                  }`}
                >
                  <File
                    size={20}
                    weight={
                      pathname === '/investable/projects' ? 'Bold' : 'Outline'
                    }
                  />
                  <span>طرح ها و شرکت ها</span>
                </Link>
                <Link
                  href="/investable/requests"
                  className={`flex items-center gap-2 space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                    pathname === '/investable/requests'
                      ? 'bg-[#E8EBFF] text-[#1B36FF]'
                      : 'text-gray-700'
                  }`}
                >
                  <LockPassword
                    size={20}
                    weight={
                      pathname === '/investable/requests' ? 'Bold' : 'Outline'
                    }
                  />
                  <span>مدیریت درخواستها</span>
                </Link>
                <Link
                  href="/cart"
                  className={`flex items-center gap-2 space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                    pathname === '/cart'
                      ? 'bg-[#E8EBFF] text-[#1B36FF]'
                      : 'text-gray-700'
                  }`}
                >
                  <Badge count={getCartCount()} size="small">
                    <Library
                      size={20}
                      weight={pathname === '/cart' ? 'Bold' : 'Outline'}
                    />
                  </Badge>
                  <span>کارتابل</span>
                </Link>
                <Link
                  href="/investable/messages"
                  className={`flex items-center gap-2 space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                    pathname === '/investable/messages'
                      ? 'bg-[#E8EBFF] text-[#1B36FF]'
                      : 'text-gray-700'
                  }`}
                >
                  <Bell
                    size={20}
                    weight={
                      pathname === '/investable/messages' ? 'Bold' : 'Outline'
                    }
                  />
                  <span>پیام ها </span>
                </Link>
                <Link
                  href="/investable/settings"
                  className={`flex items-center gap-2 space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                    pathname === '/investable/settings'
                      ? 'bg-[#E8EBFF] text-[#1B36FF]'
                      : 'text-gray-700'
                  }`}
                >
                  <Settings
                    size={20}
                    weight={
                      pathname === '/investable/settings' ? 'Bold' : 'Outline'
                    }
                  />
                  <span>تنظیمات</span>
                </Link>
                <Link
                  href="/investable/profile-preview"
                  className={`flex items-center gap-2 space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                    pathname === '/investable/profile-preview'
                      ? 'bg-[#E8EBFF] text-[#1B36FF]'
                      : 'text-gray-700'
                  }`}
                >
                  <Eye
                    size={20}
                    weight={
                      pathname === '/investable/profile-preview'
                        ? 'Bold'
                        : 'Outline'
                    }
                  />
                  <span>پیش نمایش پروفایل</span>
                </Link>
                <Link
                  href="/investable/add-account"
                  className={`flex items-center gap-2 space-x-3 p-3 rounded-lg hover:bg-gray-50 ${
                    pathname === '/investable/add-account'
                      ? 'bg-[#E8EBFF] text-[#1B36FF]'
                      : 'text-gray-700'
                  }`}
                >
                  <AddCircle
                    size={20}
                    weight={
                      pathname === '/investable/add-account'
                        ? 'Bold'
                        : 'Outline'
                    }
                  />
                  <span>اضافه کردن حساب کاربری جدید</span>
                </Link>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex items-center gap-2 space-x-3 p-3 rounded-lg hover:bg-red-50 text-red-600 w-full text-right"
                >
                  <Logout2 size={20} />
                  <span>خروج از حساب کاربری</span>
                </button>
              </nav>
            </div>
            <div className="flex-1">{children}</div>
          </div>
        )}
      </div>

      <Modal open={isLogoutModalOpen} centered closable={false} footer={null}>
        <div className=" flex w-full justify-center">
          <Logout2 size={60} color="#CC3931" />
        </div>
        <p className=" text-center py-4">
          آیا از خروج از حساب کاربری خود مطمئن هستید؟
        </p>
        <div className=" flex w-full justify-between gap-2">
          <Button
            color="danger"
            variant="solid"
            size="large"
            className=" w-full"
            onClick={handleLogout}
          >
            خروج از حساب کاربری
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            className=" w-full"
            onClick={() => setIsLogoutModalOpen(false)}
          >
            انصراف
          </Button>
        </div>
      </Modal>
    </div>
  );
}
