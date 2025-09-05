'use client';

import { Button, Empty, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Eye, TrashBinTrash, Mailbox } from '@solar-icons/react';
import { useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, clearCart, getCartCount } = useCart();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'پذیرفته شده';
      case 'pending':
        return 'در انتظار تایید';
      case 'rejected':
        return 'رد شده';
      case 'under_review':
        return 'در حال بررسی';
      case 'under_investment':
        return 'در حال سرمایه‌گذاری';
      case 'invested':
        return 'سرمایه‌گذاری شده';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'under_review':
        return 'bg-blue-100 text-blue-700';
      case 'under_investment':
        return 'bg-purple-100 text-purple-700';
      case 'invested':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Empty
          description="کارتابل شما خالی است"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => router.push('/ecosystem')}
          >
            مشاهده پروژه‌ها
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  کارتابل پروژه‌ها
                </h1>
                <p className="text-gray-600 mt-2">
                  {getCartCount()} پروژه در کارتابل شما
                </p>
              </div>
              <Button
                danger
                size="large"
                onClick={clearCart}
                icon={<TrashBinTrash size={20} />}
              >
                خالی کردن کارتابل
              </Button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.title}
                      </h3>
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${getStatusColor(item.status)}`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {item.investment_amount && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">
                          مبلغ درخواستی:
                        </div>
                        <div className="font-bold text-[#1B36FF]">
                          {item.investment_amount.toLocaleString()} تومان
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-gray-500">
                      اضافه شده در:{' '}
                      {new Date(item.added_at).toLocaleDateString('fa-IR')}
                    </div>
                  </div>

                  <div className="flex gap-3 ml-6">
                    <Button
                      color="primary"
                      variant="outlined"
                      size="large"
                      icon={<Eye size={20} />}
                      onClick={() =>
                        router.push(`/ecosystem/project-details?id=${item.id}`)
                      }
                    >
                      مشاهده جزئیات
                    </Button>
                    <Button
                      danger
                      variant="outlined"
                      size="large"
                      icon={<TrashBinTrash size={20} />}
                      onClick={() => removeFromCart(item.id)}
                    >
                      حذف از کارتابل
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-800">
                مجموع: {getCartCount()} پروژه
              </div>
              <div className="flex gap-4">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setIsRequestModalOpen(true)}
                >
                  ارسال درخواست سرمایه‌گذاری
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Request Success Modal */}
      <Modal
        open={isRequestModalOpen}
        centered
        closable={false}
        footer={null}
        width={500}
      >
        <div className="text-center py-6">
          <div className="flex justify-center mb-6">
            <Mailbox size={80} color="#1B36FF" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            درخواست سرمایه‌گذاری ارسال شد
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            درخواست سرمایه‌گذاری برای{' '}
            <span className="text-[#1B36FF] font-medium">
              {getCartCount()} پروژه
            </span>{' '}
            در کارتابل شما ارسال شد. شما می‌توانید از بخش{' '}
            <span className="text-[#1B36FF] font-medium">
              مدیریت درخواست‌ها
            </span>{' '}
            در پروفایل خود از آخرین وضعیت درخواست‌ها اطلاع پیدا کنید
          </p>

          <div className="flex gap-3">
            <Button
              size="large"
              onClick={() => {
                setIsRequestModalOpen(false);
                router.push('/ecosystem');
              }}
              className="flex-1"
            >
              ادامه خرید
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setIsRequestModalOpen(false);
                clearCart();
                router.push('/investable/requests');
              }}
              className="flex-1"
            >
              مشاهده درخواست‌ها
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
