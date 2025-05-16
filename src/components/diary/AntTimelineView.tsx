"use client";

import React from 'react';
import { Timeline, Card, Tag, Typography, Space, Badge } from 'antd';
import { 
  CalendarOutlined, 
  SmileOutlined, 
  MehOutlined, 
  FrownOutlined, 
  ExclamationCircleOutlined,
  HeartOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

interface TimelineEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'excited';
  tags: string[];
}

interface TimelineData {
  [month: string]: TimelineEntry[];
}

interface AntTimelineViewProps {
  data: TimelineData;
}

export default function AntTimelineView({ data }: AntTimelineViewProps) {
  // Mood icon mapping
  const moodIcon = {
    happy: <SmileOutlined style={{ color: '#52c41a' }} />,
    neutral: <MehOutlined style={{ color: '#1677ff' }} />,
    sad: <FrownOutlined style={{ color: '#1677ff' }} />,
    anxious: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    excited: <HeartOutlined style={{ color: '#722ed1' }} />,
  };

  // Color mapping for timeline dots
  const moodColor = {
    happy: 'green',
    neutral: 'blue',
    sad: 'blue',
    anxious: 'orange',
    excited: 'purple',
  };

  return (
    <Timeline
      mode="left"
      items={Object.entries(data).flatMap(([month, entries], monthIndex) => {
        // Create month header item
        const monthItem = {
          label: <Title level={4}>{month}</Title>,
          dot: <CalendarOutlined style={{ fontSize: '16px' }} />,
          color: 'blue',
          children: <div style={{ height: 8 }} />,
        };

        // Create entry items
        const entryItems = entries.map((entry, entryIndex) => {
          // Format date
          const entryDate = new Date(entry.date);
          const formattedDate = entryDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          });

          return {
            label: <Text>{formattedDate}</Text>,
            color: moodColor[entry.mood],
            children: (
              <Link href={`/diary/entry/${entry.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                <Card 
                  hoverable 
                  size="small"
                  style={{ marginBottom: 16 }}
                  extra={<Badge count={moodIcon[entry.mood]} />}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={5} style={{ margin: 0 }}>{entry.title}</Title>
                    
                    <Paragraph ellipsis={{ rows: 2 }} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                      {entry.content.length > 100 
                        ? entry.content.substring(0, 100) + '...' 
                        : entry.content}
                    </Paragraph>
                    
                    <div>
                      {entry.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                      {entry.tags.length > 3 && (
                        <Tag>+{entry.tags.length - 3}</Tag>
                      )}
                    </div>
                  </Space>
                </Card>
              </Link>
            ),
          };
        });

        // Combine month header with its entries
        return [monthItem, ...entryItems];
      })}
    />
  );
}
