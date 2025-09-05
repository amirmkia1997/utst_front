'use client';
import { CheckCircle, Lock } from '@solar-icons/react';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface CustomStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function CustomStepper({
  steps,
  currentStep,
}: CustomStepperProps) {
  const getStepStatus = (stepIndex: number) => {
    const step = steps[stepIndex];
    return step.status;
  };

  const getStepColors = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'border-green-500 bg-green-50',
          icon: 'text-green-500',
          statusBg: 'bg-green-50',
          statusText: 'text-green-600',
          line: 'bg-green-500',
        };
      case 'in-progress':
        return {
          circle: 'border-blue-500 bg-blue-50',
          icon: 'text-blue-500',
          statusBg: 'bg-blue-50',
          statusText: 'text-blue-600',
          line: 'bg-blue-500',
        };
      default:
        return {
          circle: 'border-gray-300 bg-gray-50',
          icon: 'text-gray-400',
          statusBg: 'bg-gray-50',
          statusText: 'text-gray-500',
          line: 'bg-gray-300',
        };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'تکمیل شده';
      case 'in-progress':
        return 'در حال تکمیل';
      default:
        return 'در انتظار تکمیل';
    }
  };

  return (
    <div className="w-full" dir="rtl">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const colors = getStepColors(status);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Content */}
              <div className="flex flex-col items-center text-center">
                {/* Circle */}
                <div
                  className={`w-12 h-12 rounded-full border-2 ${colors.circle} flex items-center justify-center mb-3`}
                >
                  {status === 'completed' ? (
                    <CheckCircle size={24} className={colors.icon} />
                  ) : status === 'in-progress' ? (
                    <Lock size={24} className={colors.icon} />
                  ) : (
                    <span className={`text-lg font-bold ${colors.icon}`}>
                      {step.id}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-gray-600 mb-3 max-w-32">
                  {step.subtitle}
                </p>

                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full ${colors.statusBg}`}>
                  <span className={`text-xs font-medium ${colors.statusText}`}>
                    {getStatusText(status)}
                  </span>
                </div>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gray-200 relative">
                    <div
                      className={`h-full ${colors.line}`}
                      style={{
                        width:
                          status === 'completed'
                            ? '100%'
                            : status === 'in-progress'
                              ? '60%'
                              : '0%',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
