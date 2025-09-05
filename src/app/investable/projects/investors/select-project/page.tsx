'use client';

import { Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { Pen2, Mailbox } from '@solar-icons/react';
import { useState } from 'react';

export default function SelectProject() {
  const router = useRouter();
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSelectProject = (projectId: number) => {
    setSelectedProjects(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const handleConfirmRequest = () => {
    console.log('Selected projects:', selectedProjects);
    // Here you would typically send the request
    setIsSuccessModalOpen(true);
  };

  const projects = [
    {
      id: 1,
      title: 'راهکارهای هوشمند ارتباط فردا',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
      status: 'تایید شده',
    },
    {
      id: 2,
      title: 'پلتفرم هوش مصنوعی پیشرفته',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
      status: 'تایید شده',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              پروژه مورد نظر خود برای جذب سرمایه را انتخاب کنید
            </h1>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm p-6 relative"
              >
                {/* Status Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    {project.status}
                  </span>
                </div>

                {/* Edit Icon */}
                <div className="absolute top-4 left-4">
                  <Pen2 size={20} color="#1B36FF" />
                </div>

                {/* Project Content */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3">
                    <Button color="primary" variant="outlined" size="large">
                      پیش‌نمایش طرح
                    </Button>
                    <Button
                      color="primary"
                      variant={
                        selectedProjects.includes(project.id)
                          ? 'solid'
                          : 'outlined'
                      }
                      size="large"
                      onClick={() => handleSelectProject(project.id)}
                    >
                      {selectedProjects.includes(project.id)
                        ? 'انتخاب شده'
                        : 'انتخاب'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <div className="text-center pt-6">
            <Button
              size="large"
              className={
                selectedProjects.length > 0
                  ? 'bg-[#1B36FF] text-white border-[#1B36FF] hover:bg-blue-700'
                  : 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600'
              }
              disabled={selectedProjects.length === 0}
              onClick={handleConfirmRequest}
            >
              تایید و ارسال درخواست
            </Button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        open={isSuccessModalOpen}
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
            درخواست سرمایه گذاری ارسال شد
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            شما می‌توانید از بخش{' '}
            <span className="text-[#1B36FF] font-medium">
              مباحث سرمایه‌گذاری
            </span>{' '}
            در پروفایل خود از آخرین وضعیت درخواست دسترسی اطلاع پیدا کنید
          </p>

          <Button
            type="primary"
            size="large"
            onClick={() => {
              setIsSuccessModalOpen(false);
              router.push('/investable/projects');
            }}
            className="w-full"
          >
            بازگشت به پروژه‌ها
          </Button>
        </div>
      </Modal>
    </div>
  );
}
