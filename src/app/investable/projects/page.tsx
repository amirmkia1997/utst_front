'use client';

import { Pen2 } from '@solar-icons/react';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useApi';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, loading, error } = useProjects();

  const handlePreviewProject = (projectId: string) => {
    router.push(`/ecosystem/project-details?id=${projectId}`);
  };

  const handleFindInvestors = (projectId: string) => {
    router.push('/investable/projects/investors');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">در حال بارگذاری پروژه‌ها...</div>
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
    <div>
      <div className="bg-gradient-to-r to-[#1B36FF] from-[#9FABFF] text-white rounded-lg p-6 mt-12">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">
              ایده‌ات شایسته دیده شدن است{' '}
            </h3>
            <p className="text-blue-100">
              ایده‌ا‌ت رو ثبت کن و سرمایه‌گذاران مناسب را پیدا کن{' '}
            </p>
          </div>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => router.push('/investable/projects/upload')}
          >
            آپلود پروژه جدید{' '}
          </Button>
        </div>
      </div>
      {projects.map(project => (
        <div
          key={project.id}
          className="bg-white shadow-sm w-full rounded-lg p-4 grid grid-cols-3 gap-4 my-4"
        >
          <div className="w-full col-span-1 rounded-lg bg-[#F3F3F3] h-52"></div>
          <div className="col-span-2 w-full h-full">
            <div className="w-full flex justify-between">
              <span
                className={`text-sm px-2 py-1 rounded-full ${
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
                    ? 'در انتظار تایید'
                    : project.status === 'rejected'
                      ? 'رد شده'
                      : 'در حال بررسی'}
              </span>
              <Pen2 size={24} color="#1B36FF" />
            </div>
            <p className="text-lg font-bold py-4">{project.title}</p>
            <p className="text-sm">
              {project.description || 'توضیحات پروژه در دسترس نیست'}
            </p>

            {/* Investment Info */}
            {project.investment_amount && (
              <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600">مبلغ درخواستی:</div>
                <div className="font-bold text-[#1B36FF]">
                  {project.investment_amount.toLocaleString()} تومان
                </div>
              </div>
            )}

            <div className="w-full flex justify-end items-center pt-4 gap-2">
              <Button
                color="primary"
                variant="solid"
                size="large"
                onClick={() => handleFindInvestors(project.id)}
              >
                پیدا کردن سرمایه‌گذار
              </Button>
              <Button
                color="primary"
                variant="outlined"
                size="large"
                onClick={() => handlePreviewProject(project.id)}
              >
                پیش‌نمایش طرح
              </Button>
            </div>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            هنوز پروژه‌ای ثبت نکرده‌اید
          </div>
          <Button
            type="primary"
            size="large"
            className="mt-4"
            onClick={() => router.push('/investable/projects/upload')}
          >
            اولین پروژه را ثبت کنید
          </Button>
        </div>
      )}
    </div>
  );
}
