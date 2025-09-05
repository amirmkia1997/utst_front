'use client';
import CustomStepper from '@/components/CustomStepper';
import Step1Form from '@/components/Step1Form';
import Step2Form from '@/components/Step2Form';
import Step3Form from '@/components/Step3Form';
import Step4Form from '@/components/Step4Form';
import React, { useState } from 'react';
import { useProjects, useUsers } from '@/hooks/useApi';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export default function UpLoad() {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<any>({});
  const [step2Data, setStep2Data] = useState<any>({});
  const [step3Data, setStep3Data] = useState<any>({});
  const { createProject } = useProjects();
  const { users } = useUsers();
  const router = useRouter();

  // Get current user (assuming first user for now)
  const currentUser = users[0];

  const getSteps = () => {
    return [
      {
        id: 1,
        title: 'مرحله اول',
        subtitle: 'پذیرش قوانین و مقررات',
        status:
          currentStep === 1
            ? ('in-progress' as const)
            : currentStep > 1
              ? ('completed' as const)
              : ('pending' as const),
      },
      {
        id: 2,
        title: 'مرحله دوم',
        subtitle: 'ثبت اطلاعات کسب و کار',
        status:
          currentStep === 2
            ? ('in-progress' as const)
            : currentStep > 2
              ? ('completed' as const)
              : ('pending' as const),
      },
      {
        id: 3,
        title: 'مرحله سوم',
        subtitle: 'اطلاعات مالی',
        status:
          currentStep === 3
            ? ('in-progress' as const)
            : currentStep > 3
              ? ('completed' as const)
              : ('pending' as const),
      },
      {
        id: 4,
        title: 'مرحله چهارم',
        subtitle: 'بارگذاری ارائه',
        status:
          currentStep === 4 ? ('in-progress' as const) : ('pending' as const),
      },
    ];
  };

  const handleNextStep = (stepData?: any) => {
    console.log('Step data received:', stepData);
    console.log('Current step:', currentStep);

    if (stepData && typeof stepData === 'object' && !stepData._reactName) {
      if (currentStep === 1) {
        setStep1Data(stepData);
      } else if (currentStep === 2) {
        setStep2Data(stepData);
      } else if (currentStep === 3) {
        setStep3Data(stepData);
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitProject = async () => {
    try {
      console.log('Step 1 data:', step1Data);
      console.log('Step 2 data:', step2Data);
      console.log('Step 3 data:', step3Data);
      console.log('Current user:', currentUser);

      // Clean all data to remove circular references
      const cleanStep1Data = JSON.parse(JSON.stringify(step1Data));
      const cleanStep2Data = JSON.parse(JSON.stringify(step2Data));
      const cleanStep3Data = JSON.parse(JSON.stringify(step3Data));
      const cleanUser = JSON.parse(JSON.stringify(currentUser));

      // Only send fields that exist in database
      const completeData = {
        title: cleanStep2Data.title,
        description: cleanStep2Data.description,
        investment_amount: parseInt(cleanStep3Data.investment_amount),
        repayment_period: parseInt(cleanStep3Data.repayment_period),
        interest_rate: parseFloat(cleanStep3Data.interest_rate),
        investment_type: cleanStep3Data.investment_type,
        user_id: cleanUser?.id,
        status: 'pending' as const,
      };

      console.log('Complete data to send:', completeData);
      await createProject(completeData);

      message.success({
        content: 'پروژه با موفقیت ثبت شد! در حال انتقال به اکوسیستم...',
        duration: 2,
      });

      // Navigate to ecosystem after 2 seconds
      setTimeout(() => {
        router.push('/ecosystem');
      }, 2000);

      // Reset form and go back to step 1
      setCurrentStep(1);
      setStep1Data({});
      setStep2Data({});
      setStep3Data({});
    } catch (error) {
      console.error('Error creating project:', error);
      message.error('خطا در ثبت پروژه');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step2Form onNext={handleNextStep} />;
      case 2:
        return (
          <Step1Form onNext={handleNextStep} onPrevious={handlePreviousStep} />
        );
      case 3:
        return (
          <Step3Form onNext={handleNextStep} onPrevious={handlePreviousStep} />
        );
      case 4:
        return (
          <Step4Form
            onSubmit={handleSubmitProject}
            onPrevious={handlePreviousStep}
          />
        );
      default:
        return <Step2Form onNext={handleNextStep} />;
    }
  };

  return (
    <div className="w-full px-4 space-y-6">
      {/* Stepper */}
      <div className="w-full p-4 bg-white shadow-sm rounded-lg">
        <CustomStepper steps={getSteps()} currentStep={currentStep} />
      </div>

      {/* Step Content */}
      <div className="w-full p-6 bg-white shadow-sm rounded-lg">
        {renderStepContent()}
      </div>
    </div>
  );
}
