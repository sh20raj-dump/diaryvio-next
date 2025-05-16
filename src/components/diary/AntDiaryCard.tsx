"use client";

import React from 'react';
import { Card, Tag, Typography, Space, Badge } from 'antd';
import { 
  SmileOutlined, 
  MehOutlined, 
  FrownOutlined, 
  ExclamationCircleOutlined,
  HeartOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

interface DiaryCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: 'happy' | 'neutral' | 'sad' | 'anxious' | 'excited';
  tags?: string[];
  className?: string;
}

export default function AntDiaryCard({
  id,
  title,
  content,
  date,
  mood = 'neutral',
  tags = [],
  className = "",
}: DiaryCardProps) {
  // Mood icon mapping
  const moodIcon = {
    happy: <SmileOutlined style={{ color: '#52c41a' }} />,
    neutral: <MehOutlined style={{ color: '#1677ff' }} />,
    sad: <FrownOutlined style={{ color: '#1677ff' }} />,
    anxious: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    excited: <HeartOutlined style={{ color: '#722ed1' }} />,
  };

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Truncate content for preview
  const truncatedContent = content.length > 120 
    ? content.substring(0, 120) + '...' 
    : content;

  return (
    <Link href={`/diary/entry/${id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <Card 
        hoverable
        className={className}
        style={{ marginBottom: 16 }}
        extra={<Badge count={moodIcon[mood]} />}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Title level={5} style={{ margin: 0 }}>{title}</Title>
          </div>
          
          <Paragraph ellipsis={{ rows: 2 }} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
            {truncatedContent}
          </Paragraph>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text type="secondary">{formattedDate}</Text>
            
            {tags.length > 0 && (
              <div>
                {tags.slice(0, 2).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {tags.length > 2 && (
                  <Tag>+{tags.length - 2}</Tag>
                )}
              </div>
            )}
          </div>
        </Space>
      </Card>
    </Link>
  );
}
