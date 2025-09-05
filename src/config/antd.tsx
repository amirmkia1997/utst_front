'use client';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

const theme = {
  token: {
    colorPrimary: '#1B36FF',
    colorError: '#CC3931',
    fontFamily:
      'IRANSansX, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    borderRadius: 8,
  },
  components: {
    Input: {
      borderRadius: 8,
      fontSize: 14,
    },
    InputNumber: {
      borderRadius: 8,
      fontSize: 14,
      direction: 'ltr',
      width: '100%',
    },
    Button: {
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
    },
    Form: {
      fontSize: 14,
    },
    Segmented: {
      itemSelectedBg: '#1B36FF',
      itemSelectedColor: '#ffffff',
      itemColor: '#1B36FF',
      itemBg: '#ffffff',
    },
  },
};

interface AntdProviderProps {
  children: ReactNode;
}

export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider theme={theme} direction="rtl">
      {children}
    </ConfigProvider>
  );
}

export default theme;
