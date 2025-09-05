'use client';
import { Button } from 'antd';

interface Step4FormProps {
  onSubmit?: () => void;
  onPrevious?: () => void;
}

export default function Step4Form({ onSubmit, onPrevious }: Step4FormProps) {
  const handleSubmit = () => {
    console.log('Submit button clicked');
    if (onSubmit) {
      console.log('onSubmit provided');
      onSubmit();
    } else {
      console.log('onSubmit not provided');
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            تکمیل پروژه
          </h3>
          <p className="text-gray-600 mb-4">
            اطلاعات پروژه شما آماده ارسال است. روی دکمه زیر کلیک کنید تا پروژه
            ثبت شود.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h4 className="text-green-800 font-medium mb-2">
            ✅ اطلاعات کامل است
          </h4>
          <p className="text-green-700 text-sm">
            تمام اطلاعات مورد نیاز برای ثبت پروژه جمع‌آوری شده است.
          </p>
        </div>

        <div className="flex gap-4 pt-6">
          {onPrevious && (
            <Button size="large" onClick={onPrevious} className="flex-1">
              مرحله قبل
            </Button>
          )}
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            className={onPrevious ? 'flex-1' : 'w-full'}
          >
            تکمیل و ارسال پروژه
          </Button>
        </div>
      </div>
    </div>
  );
}
