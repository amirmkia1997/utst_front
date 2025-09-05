'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useInvestors } from '@/hooks/useApi';
import { useState, useEffect } from 'react';

export default function Investors() {
  const router = useRouter();
  const { investors, loading, error } = useInvestors();
  const [filteredInvestors, setFilteredInvestors] = useState<any[]>([]);

  useEffect(() => {
    if (investors) {
      setFilteredInvestors(investors);
    }
  }, [investors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">خطا در بارگذاری داده‌ها</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {filteredInvestors.length} سرمایه گذار برای شما یافت شد
            </h1>
            <p className="text-gray-600">
              بر اساس پروژه شما، سرمایه‌گذاران مناسب زیر را پیدا کردیم
            </p>
          </div>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => router.back()}
          >
            بازگشت
          </Button>
        </div>
      </div>

      {/* Investors List */}
      <div className="space-y-4">
        {filteredInvestors.map(investor => (
          <div
            key={investor.id}
            className="bg-white rounded-lg shadow-sm p-6 border-b border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {investor.company_name}
                </h3>
              </div>
              <Button
                type="link"
                className="text-[#1B36FF] p-0 h-auto font-medium"
                onClick={() =>
                  router.push(
                    `/investable/projects/investors/profile?id=${investor.id}`
                  )
                }
              >
                مشاهده پروفایل
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  محدوده سرمایه گذاری
                </h4>
                <p className="text-gray-800">
                  {investor.min_investment && investor.max_investment
                    ? `${investor.min_investment.toLocaleString()} - ${investor.max_investment.toLocaleString()} تومان`
                    : 'نامشخص'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  روش سرمایه گذاری
                </h4>
                <p className="text-gray-800">
                  {investor.funding_methods
                    ? investor.funding_methods.join(' | ')
                    : 'نامشخص'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  حوزه های سرمایه گذاری
                </h4>
                <div className="flex flex-wrap gap-2">
                  {investor.investment_domains &&
                  investor.investment_domains.length > 0 ? (
                    investor.investment_domains.map(
                      (domain: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                        >
                          {domain}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-gray-500 text-sm">نامشخص</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
