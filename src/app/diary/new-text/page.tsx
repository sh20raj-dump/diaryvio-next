"use client";

import React, { useState } from 'react';
import { Typography, Form, Input, Button, Radio, Space, Tag, message } from 'antd';
import {
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  PlusOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import AppLayout from '@/components/layout/AppLayout';

const { Title } = Typography;
const { TextArea } = Input;

export default function NewTextEntryPage() {
  const [form] = Form.useForm();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = React.useRef<Input>(null);

  const handleSubmit = (values: any) => {
    // In a real app, this would save the entry to the database
    console.log('Saving entry:', {
      ...values,
      tags,
      date: new Date().toISOString(),
    });

    message.success('Entry saved successfully!');

    // Reset form
    form.resetFields();
    setTags([]);
  };

  // Tag input handlers
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  // Mood options with icons
  const moodOptions = [
    { value: 'happy', label: <><SmileOutlined /> Happy</> },
    { value: 'neutral', label: <><MehOutlined /> Neutral</> },
    { value: 'sad', label: <><FrownOutlined /> Sad</> },
    { value: 'anxious', label: <><ExclamationCircleOutlined /> Anxious</> },
    { value: 'excited', label: <><HeartOutlined /> Excited</> },
  ];

  return (
    <AppLayout title="New Text Entry">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Entry form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ mood: 'neutral' }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Entry title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Content is required' }]}
          >
            <TextArea
              rows={10}
              placeholder="Write your thoughts here..."
            />
          </Form.Item>

          <Form.Item name="mood" label="How are you feeling?">
            <Radio.Group buttonStyle="solid" size="large">
              {moodOptions.map(option => (
                <Radio.Button key={option.value} value={option.value}>
                  {option.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item name="location" label="Location (optional)">
            <Input
              placeholder="e.g., Home, Office, Coffee Shop"
              prefix={<EnvironmentOutlined />}
            />
          </Form.Item>

          <Form.Item label="Tags">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tags.map(tag => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleClose(tag)}
                >
                  {tag}
                </Tag>
              ))}

              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Save Entry
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </AppLayout>
  );
}
