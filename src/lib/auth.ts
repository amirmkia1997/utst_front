import { supabase } from '@/lib/supabase';

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// Mock OTP برای تست (وقتی Phone Provider فعال نیست)
const generateMockOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ذخیره کدهای mock در localStorage
const storeMockOtp = (phone: string, code: string) => {
  localStorage.setItem(`mock_otp_${phone}`, code);
  localStorage.setItem(`mock_otp_time_${phone}`, Date.now().toString());
};

const getMockOtp = (phone: string): string | null => {
  const code = localStorage.getItem(`mock_otp_${phone}`);
  const time = localStorage.getItem(`mock_otp_time_${phone}`);

  if (!code || !time) return null;

  // کد فقط 5 دقیقه معتبر است
  const now = Date.now();
  const otpTime = parseInt(time);
  if (now - otpTime > 5 * 60 * 1000) {
    localStorage.removeItem(`mock_otp_${phone}`);
    localStorage.removeItem(`mock_otp_time_${phone}`);
    return null;
  }

  return code;
};

export const authApi = {
  // ارسال کد تأیید به شماره تلفن (Mock فقط)
  async sendOtp(phone: string): Promise<AuthResponse> {
    try {
      // فقط Mock OTP استفاده کن (بدون SMS)
      const mockCode = generateMockOtp();
      storeMockOtp(phone, mockCode);

      console.log(`🔐 Mock OTP for ${phone}: ${mockCode}`);

      return {
        success: true,
        message: `کد تأیید ارسال شد: ${mockCode}`,
        data: { mock: true, code: mockCode },
      };
    } catch (err) {
      return {
        success: false,
        message: 'خطا در ارسال کد تأیید',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  },

  // تأیید کد OTP (فقط 123456)
  async verifyOtp(phone: string, token: string): Promise<AuthResponse> {
    try {
      // فقط کد 123456 قبول کن
      if (token === '123456') {
        // کد معتبر است
        localStorage.removeItem(`mock_otp_${phone}`);
        localStorage.removeItem(`mock_otp_time_${phone}`);

        // یک کاربر Mock ایجاد کن
        const mockUser = {
          id: `mock_${Date.now()}`,
          phone: phone,
          created_at: new Date().toISOString(),
          user_metadata: {
            phone: phone,
          },
        };

        // کاربر را در جدول users اضافه کن
        const { error: userError } = await supabase.from('users').upsert({
          id: mockUser.id,
          email: phone + '@mock.com',
          name: 'کاربر تست',
          role: 'investable',
        });

        if (userError) {
          console.error('Error creating mock user:', userError);
        }

        return {
          success: true,
          message: 'ورود موفقیت‌آمیز',
          data: { user: mockUser, mock: true },
        };
      }

      return {
        success: false,
        message: 'کد تأیید اشتباه است',
        error: 'Invalid code',
      };
    } catch (err) {
      return {
        success: false,
        message: 'خطا در تأیید کد',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  },

  // خروج از سیستم
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          message: 'خطا در خروج از سیستم',
          error: error.message,
        };
      }

      return {
        success: true,
        message: 'خروج موفقیت‌آمیز',
      };
    } catch (err) {
      return {
        success: false,
        message: 'خطا در خروج از سیستم',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  },

  // دریافت کاربر فعلی
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        return null;
      }

      return user;
    } catch (err) {
      return null;
    }
  },

  // دریافت session فعلی
  async getCurrentSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        return null;
      }

      return session;
    } catch (err) {
      return null;
    }
  },
};
