'use client';
import { Button, Form, Input, Select, Radio, Checkbox } from 'antd';

const { Option } = Select;

interface Step3FormProps {
  onNext?: (data: any) => void;
  onPrevious?: () => void;
}

export default function Step3Form({ onNext, onPrevious }: Step3FormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Step 3 values:', values);
    if (onNext) {
      onNext(values);
    }
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="investment_amount"
            label="سرمایه درخواستی (تومان)"
            rules={[
              { required: true, message: 'لطفا سرمایه درخواستی را وارد کنید!' },
            ]}
          >
            <Input placeholder="مثال: ۱۰۰,۰۰۰,۰۰۰" size="large" />
          </Form.Item>

          <Form.Item
            name="repayment_period"
            label="دوره بازپرداخت (ماه)"
            rules={[
              { required: true, message: 'لطفا دوره بازپرداخت را وارد کنید!' },
            ]}
          >
            <Input placeholder="مثال: ۱۲" size="large" suffix="ماه" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="investment_type"
            label="نوع سرمایه‌گذاری"
            rules={[
              {
                required: true,
                message: 'لطفا نوع سرمایه‌گذاری را انتخاب کنید!',
              },
            ]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="equity">سرمایه‌گذاری سهامی</Option>
              <Option value="loan">وام</Option>
              <Option value="convertible">قابل تبدیل</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="interest_rate"
            label="نرخ بهره (%)"
            rules={[{ required: true, message: 'لطفا نرخ بهره را وارد کنید!' }]}
          >
            <Input placeholder="مثال: ۱۵" size="large" suffix="%" />
          </Form.Item>
        </div>

        <Form.Item className="mt-8">
          <div className="flex gap-4">
            {onPrevious && (
              <Button size="large" onClick={onPrevious} className="flex-1">
                مرحله قبل
              </Button>
            )}
            <Button
              type="primary"
              size="large"
              onClick={() => form.submit()}
              className={onPrevious ? 'flex-1' : 'w-full'}
            >
              ادامه به مرحله بعد
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
