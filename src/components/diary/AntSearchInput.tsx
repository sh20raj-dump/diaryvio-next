"use client";

import React, { useState } from 'react';
import { Input, Button, Space, Tooltip } from 'antd';
import { SearchOutlined, AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  showVoiceButton?: boolean;
  loading?: boolean;
}

export default function AntSearchInput({
  placeholder = "Search your memories or ask a question...",
  onSearch,
  showVoiceButton = true,
  loading = false,
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    if (onSearch && value.trim()) {
      onSearch(value);
    }
  };

  const suffix = showVoiceButton ? (
    <Tooltip title="Voice search">
      <AudioOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
    </Tooltip>
  ) : null;

  return (
    <Search
      placeholder={placeholder}
      allowClear
      enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
      size="large"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={handleSearch}
      loading={loading}
      suffix={suffix}
      style={{ width: '100%' }}
    />
  );
}
