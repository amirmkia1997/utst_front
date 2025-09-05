'use client';
import {
  DangerCircle,
  TrashBinTrash,
  UploadMinimalistic,
} from '@solar-icons/react';
import { Button, Input, Alert, Form, message } from 'antd';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useUsers } from '@/hooks/useApi';

export default function InvestableProfile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { users, loading: usersLoading, error, updateUser } = useUsers();

  // Get current user (assuming first user for now, in real app you'd get from auth)
  const currentUser = users[0];

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
    }
  }, [currentUser, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (currentUser) {
        await updateUser(currentUser.id, {
          name: values.name,
          email: values.email,
          phone: values.phone,
        });
        message.success('اطلاعات با موفقیت ذخیره شد');
      } else {
        message.error('کاربر یافت نشد');
      }
    } catch (error) {
      message.error('خطا در ذخیره اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  if (usersLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">در حال بارگذاری اطلاعات...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <Alert
          message="خطا در بارگذاری اطلاعات"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex gap-8">
        {/* Profile Picture */}
        <div className="w-64">
          <div className="text-center">
            <div className=" w-full flex justify-center mb-4">
              <Image
                src="/images/Default.svg"
                alt="logo"
                width={200}
                height={200}
              />
            </div>

            <div className="space-y-2 flex gap-2">
              <Button
                color="primary"
                variant="outlined"
                icon={<UploadMinimalistic />}
                size="large"
                className="w-full"
              >
                آپلود لوگو جدید
              </Button>
              <Button
                icon={<TrashBinTrash />}
                size="large"
                className="w-full"
              ></Button>
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="flex-1">
          <Form form={form} layout="vertical">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="name"
                  label="نام"
                  rules={[{ required: true, message: 'لطفا نام را وارد کنید' }]}
                >
                  <Input placeholder="مثال: یوسف" size="large" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="ایمیل"
                  rules={[
                    { required: true, message: 'لطفا ایمیل را وارد کنید' },
                    { type: 'email', message: 'ایمیل معتبر نیست' },
                  ]}
                >
                  <Input placeholder="Example@gmail.com" size="large" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="phone"
                  label="شماره موبایل"
                  rules={[
                    {
                      required: true,
                      message: 'لطفا شماره موبایل را وارد کنید',
                    },
                  ]}
                >
                  <div className="flex items-center space-x-2">
                    <Input
                      suffix={
                        <p className=" text-xs bg-[#36B37E33] text-[#1B9E67] px-2 py-1 rounded-md">
                          تایید شده
                        </p>
                      }
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      size="large"
                      className="flex-1"
                    />
                  </div>
                </Form.Item>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نقش کاربری
                  </label>
                  <Input
                    value={
                      currentUser?.role === 'investable'
                        ? 'سرمایه‌پذیر'
                        : 'سرمایه‌گذار'
                    }
                    size="large"
                    disabled
                  />
                </div>
              </div>

              <Button
                color="primary"
                variant="outlined"
                size="large"
                className="w-full mt-6"
                onClick={handleSave}
                loading={loading}
              >
                ذخیره اطلاعات
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* User Info Banner */}
      <div className="bg-gradient-to-r to-[#1B36FF] from-[#9FABFF] text-white rounded-lg p-6 mt-12">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-100">فرصت‌های نو، سرمایه‌گذاری‌های بزرگ</p>
            <div className="mt-2 text-sm text-blue-200">
              <p>
                به جمع سرمایه‌گذاران بپیوندید و در رشد استارتاپ‌ها شریک شوید
              </p>
            </div>
          </div>
          <Button color="primary" variant="outlined" size="large">
            سرمایه‌گذاری کنید
          </Button>
        </div>
      </div>
    </div>
  );
}
