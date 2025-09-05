'use client';

import { Button, Form, Input, Select, Checkbox, Upload, message } from 'antd';
import { UploadMinimalistic, TrashBinTrash } from '@solar-icons/react';
import { useState, useEffect } from 'react';
import { useInvestors, useUsers } from '@/hooks/useApi';

const { Option } = Select;
const { TextArea } = Input;

export default function InvestorProfile() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { investors, updateInvestor } = useInvestors();
  const { users } = useUsers();

  // Get current user (assuming first user for now)
  const currentUser = users[0];
  const currentInvestor = investors.find(
    inv => inv.user_id === currentUser?.id
  );

  useEffect(() => {
    if (currentInvestor) {
      form.setFieldsValue({
        investorName: currentInvestor.company_name,
        fundName: currentInvestor.company_name,
        address: currentInvestor.contact_info?.address,
        mobile: currentInvestor.contact_info?.phone,
        website: currentInvestor.contact_info?.website,
        phone: currentInvestor.contact_info?.phone,
        minInvestment: currentInvestor.min_investment,
        maxInvestment: currentInvestor.max_investment,
        investmentType: currentInvestor.investment_type,
        investmentAreas: currentInvestor.investment_domains,
        fundingMethods: currentInvestor.funding_methods,
        aboutInvestment: currentInvestor.investment_criteria,
        slogan: currentInvestor.description,
      });
    }
  }, [currentInvestor, form]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      if (!currentInvestor) {
        message.error('سرمایه‌گذار یافت نشد');
        return;
      }

      const updatedData = {
        company_name: values.investorName,
        description: values.slogan,
        investment_criteria: values.aboutInvestment,
        funding_methods: values.fundingMethods,
        min_investment: parseInt(values.minInvestment),
        max_investment: parseInt(values.maxInvestment),
        investment_domains: values.investmentAreas,
        contact_info: {
          address: values.address,
          phone: values.mobile,
          website: values.website,
        },
      };

      await updateInvestor(currentInvestor.id, updatedData);
      message.success('اطلاعات با موفقیت ذخیره شد');
    } catch (error) {
      console.error('Error updating investor:', error);
      message.error('خطا در ذخیره اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (info: any) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Only keep the last file
    setFileList(newFileList);

    if (info.file.status === 'done') {
      message.success(`${info.file.name} با موفقیت آپلود شد`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} آپلود نشد`);
    }
  };

  const handleRemove = () => {
    setFileList([]);
  };

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    onChange: handleUpload,
    onRemove: handleRemove,
    beforeUpload: (file: File) => {
      const isValidType =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isValidType) {
        message.error('فقط فایل‌های تصویری مجاز هستند!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('حجم فایل باید کمتر از 2MB باشد!');
        return false;
      }
      return true;
    },
    fileList,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ویرایش اطلاعات سرمایه‌گذار
      </h1>

      <Form
        form={form}
        name="investorProfile"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6"
      >
        {/* Logo Upload Section */}
        <div className="flex gap-8 items-start">
          <div className="w-64">
            <div className="text-center">
              <div className="w-full flex justify-center mb-4">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  {fileList.length > 0 ? (
                    <img
                      src={
                        fileList[0].url ||
                        URL.createObjectURL(fileList[0].originFileObj)
                      }
                      alt="logo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">لوگو</div>
                  )}
                </div>
              </div>

              <div className="space-y-2 flex gap-2">
                <Upload {...uploadProps}>
                  <Button
                    color="primary"
                    variant="outlined"
                    icon={<UploadMinimalistic />}
                    size="large"
                    className="w-full"
                  >
                    آپلود لوگو جدید
                  </Button>
                </Upload>
                {fileList.length > 0 && (
                  <Button
                    icon={<TrashBinTrash />}
                    size="large"
                    className="w-full"
                    onClick={handleRemove}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6">
              {/* Basic Information */}
              <Form.Item
                name="investorName"
                label="نام سرمایه‌گذار"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام سرمایه‌گذار را وارد کنید!',
                  },
                ]}
              >
                <Input placeholder="مثال: احمد محمدی" size="large" />
              </Form.Item>

              <Form.Item
                name="fundName"
                label="اسم صندوق"
                rules={[
                  { required: true, message: 'لطفا اسم صندوق را وارد کنید!' },
                ]}
              >
                <Input placeholder="مثال: صندوق نوآوری" size="large" />
              </Form.Item>

              <Form.Item
                name="address"
                label="آدرس"
                rules={[{ required: true, message: 'لطفا آدرس را وارد کنید!' }]}
                className="col-span-2"
              >
                <Input placeholder="مثال: تهران، خیابان ولیعصر" size="large" />
              </Form.Item>

              <Form.Item
                name="mobile"
                label="شماره موبایل"
                rules={[
                  {
                    required: true,
                    message: 'لطفا شماره موبایل را وارد کنید!',
                  },
                ]}
              >
                <Input placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹" size="large" />
              </Form.Item>

              <Form.Item
                name="website"
                label="سایت"
                rules={[{ required: true, message: 'لطفا سایت را وارد کنید!' }]}
              >
                <Input placeholder="مثال: www.example.com" size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="شماره تلفن صندوق"
                rules={[
                  {
                    required: true,
                    message: 'لطفا شماره تلفن صندوق را وارد کنید!',
                  },
                ]}
              >
                <Input placeholder="مثال: ۰۲۱-۱۲۳۴۵۶۷۸" size="large" />
              </Form.Item>

              {/* Investment Information */}
              <Form.Item
                name="minInvestment"
                label="حداقل چک‌سایز سرمایه‌گذاری"
                rules={[
                  {
                    required: true,
                    message: 'لطفا حداقل سرمایه‌گذاری را وارد کنید!',
                  },
                ]}
              >
                <Input placeholder="مثال: ۱۰۰,۰۰۰,۰۰۰" size="large" />
              </Form.Item>

              <Form.Item
                name="maxInvestment"
                label="حداکثر چک‌سایز سرمایه‌گذاری"
                rules={[
                  {
                    required: true,
                    message: 'لطفا حداکثر سرمایه‌گذاری را وارد کنید!',
                  },
                ]}
              >
                <Input placeholder="مثال: ۱,۰۰۰,۰۰۰,۰۰۰" size="large" />
              </Form.Item>

              <Form.Item
                name="investmentType"
                label="نوع سرمایه‌گذاری"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نوع سرمایه‌گذاری را انتخاب کنید!',
                  },
                ]}
              >
                <Select placeholder="انتخاب کنید" size="large">
                  <Option value="direct">مستقیم</Option>
                  <Option value="loan">وام</Option>
                  <Option value="guarantee">ضمانت‌نامه</Option>
                  <Option value="mixed">ترکیبی</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="investmentAreas"
                label="حوزه‌های سرمایه‌گذاری"
                rules={[
                  {
                    required: true,
                    message: 'لطفا حداقل یک حوزه را انتخاب کنید!',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="انتخاب کنید"
                  size="large"
                  className="w-full"
                >
                  <Option value="fintech">فینتک</Option>
                  <Option value="ai">هوش مصنوعی</Option>
                  <Option value="blockchain">بلاک‌چین</Option>
                  <Option value="ecommerce">تجارت الکترونیک</Option>
                  <Option value="healthcare">سلامت</Option>
                  <Option value="education">آموزش</Option>
                  <Option value="agriculture">کشاورزی</Option>
                  <Option value="energy">انرژی</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="teamMembers"
                label="اعضای تیم"
                rules={[
                  {
                    required: true,
                    message: 'لطفا حداقل یک عضو تیم را انتخاب کنید!',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="انتخاب کنید"
                  size="large"
                  className="w-full"
                >
                  <Option value="ceo">مدیرعامل</Option>
                  <Option value="cto">مدیر فنی</Option>
                  <Option value="cfo">مدیر مالی</Option>
                  <Option value="cmo">مدیر بازاریابی</Option>
                  <Option value="advisor">مشاور</Option>
                  <Option value="analyst">تحلیلگر</Option>
                </Select>
              </Form.Item>

              {/* Funding Methods */}
              <Form.Item
                name="fundingMethods"
                label="روش‌های تامین مالی"
                rules={[
                  {
                    required: true,
                    message: 'لطفا حداقل یک روش را انتخاب کنید!',
                  },
                ]}
                className="col-span-2"
              >
                <Checkbox.Group className="w-full">
                  <div className="grid grid-cols-3 gap-4">
                    <Checkbox value="guarantee">ضمانت‌نامه</Checkbox>
                    <Checkbox value="direct">مستقیم</Checkbox>
                    <Checkbox value="loan">وام</Checkbox>
                  </div>
                </Checkbox.Group>
              </Form.Item>

              {/* Text Areas */}
              <Form.Item
                name="aboutInvestment"
                label="متنی درباره سرمایه‌گذاری"
                rules={[
                  {
                    required: true,
                    message: 'لطفا متن درباره سرمایه‌گذاری را وارد کنید!',
                  },
                ]}
                className="col-span-2"
              >
                <TextArea
                  rows={4}
                  placeholder="توضیح دهید که چگونه سرمایه‌گذاری می‌کنید و چه معیارهایی دارید..."
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="slogan"
                label="شعار یا متن کوتاه"
                rules={[
                  {
                    required: true,
                    message: 'لطفا شعار یا متن کوتاه را وارد کنید!',
                  },
                ]}
                className="col-span-2"
              >
                <TextArea
                  rows={2}
                  placeholder="شعار یا توضیح کوتاه درباره صندوق..."
                  size="large"
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Form.Item className="mt-8">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            ذخیره اطلاعات
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
