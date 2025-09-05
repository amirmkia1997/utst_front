'use client';

import { Button, Alert, Modal } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import {
  Play,
  InfoCircle,
  UserCircle,
  FolderWithFiles,
  WalletMoney,
  Bell,
  UserCircle as UserIcon,
  Mailbox,
} from '@solar-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { projectApi, Project } from '@/lib/api';

function ProjectDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setError('شناسه پروژه یافت نشد');
        setLoading(false);
        return;
      }

      try {
        const data = await projectApi.getById(projectId);
        setProject(data);
      } catch (err) {
        setError('خطا در بارگذاری اطلاعات پروژه');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'در انتظار بررسی';
      case 'accepted':
        return 'تایید شده';
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'under_review':
        return 'bg-blue-100 text-blue-700';
      case 'under_investment':
        return 'bg-purple-100 text-purple-700';
      case 'invested':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

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

  if (!project) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">پروژه یافت نشد</div>
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
              جزئیات پروژه
            </h1>
            <p className="text-gray-600">
              اطلاعات کامل پروژه و فرصت‌های سرمایه‌گذاری
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

      {/* Project Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-6">
          {/* Project Image/Video Placeholder */}
          <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="text-gray-400 mx-auto mb-2" size={32} />
              <p className="text-gray-500 text-sm">ویدیو معرفی پروژه</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {project.title}
              </h2>
              <span
                className={`px-3 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}
              >
                {getStatusText(project.status)}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{project.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <WalletMoney className="text-blue-500 mx-auto mb-1" size={20} />
                <p className="text-sm text-gray-600">مبلغ سرمایه‌گذاری</p>
                <p className="font-semibold text-gray-800">
                  {project.investment_amount
                    ? project.investment_amount.toLocaleString()
                    : 'نامشخص'}{' '}
                  تومان
                </p>
              </div>

              <div className="text-center p-3 bg-green-50 rounded-lg">
                <FolderWithFiles
                  className="text-green-500 mx-auto mb-1"
                  size={20}
                />
                <p className="text-sm text-gray-600">نوع سرمایه‌گذاری</p>
                <p className="font-semibold text-gray-800">
                  {project.investment_type || 'نامشخص'}
                </p>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Bell className="text-purple-500 mx-auto mb-1" size={20} />
                <p className="text-sm text-gray-600">دوره بازپرداخت</p>
                <p className="font-semibold text-gray-800">
                  {project.repayment_period || 'نامشخص'} ماه
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <WalletMoney className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">جزئیات مالی</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">مبلغ سرمایه‌گذاری:</span>
              <span className="font-medium">
                {project.investment_amount
                  ? project.investment_amount.toLocaleString()
                  : 'نامشخص'}{' '}
                تومان
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">نرخ بهره:</span>
              <span className="font-medium">
                {project.interest_rate ? `${project.interest_rate}%` : 'نامشخص'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">دوره بازپرداخت:</span>
              <span className="font-medium">
                {project.repayment_period
                  ? `${project.repayment_period} ماه`
                  : 'نامشخص'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">نوع سرمایه‌گذاری:</span>
              <span className="font-medium">
                {project.investment_type || 'نامشخص'}
              </span>
            </div>
          </div>
        </div>

        {/* Project Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <InfoCircle className="text-green-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              اطلاعات پروژه
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">وضعیت:</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}
              >
                {getStatusText(project.status)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تاریخ ایجاد:</span>
              <span className="font-medium">
                {new Date(project.created_at).toLocaleDateString('fa-IR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">آخرین بروزرسانی:</span>
              <span className="font-medium">
                {new Date(project.updated_at).toLocaleDateString('fa-IR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">شناسه پروژه:</span>
              <span className="font-medium text-sm">{project.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-4">
          <Button
            type="primary"
            size="large"
            className="flex-1"
            onClick={() => setIsAccessModalOpen(true)}
          >
            درخواست دسترسی به بوم پروژه
          </Button>
        </div>
      </div>

      {/* Access Request Modal */}
      <Modal
        open={isAccessModalOpen}
        onCancel={() => setIsAccessModalOpen(false)}
        footer={null}
        centered
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mailbox className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            درخواست دسترسی ارسال شد
          </h3>
          <p className="text-gray-600 mb-6">
            درخواست شما برای دسترسی به بوم پروژه ارسال شد. به زودی با شما تماس
            گرفته خواهد شد.
          </p>
          <div className="flex gap-3">
            <Button
              type="primary"
              className="flex-1"
              onClick={() => setIsAccessModalOpen(false)}
            >
              تایید
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function ProjectDetails() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">در حال بارگذاری...</div>
        </div>
      }
    >
      <ProjectDetailsContent />
    </Suspense>
  );
}
