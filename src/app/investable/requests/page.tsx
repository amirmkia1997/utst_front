'use client';

import { Letter } from '@solar-icons/react';
import { Button, Segmented, Modal, Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { useRequests } from '@/hooks/useApi';

export default function Requests() {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('همه');
  const [rejectForm] = Form.useForm();
  const [acceptForm] = Form.useForm();

  const { requests, loading, error, updateRequest } = useRequests();

  const getTypeText = (type: string) => {
    switch (type) {
      case 'investment':
        return 'سرمایه‌گذاری';
      case 'pitch_session':
        return 'جلسه پیچ';
      case 'document_access':
        return 'دسترسی به مستندات';
      default:
        return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'در انتظار بررسی';
      case 'accepted':
        return 'پذیرفته شده';
      case 'rejected':
        return 'رد شده';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#EBEBEB] text-[#666666]';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investment':
        return 'bg-[#36B37E33] text-[#1B9E67]';
      case 'pitch_session':
        return 'bg-[#36B37E33] text-[#1B9E67]';
      case 'document_access':
        return 'bg-[#36B37E33] text-[#1B9E67]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRequests = requests.filter(request => {
    if (activeFilter === 'همه') return true;
    return getTypeText(request.type) === activeFilter;
  });

  const handleRejectClick = (request: any) => {
    setSelectedRequest(request);
    setIsRejectModalOpen(true);
  };

  const handleAcceptClick = (request: any) => {
    setSelectedRequest(request);
    setIsAcceptModalOpen(true);
  };

  const handleReject = async () => {
    try {
      const values = await rejectForm.validateFields();
      await updateRequest(selectedRequest.id, {
        status: 'rejected',
        message: values.rejectReason,
      });
      message.success('درخواست رد شد');
      setIsRejectModalOpen(false);
      rejectForm.resetFields();
    } catch (error) {
      message.error('خطا در رد درخواست');
    }
  };

  const handleAccept = async () => {
    try {
      const values = await acceptForm.validateFields();
      await updateRequest(selectedRequest.id, {
        status: 'accepted',
        message: values.acceptReason,
      });
      message.success('درخواست پذیرفته شد');
      setIsAcceptModalOpen(false);
      acceptForm.resetFields();
    } catch (error) {
      message.error('خطا در پذیرش درخواست');
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">در حال بارگذاری درخواست‌ها...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600 text-lg">خطا در بارگذاری درخواست‌ها</div>
      </div>
    );
  }

  return (
    <>
      <div className=" bg-white shadow-sm p-2 rounded-lg my-2">
        <Segmented<string>
          size="large"
          options={['همه', 'دسترسی به مستندات', 'سرمایه‌گذاری', 'جلسه پیچ']}
          value={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {filteredRequests.map(request => (
        <div
          key={request.id}
          className="bg-white shadow-sm p-4 rounded-lg my-2"
        >
          <p
            className={`text-xs px-2 py-1 rounded-md w-fit ${getTypeColor(request.type)}`}
          >
            {getTypeText(request.type)}
          </p>
          <div className=" grid grid-cols-7 mt-4 items-center">
            <div className=" col-span-2">
              <p className=" font-bold">
                {request.from_user?.name || 'نام کاربر'}
              </p>
            </div>
            <div className=" col-span-2">
              <p>{request.project?.title || 'نام پروژه'}</p>
            </div>
            <div className=" col-span-1">
              <p
                className={`text-xs px-2 py-1 rounded-md w-fit ${getStatusColor(request.status)}`}
              >
                {getStatusText(request.status)}
              </p>
            </div>
            <div className=" col-span-1 flex items-center justify-between gap-2">
              <Button
                color="primary"
                variant="text"
                className=" w-full"
                onClick={() => handleRejectClick(request)}
              >
                رد کردن
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => handleAcceptClick(request)}
              >
                بررسی درخواست
              </Button>
            </div>
          </div>
        </div>
      ))}

      {filteredRequests.length === 0 && (
        <div className="bg-white shadow-sm p-8 rounded-lg my-2 text-center">
          <p className="text-gray-500 text-lg">هیچ درخواستی یافت نشد</p>
        </div>
      )}

      <Modal open={isRejectModalOpen} centered closable={false} footer={null}>
        <div className=" flex w-full justify-center">
          <Letter size={60} color="#CC3931" />
        </div>
        <p className=" text-center py- text-lg font-bold">رد کردن درخواست </p>
        <div className=" my-2">
          <p>نوع درخواست: «{getTypeText(selectedRequest?.type)}»</p>
          <p>
            ارسال‌کننده: «{selectedRequest?.from_user?.name || 'نام کاربر'}»
          </p>
          <p>پروژه: «{selectedRequest?.project?.title || 'نام پروژه'}» </p>
        </div>

        <Form form={rejectForm} className="mt-4">
          <Form.Item
            name="rejectReason"
            label="علت رد کردن درخواست رو بنویسید*"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: 'لطفا علت رد درخواست را وارد کنید!' },
            ]}
          >
            <Input.TextArea rows={4} placeholder="توضیح دهید" size="large" />
          </Form.Item>
        </Form>

        <div className=" flex w-full justify-between gap-2">
          <Button
            color="danger"
            variant="solid"
            size="large"
            className=" w-full"
            onClick={handleReject}
          >
            تایید و ارسال پیام{' '}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            className=" w-full"
            onClick={() => {
              setIsRejectModalOpen(false);
              rejectForm.resetFields();
            }}
          >
            انصراف{' '}
          </Button>
        </div>
      </Modal>

      <Modal open={isAcceptModalOpen} centered closable={false} footer={null}>
        <div className=" flex w-full justify-center">
          <Letter size={60} color="#1B36FF" />
        </div>
        <p className=" text-center py- text-lg font-bold">قبول درخواست </p>
        <div className=" my-2">
          <p>نوع درخواست: «{getTypeText(selectedRequest?.type)}»</p>
          <p>
            ارسال‌کننده: «{selectedRequest?.from_user?.name || 'نام کاربر'}»
          </p>
          <p>پروژه: «{selectedRequest?.project?.title || 'نام پروژه'}» </p>
        </div>

        <Form form={acceptForm} className="mt-4">
          <Form.Item
            name="acceptReason"
            label="پیام تایید درخواست رو بنویسید*"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: 'لطفا پیام تایید را وارد کنید!' },
            ]}
          >
            <Input.TextArea rows={4} placeholder="توضیح دهید" size="large" />
          </Form.Item>
        </Form>

        <div className=" flex w-full justify-between gap-2">
          <Button
            color="primary"
            variant="solid"
            size="large"
            className=" w-full"
            onClick={handleAccept}
          >
            تایید و ارسال پیام{' '}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            className=" w-full"
            onClick={() => {
              setIsAcceptModalOpen(false);
              acceptForm.resetFields();
            }}
          >
            انصراف{' '}
          </Button>
        </div>
      </Modal>
    </>
  );
}
