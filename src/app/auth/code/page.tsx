'use client';
import useCountDown from '@/hooks/useGetCountDown';
import { Input, Button, Form, Divider, message } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useAuthState } from '@/hooks/useAuth';

function CodePageContent() {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile');
  const { verifyCode, signIn } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (!mobile) {
      message.error('شماره موبایل یافت نشد');
      return;
    }

    setIsLoading(true);
    try {
      // اضافه کردن کد کشور به شماره
      const phoneNumber = `+98${mobile.substring(1)}`;

      const result = await verifyCode(phoneNumber, values.code);

      if (result.success) {
        message.success('ورود موفقیت‌آمیز');
        router.push('/dashboard');
      } else {
        message.error(result.message || 'کد تأیید نامعتبر است');
      }
    } catch (error) {
      message.error('خطا در تأیید کد');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!mobile) {
      message.error('شماره موبایل یافت نشد');
      return;
    }

    setIsLoading(true);
    try {
      const phoneNumber = `+98${mobile.substring(1)}`;
      const result = await signIn(phoneNumber);

      if (result.success) {
        message.success('کد تأیید مجدداً ارسال شد');
        startHandler(); // شروع مجدد تایمر
      } else {
        message.error(result.message || 'خطا در ارسال کد تأیید');
      }
    } catch (error) {
      message.error('خطا در ارسال کد تأیید');
    } finally {
      setIsLoading(false);
    }
  };

  const { currentMinutes, currentSeconds, startHandler, isRunning } =
    useCountDown();

  useEffect(() => {
    startHandler();
  }, []);

  return (
    <div className="flex items-start justify-between h-full rounded-3xl bg-white p-8 text-black overflow-hidden">
      <div className="w-1/3 h-full">
        <Image
          src="/images/967767 1.jpg"
          alt="Login Image"
          width={200}
          height={100}
          className="rounded-lg w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col w-3/5 h-full justify-between pt-8">
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-center">
            <Image
              src="/images/Layer 1.png"
              alt="Login Image"
              width={50}
              height={20}
              className=""
            />
          </div>
          <p className="text-[#1B36FF] text-center w-full my-4 text-2xl font-bold">
            اینوگیت، اکوسیستم مجازی نوآوری
          </p>
          <p className="text-center w-full mb-8">
            برای ثبت طرح جدید و یا دسترسی به اطلاعات خود، لطفا وارد شوید{' '}
          </p>
        </div>

        <div className="w-full flex justify-center items-center">
          <Form form={form} name="login" onFinish={onFinish} className="w-2/3">
            <Form.Item
              name="code"
              label={`کد ارسال شده به شماره موبایل ${mobile} را وارد کنید`}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value)
                      return Promise.reject('لطفا کد تایید را وارد کنید!');
                    if (value.length !== 6)
                      return Promise.reject('کد تایید باید 6 رقم باشد!');
                    if (!/^\d{6}$/.test(value))
                      return Promise.reject('کد تایید معتبر نیست!');
                    return Promise.resolve();
                  },
                },
              ]}
              className="w-full text-right"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ direction: 'rtl' }}
            >
              <Input
                size="large"
                placeholder="کد تایید"
                className="text-center w-full"
                style={{ width: '100%' }}
                maxLength={6}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: '2rem' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full bg-[#1B36FF] hover:bg-[#1B36FF]/80"
                loading={isLoading}
                disabled={isLoading}
              >
                تایید کد و ورود یا ثبت‌نام
              </Button>
            </Form.Item>

            <div className="text-center mt-4">
              {isRunning ? (
                <>
                  <span className="text-gray-500">ارسال مجدد: </span>
                  {currentMinutes}:{currentSeconds.toString().padStart(2, '0')}
                </>
              ) : (
                <span
                  className="text-[#1B36FF] cursor-pointer"
                  onClick={handleResendCode}
                >
                  ارسال مجدد
                </span>
              )}
            </div>
            <div
              className="text-center mt-8 cursor-pointer text-[#1B36FF]"
              onClick={() => router.push('/auth')}
            >
              اصلاح شماره موبایل
            </div>
          </Form>
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="w-2/3">
            <Divider className="w-full">یا</Divider>
            <Button
              color="primary"
              variant="outlined"
              className="w-full"
              size="large"
              icon={
                <Image
                  src="/images/Icon-L.svg"
                  alt="google"
                  width={20}
                  height={20}
                />
              }
            >
              ورود یا ثبت‌نام با گوگل
            </Button>
            <p className="text-center text-sm py-4">
              ورود شما به معنای پذیرش شرایط
              <span className="text-[#1B36FF]"> اینوگیت</span> و{' '}
              <span className="text-[#1B36FF]"> قوانین حریم‌خصوصی</span> است
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CodePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">در حال بارگذاری...</div>
      </div>
    }>
      <CodePageContent />
    </Suspense>
  );
}
