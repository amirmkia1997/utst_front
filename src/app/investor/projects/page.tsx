'use client';

import { Button, Segmented, Modal, message } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useApi';

export default function InvestorProjects() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('همه پروژه ها');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { projects, loading, error, updateProject } = useProjects();

  // فیلتر پروژه‌ها
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'همه پروژه ها') return true;

    const statusMap = {
      'پذیرفته شده': 'accepted',
      'در حال بررسی': 'under_review',
      'در حال سرمایه گذاری': 'under_investment',
      'سرمایه گذاری شده': 'invested',
      'رد شده': 'rejected',
    };

    return project.status === statusMap[activeFilter as keyof typeof statusMap];
  });

  const filterOptions = [
    'همه پروژه ها',
    'پذیرفته شده',
    'در حال بررسی',
    'در حال سرمایه گذاری',
    'سرمایه گذاری شده',
    'رد شده',
  ];

  const statusOptions = [
    'پذیرفته شده',
    'در حال بررسی',
    'در حال سرمایه گذاری',
    'سرمایه گذاری شده',
    'رد شده',
  ];

  const handleStatusChange = (project: any) => {
    setSelectedProject(project);
    setIsStatusModalOpen(true);
  };

  const handleStatusSelect = async (status: string) => {
    if (!selectedProject) return;

    try {
      const statusMap: Record<
        string,
        | 'pending'
        | 'accepted'
        | 'rejected'
        | 'under_review'
        | 'under_investment'
        | 'invested'
      > = {
        'پذیرفته شده': 'accepted',
        'در حال بررسی': 'under_review',
        'در حال سرمایه گذاری': 'under_investment',
        'سرمایه گذاری شده': 'invested',
        'رد شده': 'rejected',
      };

      await updateProject(selectedProject.id, {
        status: statusMap[status],
      });

      message.success('وضعیت پروژه به‌روزرسانی شد');
      setIsStatusModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      message.error('خطا در به‌روزرسانی وضعیت پروژه');
    }
  };

  const handleShowProject = (project: any) => {
    router.push(`/ecosystem/project-details?id=${project.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-[#36B37E33] text-[#1B9E67]';
      case 'under_review':
        return 'bg-blue-100 text-blue-600';
      case 'under_investment':
        return 'bg-[#36B37E33] text-[#1B9E67]';
      case 'invested':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-[#CC393133] text-[#CC3931]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'پذیرفته شده';
      case 'under_review':
        return 'در حال بررسی';
      case 'under_investment':
        return 'در حال سرمایه گذاری';
      case 'invested':
        return 'سرمایه گذاری شده';
      case 'rejected':
        return 'رد شده';
      default:
        return status;
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case 'under_review':
        return 40;
      case 'under_investment':
        return 60;
      case 'invested':
        return 100;
      default:
        return null;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'under_review':
        return 'bg-blue-500';
      case 'under_investment':
        return 'bg-[#1B9E67]';
      case 'invested':
        return 'bg-green-500';
      default:
        return null;
    }
  };

  const getActions = (status: string) => {
    switch (status) {
      case 'pending':
        return ['تعیین وضعیت', 'نمایش طرح'];
      case 'accepted':
        return ['تعیین وضعیت', 'نمایش طرح'];
      case 'under_review':
        return ['تعیین وضعیت', 'نمایش طرح'];
      case 'under_investment':
        return ['نمایش طرح'];
      case 'invested':
        return ['نمایش طرح'];
      case 'rejected':
        return ['پذیرش مجدد', 'نمایش طرح'];
      default:
        return ['نمایش طرح'];
    }
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
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <Segmented
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
          className="w-full"
          size="large"
        />
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map(project => {
          const progress = getProgress(project.status);
          const progressColor = getProgressColor(project.status);
          const statusColor = getStatusColor(project.status);
          const statusText = getStatusText(project.status);
          const actions = getActions(project.status);

          return (
            <div key={project.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {progress !== null ? (
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${progressColor} transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span
                        className={`px-3 py-1 text-sm rounded ${statusColor}`}
                      >
                        {statusText}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 text-sm rounded ${statusColor}`}
                    >
                      {statusText}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    color="primary"
                    variant="outlined"
                    size="large"
                    className="flex-1"
                    onClick={
                      action === 'تعیین وضعیت'
                        ? () => handleStatusChange(project)
                        : action === 'نمایش طرح'
                          ? () => handleShowProject(project)
                          : undefined
                    }
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">پروژه‌ای یافت نشد</div>
        </div>
      )}

      {/* Status Change Modal */}
      <Modal
        open={isStatusModalOpen}
        centered
        closable={true}
        footer={null}
        onCancel={() => setIsStatusModalOpen(false)}
        width={400}
      >
        <div className="text-center py-6">
          {/* Question Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-blue-600 font-bold">؟</span>
            </div>
          </div>

          {/* Project Title */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">پروژه</p>
            <h2 className="text-lg font-bold text-blue-600">
              {selectedProject?.title}
            </h2>
            <p className="text-gray-600 mt-2">در کدام مرحله قرار دارد؟</p>
          </div>

          {/* Status Options */}
          <div className="space-y-3">
            {statusOptions.map((status, index) => (
              <div className=" py-1">
                <Button
                  key={index}
                  color="primary"
                  variant="outlined"
                  size="large"
                  className="w-full"
                  onClick={() => handleStatusSelect(status)}
                >
                  {status}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
