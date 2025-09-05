'use client';

import { Button, Segmented, Modal, Form, Input, message } from 'antd';
import { Letter } from '@solar-icons/react';
import { useState, useEffect } from 'react';
import { useRequests, useUsers } from '@/hooks/useApi';

const { TextArea } = Input;

export default function InvestorRequests() {
  const [activeFilter, setActiveFilter] = useState('همه');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [rejectForm] = Form.useForm();
  const [acceptForm] = Form.useForm();

  const { requests, loading, error, updateRequest, deleteRequest } =
    useRequests();
  const { users } = useUsers();

  // Get current user (assuming first user for now)
  const currentUser = users[0];

  // Filter requests for current investor
  const investorRequests = requests.filter(
    request => request.to_user_id === currentUser?.id
  );

  // Filter requests based on active filter
  const filteredRequests = investorRequests.filter(request => {
    if (activeFilter === 'همه') return true;
    if (activeFilter === 'دسترسی به مستندات')
      return request.type === 'document_access';
    if (activeFilter === 'سرمایه گذاری') return request.type === 'investment';
    if (activeFilter === 'جلسه پیچ') return request.type === 'pitch_session';
    return true;
  });

  const getTypeText = (type: string) => {
    switch (type) {
      case 'document_access':
        return 'درخواست دسترسی به مستندات';
      case 'investment':
        return 'درخواست سرمایه گذاری';
      case 'pitch_session':
        return 'درخواست جلسه پیچ';
      default:
        return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'در انتظار بررسی';
      case 'accepted':
        return 'تایید شده';
      case 'rejected':
        return 'رد شده';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document_access':
        return 'bg-yellow-100 text-yellow-700';
      case 'investment':
        return 'bg-blue-100 text-blue-700';
      case 'pitch_session':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getActions = (request: any) => {
    const actions = [];
    if (request.status === 'pending') {
      if (request.type === 'investment') {
        actions.push('delete');
      } else {
        actions.push('reject', 'accept');
      }
    } else if (
      request.status === 'accepted' &&
      request.type === 'document_access'
    ) {
      actions.push('remove');
    }
    return actions;
  };

  const handleRejectClick = (request: any) => {
    setSelectedRequest(request);
    setIsRejectModalOpen(true);
  };

  const handleAcceptClick = (request: any) => {
    setSelectedRequest(request);
    setIsAcceptModalOpen(true);
  };

  const handleDeleteClick = (request: any) => {
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
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
      message.success('درخواست تایید شد');
      setIsAcceptModalOpen(false);
      acceptForm.resetFields();
    } catch (error) {
      message.error('خطا در تایید درخواست');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRequest(selectedRequest.id);
      message.success('درخواست حذف شد');
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error('خطا در حذف درخواست');
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
        <div className="text-red-600">خطا در بارگذاری داده‌ها</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-2">
          <Button
            type={activeFilter === 'همه' ? 'primary' : 'default'}
            className={
              activeFilter === 'همه'
                ? 'bg-[#1B36FF] border-[#1B36FF] text-white'
                : 'border-[#1B36FF] text-[#1B36FF] hover:bg-[#1B36FF] hover:text-white'
            }
            onClick={() => setActiveFilter('همه')}
          >
            همه
          </Button>
          <Button
            type={activeFilter === 'دسترسی به مستندات' ? 'primary' : 'default'}
            className={
              activeFilter === 'دسترسی به مستندات'
                ? 'bg-[#1B36FF] border-[#1B36FF] text-white'
                : 'border-[#1B36FF] text-[#1B36FF] hover:bg-[#1B36FF] hover:text-white'
            }
            onClick={() => setActiveFilter('دسترسی به مستندات')}
          >
            دسترسی به مستندات
          </Button>
          <Button
            type={activeFilter === 'سرمایه گذاری' ? 'primary' : 'default'}
            className={
              activeFilter === 'سرمایه گذاری'
                ? 'bg-[#1B36FF] border-[#1B36FF] text-white'
                : 'border-[#1B36FF] text-[#1B36FF] hover:bg-[#1B36FF] hover:text-white'
            }
            onClick={() => setActiveFilter('سرمایه گذاری')}
          >
            سرمایه گذاری
          </Button>
          <Button
            type={activeFilter === 'جلسه پیچ' ? 'primary' : 'default'}
            className={
              activeFilter === 'جلسه پیچ'
                ? 'bg-[#1B36FF] border-[#1B36FF] text-white'
                : 'border-[#1B36FF] text-[#1B36FF] hover:bg-[#1B36FF] hover:text-white'
            }
            onClick={() => setActiveFilter('جلسه پیچ')}
          >
            جلسه پیچ
          </Button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-2">
        {filteredRequests.map(request => {
          const actions = getActions(request);
          return (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-sm p-4 border-b border-gray-100"
            >
              <span
                className={`px-3 py-1 text-sm rounded-full ${getTypeColor(request.type)}`}
              >
                {getTypeText(request.type)}
              </span>
              <div className="grid grid-cols-7 gap-4 items-center py-2">
                {/* Requesting Entity */}
                <div className="col-span-2 flex items-center gap-3">
                  <span className="font-medium text-gray-800">
                    {request.from_user?.name || 'نامشخص'}
                  </span>
                </div>

                {/* Project Name */}
                <div className="col-span-2">
                  <span className="text-gray-600">
                    {request.project?.title || 'نامشخص'}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}
                  >
                    {getStatusText(request.status)}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  {actions.includes('reject') && (
                    <Button
                      type="link"
                      className="text-red-600 p-0 h-auto"
                      onClick={() => handleRejectClick(request)}
                    >
                      رد کردن
                    </Button>
                  )}

                  {actions.includes('accept') && (
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() => handleAcceptClick(request)}
                    >
                      قبول درخواست
                    </Button>
                  )}

                  {actions.includes('delete') && (
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() => handleDeleteClick(request)}
                    >
                      حذف درخواست
                    </Button>
                  )}

                  {actions.includes('remove') && (
                    <Button color="primary" variant="outlined" size="small">
                      حذف دسترسی
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reject Modal */}
      <Modal open={isRejectModalOpen} centered closable={false} footer={null}>
        <div className=" flex w-full justify-center">
          <Letter size={60} color="#CC3931" />
        </div>
        <p className=" text-center py-4 text-lg font-bold">رد کردن درخواست</p>
        <div className=" my-2">
          <p>
            نوع درخواست: «{selectedRequest && getTypeText(selectedRequest.type)}
            »
          </p>
          <p>ارسال‌کننده: «{selectedRequest?.from_user?.name || 'نامشخص'}»</p>
          <p>پروژه: «{selectedRequest?.project?.title || 'نامشخص'}»</p>
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
            <TextArea rows={4} placeholder="توضیح دهید" size="large" />
          </Form.Item>
        </Form>

        <div className=" flex w-full justify-between gap-2">
          <Button
            danger
            size="large"
            className=" w-full"
            onClick={handleReject}
          >
            تایید و ارسال پیام
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            className=" w-full"
            onClick={() => setIsRejectModalOpen(false)}
          >
            انصراف
          </Button>
        </div>
      </Modal>

      {/* Accept Modal */}
      <Modal open={isAcceptModalOpen} centered closable={false} footer={null}>
        <div className=" flex w-full justify-center">
          <Letter size={60} color="#1B36FF" />
        </div>
        <p className=" text-center py-4 text-lg font-bold">قبول درخواست</p>
        <div className=" my-2">
          <p>
            نوع درخواست: «{selectedRequest && getTypeText(selectedRequest.type)}
            »
          </p>
          <p>ارسال‌کننده: «{selectedRequest?.from_user?.name || 'نامشخص'}»</p>
          <p>پروژه: «{selectedRequest?.project?.title || 'نامشخص'}»</p>
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
            <TextArea rows={4} placeholder="توضیح دهید" size="large" />
          </Form.Item>
        </Form>

        <div className=" flex w-full justify-between gap-2">
          <Button
            color="primary"
            size="large"
            className=" w-full"
            onClick={handleAccept}
          >
            تایید و ارسال پیام
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            className=" w-full"
            onClick={() => setIsAcceptModalOpen(false)}
          >
            انصراف
          </Button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal open={isDeleteModalOpen} centered closable={false} footer={null}>
        <div className=" flex w-full justify-center">
          <Letter size={60} color="#CC3931" />
        </div>
        <p className=" text-center py-4 text-lg font-bold">حذف درخواست</p>
        <div className=" my-2">
          <p>
            نوع درخواست: «{selectedRequest && getTypeText(selectedRequest.type)}
            »
          </p>
          <p>ارسال‌کننده: «{selectedRequest?.from_user?.name || 'نامشخص'}»</p>
          <p>پروژه: «{selectedRequest?.project?.title || 'نامشخص'}»</p>
        </div>

        <p className="text-center text-gray-600 mb-6">
          آیا از حذف این درخواست مطمئن هستید؟
        </p>

        <div className=" flex w-full justify-between gap-2">
          <Button
            danger
            size="large"
            className=" w-full"
            onClick={handleDelete}
          >
            حذف درخواست
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            className=" w-full"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            انصراف
          </Button>
        </div>
      </Modal>
    </div>
  );
}
