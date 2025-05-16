"use client";

import React from 'react';
import { ConfigProvider, theme } from 'antd';

// Define theme tokens
const themeConfig = {
  token: {
    colorPrimary: '#5B5FF9',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1677ff',
    borderRadius: 8,
    wireframe: false,
  },
  algorithm: theme.defaultAlgorithm,
};

export default function AntDesignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider theme={themeConfig}>
      {children}
    </ConfigProvider>
  );
}
