'use client';

import { AltArrowDown, MinimalisticMagnifer } from '@solar-icons/react';
import { Button, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useApi';
import { useCart } from '@/hooks/useCart';

export default function Ecosystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { projects, loading, error } = useProjects();
  const { addToCart, isInCart, getCartCount } = useCart();

  // فیلتر پروژه‌ها بر اساس جستجو
  const filteredProjects = projects.filter(
    project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (project: any) => {
    try {
      addToCart(project);
    } catch (error) {
      message.error('خطا در اضافه کردن پروژه به کارتابل');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">خطا در بارگذاری پروژه‌ها: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter and Search Section */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="جستجو کنید"
            size="large"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            prefix={
              <MinimalisticMagnifer size={16} className="text-gray-400" />
            }
            className="rounded-lg"
          />
        </div>
        <Button
          size="large"
          className="bg-[#EDEFFF] border-[#1B36FF] text-[#1B36FF] hover:bg-[#1B36FF] hover:text-white flex items-center gap-2"
          icon={<AltArrowDown size={16} />}
        >
          فیلترها
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Status Tag */}
            <div className="flex justify-end mb-4">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  project.status === 'accepted'
                    ? 'bg-green-100 text-green-600'
                    : project.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : project.status === 'rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                }`}
              >
                {project.status === 'accepted'
                  ? 'پذیرفته شده'
                  : project.status === 'pending'
                    ? 'در انتظار'
                    : project.status === 'rejected'
                      ? 'رد شده'
                      : 'در حال بررسی'}
              </span>
            </div>

            {/* Category Icon */}
            <div className="flex justify-end mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>

            {/* Image Placeholder */}
            <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
              {project.description || 'توضیحات پروژه در دسترس نیست'}
            </p>

            {/* Investment Info */}
            {project.investment_amount && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">مبلغ درخواستی:</div>
                <div className="font-bold text-[#1B36FF]">
                  {project.investment_amount.toLocaleString()} تومان
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 py-4">
              <Button
                color="primary"
                variant="outlined"
                size="large"
                className="flex-1"
                onClick={() =>
                  router.push(`/ecosystem/project-details?id=${project.id}`)
                }
              >
                مشاهده جزئیات
              </Button>
              <Button
                color="primary"
                variant="solid"
                size="large"
                className="flex-1"
                onClick={() => handleAddToCart(project)}
                disabled={isInCart(project.id)}
              >
                {isInCart(project.id) ? 'در کارتابل' : 'افزودن به کارتابل'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">پروژه‌ای یافت نشد</div>
        </div>
      )}

      {/* Load More Button */}
      <div className="text-center pt-6">
        <Button color="primary" variant="solid" size="large" className="px-8">
          مشاهده بیشتر
        </Button>
      </div>
    </div>
  );
}
