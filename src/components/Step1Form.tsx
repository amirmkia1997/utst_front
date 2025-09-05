'use client';
import { Button, Form, Input, Select, Radio, Checkbox } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

interface Step1FormProps {
  onNext?: (data: any) => void;
  onPrevious?: () => void;
}

export default function Step1Form({ onNext, onPrevious }: Step1FormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Step 1 values:', values);
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
            name="projectCategory"
            label="دسته بندی پروژه"
            rules={[
              {
                required: true,
                message: 'لطفا دسته بندی پروژه را انتخاب کنید!',
              },
            ]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="tech">فناوری</Option>
              <Option value="health">سلامت</Option>
              <Option value="education">آموزش</Option>
              <Option value="finance">مالی</Option>
              <Option value="other">سایر</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="نام پروژه"
            rules={[
              { required: true, message: 'لطفا نام پروژه را وارد کنید!' },
            ]}
          >
            <Input placeholder="نام پروژه" size="large" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="subCategory"
            label="زیردسته حوزه فعالیت"
            rules={[
              { required: true, message: 'لطفا زیردسته را انتخاب کنید!' },
            ]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="mobile">موبایل</Option>
              <Option value="web">وب</Option>
              <Option value="ai">هوش مصنوعی</Option>
              <Option value="iot">اینترنت اشیا</Option>
              <Option value="other">سایر</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="startYear"
            label="سال آغاز فعالیت"
            rules={[
              { required: true, message: 'لطفا سال آغاز فعالیت را وارد کنید!' },
            ]}
          >
            <Input placeholder="مثال: ۱۴۰۰" size="large" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="website"
            label="سایت"
            rules={[
              { required: true, message: 'لطفا آدرس سایت را وارد کنید!' },
            ]}
          >
            <Input placeholder="https://example.com" size="large" />
          </Form.Item>

          <Form.Item
            name="activityField"
            label="حوزه فعالیت"
            rules={[
              { required: true, message: 'لطفا حوزه فعالیت را انتخاب کنید!' },
            ]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="software">نرم‌افزار</Option>
              <Option value="hardware">سخت‌افزار</Option>
              <Option value="service">خدمات</Option>
              <Option value="consulting">مشاوره</Option>
              <Option value="other">سایر</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="productStatus"
            label="وضعیت محصول"
            rules={[
              { required: true, message: 'لطفا وضعیت محصول را انتخاب کنید!' },
            ]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="idea">ایده</Option>
              <Option value="development">در حال توسعه</Option>
              <Option value="beta">نسخه بتا</Option>
              <Option value="launched">راه‌اندازی شده</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="participationType"
            label="نوع مشارکت مدنی"
            rules={[
              { required: true, message: 'لطفا نوع مشارکت را انتخاب کنید!' },
            ]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="investment">سرمایه‌گذاری</Option>
              <Option value="partnership">مشارکت</Option>
              <Option value="collaboration">همکاری</Option>
              <Option value="other">سایر</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="country"
            label="کشور محل فعالیت"
            rules={[{ required: true, message: 'لطفا کشور را انتخاب کنید!' }]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="iran">ایران</Option>
              <Option value="usa">آمریکا</Option>
              <Option value="canada">کانادا</Option>
              <Option value="other">سایر</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="province"
            label="استان محل فعالیت"
            rules={[{ required: true, message: 'لطفا استان را انتخاب کنید!' }]}
          >
            <Select placeholder="انتخاب کنید" size="large">
              <Option value="tehran">تهران</Option>
              <Option value="isfahan">اصفهان</Option>
              <Option value="shiraz">شیراز</Option>
              <Option value="other">سایر</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="city"
            label="شهر محل فعالیت"
            rules={[{ required: true, message: 'لطفا شهر را وارد کنید!' }]}
          >
            <Input placeholder="نام شهر" size="large" />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="توضیح آزاد درباره پروژه"
          rules={[
            { required: true, message: 'لطفا توضیحات پروژه را وارد کنید!' },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="توضیحات کامل پروژه خود را بنویسید..."
            size="large"
          />
        </Form.Item>

        <div className="space-y-4">
          <Form.Item
            name="marketEntry"
            label="آیا محصول وارد بازار شده است؟"
            rules={[
              {
                required: true,
                message: 'لطفا وضعیت ورود به بازار را مشخص کنید!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="yes">بله</Radio>
              <Radio value="no">خیر</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="knowledgeBased"
            label="آیا شرکت شما دانش‌بنیان است؟"
            rules={[
              {
                required: true,
                message: 'لطفا وضعیت دانش‌بنیان بودن را مشخص کنید!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="yes">بله</Radio>
              <Radio value="no">خیر</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="techPark"
            label="آیا شرکت شما در پارک علم و فناوری مستقر می‌باشد؟"
            rules={[
              {
                required: true,
                message: 'لطفا وضعیت استقرار در پارک را مشخص کنید!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="yes">بله</Radio>
              <Radio value="no">خیر</Radio>
            </Radio.Group>
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
