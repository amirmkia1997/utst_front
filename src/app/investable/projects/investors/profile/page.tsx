'use client';

import { Button, Divider } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import {
  FolderWithFiles,
  WalletMoney,
  UserCircle,
  VerifiedCheck,
  PhoneCalling,
  MapPoint,
  Phone,
  Global,
} from '@solar-icons/react';
import { investorApi, Investor } from '@/lib/api';

function InvestorProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const investorId = searchParams.get('id');
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestor = async () => {
      if (!investorId) {
        setError('شناسه سرمایه‌گذار یافت نشد');
        setLoading(false);
        return;
      }

      try {
        const data = await investorApi.getById(investorId);
        setInvestor(data);
      } catch (err) {
        setError('خطا در بارگذاری اطلاعات سرمایه‌گذار');
        console.error('Error fetching investor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestor();
  }, [investorId]);

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
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!investor) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">سرمایه‌گذار یافت نشد</div>
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
              پروفایل سرمایه‌گذار
            </h1>
            <p className="text-gray-600">
              اطلاعات کامل سرمایه‌گذار و معیارهای سرمایه‌گذاری
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

      {/* Investor Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-6">
          {/* Logo */}
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            {investor.logo_url ? (
              <Image
                src={investor.logo_url}
                alt={investor.company_name || 'Logo'}
                width={128}
                height={128}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="text-gray-400 text-sm">لوگو</div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {investor.company_name}
              </h2>
              <VerifiedCheck className="text-green-500" size={20} />
            </div>

            <p className="text-gray-600 mb-4">{investor.description}</p>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              {investor.contact_info?.address && (
                <div className="flex items-center gap-2">
                  <MapPoint className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">
                    {investor.contact_info.address}
                  </span>
                </div>
              )}

              {investor.contact_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">
                    {investor.contact_info.phone}
                  </span>
                </div>
              )}

              {investor.contact_info?.website && (
                <div className="flex items-center gap-2">
                  <Global className="text-gray-400" size={16} />
                  <a
                    href={investor.contact_info.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {investor.contact_info.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Range */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <WalletMoney className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              محدوده سرمایه‌گذاری
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">حداقل:</span>
              <span className="font-medium">
                {investor.min_investment
                  ? investor.min_investment.toLocaleString()
                  : 'نامشخص'}{' '}
                تومان
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">حداکثر:</span>
              <span className="font-medium">
                {investor.max_investment
                  ? investor.max_investment.toLocaleString()
                  : 'نامشخص'}{' '}
                تومان
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">متوسط زمان:</span>
              <span className="font-medium">
                {investor.avg_investment_time || 'نامشخص'}
              </span>
            </div>
          </div>
        </div>

        {/* Funding Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <FolderWithFiles className="text-green-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              روش‌های تامین مالی
            </h3>
          </div>

          <div className="space-y-2">
            {investor.funding_methods && investor.funding_methods.length > 0 ? (
              investor.funding_methods.map((method, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm"
                >
                  {method}
                </div>
              ))
            ) : (
              <span className="text-gray-500 text-sm">نامشخص</span>
            )}
          </div>
        </div>
      </div>

      {/* Investment Domains */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <UserCircle className="text-purple-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">
            حوزه‌های سرمایه‌گذاری
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {investor.investment_domains &&
          investor.investment_domains.length > 0 ? (
            investor.investment_domains.map((domain, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
              >
                {domain}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">نامشخص</span>
          )}
        </div>
      </div>

      {/* Investment Criteria */}
      {investor.investment_criteria && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <PhoneCalling className="text-orange-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              معیارهای سرمایه‌گذاری
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {investor.investment_criteria}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-4">
          <Button
            type="primary"
            size="large"
            className="flex-1"
            onClick={() =>
              router.push(
                `/investable/projects/investors/select-project?investorId=${investor.id}`
              )
            }
          >
            انتخاب پروژه برای ارسال درخواست
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function InvestorProfile() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">در حال بارگذاری...</div>
        </div>
      }
    >
      <InvestorProfileContent />
    </Suspense>
  );
}
