'use client';

import { Button, Select, Pagination } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInvestors } from '@/hooks/useApi';

const { Option } = Select;

export default function Investors() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('همه');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { investors, loading, error } = useInvestors();

  const filters = [
    'همه',
    'سرمایه گذارها',
    'شتاب دهنده ها',
    'پارک علم و فناوری',
    'مراکز رشد',
  ];

  // فیلتر سرمایه‌گذاران
  const filteredInvestors = investors.filter(investor => {
    if (activeFilter === 'همه') return true;
    return investor.company_name?.includes(activeFilter) || false;
  });

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedInvestors = filteredInvestors.slice(startIndex, endIndex);

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
        <div className="text-red-600">
          خطا در بارگذاری سرمایه‌گذاران: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-2 flex-wrap">
          {filters.map(filter => (
            <Button
              key={filter}
              type={activeFilter === filter ? 'primary' : 'default'}
              className={
                activeFilter === filter
                  ? 'bg-[#1B36FF] border-[#1B36FF] text-white'
                  : 'border-[#1B36FF] text-[#1B36FF] hover:bg-[#1B36FF] hover:text-white'
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-700">
            <div>لوگو</div>
            <div className="col-span-2">نام مجموعه</div>
            <div>شهر</div>
            <div>حیطه فعالیت</div>
            <div>نوع فعالیت</div>
            <div>عملیات</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {paginatedInvestors.map(investor => (
            <div key={investor.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-7 gap-4 items-center">
                {/* Logo */}
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>

                {/* Name */}
                <div className="font-medium text-gray-900 col-span-2">
                  {investor.company_name || 'نام مجموعه'}
                </div>

                {/* City */}
                <div className="text-gray-600">
                  {investor.contact_info?.address || 'تهران'}
                </div>

                {/* Activity */}
                <div className="text-gray-600">
                  {investor.investment_domains?.join(', ') || 'همه حوزه‌ها'}
                </div>

                {/* Type */}
                <div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    سرمایه‌گذار
                  </span>
                </div>

                {/* Actions */}
                <div>
                  <Button
                    type="link"
                    className="text-[#1B36FF] p-0 h-auto"
                    onClick={() =>
                      router.push(
                        `/investable/projects/investors/profile?id=${investor.id}`
                      )
                    }
                  >
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            {`${(currentPage - 1) * pageSize + 1} تا ${Math.min(currentPage * pageSize, filteredInvestors.length)} از ${filteredInvestors.length} مجموعه`}
          </div>

          <div className="flex items-center gap-4">
            <Pagination
              current={currentPage}
              total={filteredInvestors.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper={false}
              className="flex items-center"
            />

            <div className="flex items-center gap-2">
              <span className="text-gray-600">تعداد آیتم در صفحه:</span>
              <Select value={pageSize} onChange={setPageSize} className="w-20">
                <Option value={5}>۵</Option>
                <Option value={10}>۱۰</Option>
                <Option value={20}>۲۰</Option>
                <Option value={50}>۵۰</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
