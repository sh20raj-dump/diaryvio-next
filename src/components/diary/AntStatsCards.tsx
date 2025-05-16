"use client";

import React from 'react';
import { Row, Col, Card, Statistic, Progress, Typography } from 'antd';
import { 
  FireOutlined, 
  BookOutlined, 
  SmileOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

interface StatsCardsProps {
  streak: number;
  totalEntries: number;
  mood: string;
  moodScore: number;
  lastEntry?: string;
}

export default function AntStatsCards({
  streak,
  totalEntries,
  mood,
  moodScore,
  lastEntry,
}: StatsCardsProps) {
  // Calculate mood color
  const getMoodColor = (score: number) => {
    if (score >= 80) return '#52c41a'; // Green
    if (score >= 60) return '#1677ff'; // Blue
    if (score >= 40) return '#faad14'; // Yellow
    if (score >= 20) return '#fa8c16'; // Orange
    return '#f5222d'; // Red
  };

  const moodColor = getMoodColor(moodScore);

  return (
    <>
      <Title level={4} style={{ marginBottom: 16 }}>Your Stats</Title>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Streak"
              value={streak}
              suffix="days"
              prefix={<FireOutlined style={{ color: '#fa541c' }} />}
            />
          </Card>
        </Col>
        
        <Col xs={12} sm={12} md={6} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Entries"
              value={totalEntries}
              prefix={<BookOutlined style={{ color: '#1677ff' }} />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card bordered={false}>
            <Statistic
              title="Current Mood"
              value={mood}
              prefix={<SmileOutlined style={{ color: moodColor }} />}
            />
            <Progress 
              percent={moodScore} 
              status="active" 
              strokeColor={moodColor}
              style={{ marginTop: 8 }}
            />
          </Card>
        </Col>
        
        {lastEntry && (
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card bordered={false}>
              <Statistic
                title="Last Entry"
                value={lastEntry}
                prefix={<CalendarOutlined style={{ color: '#722ed1' }} />}
              />
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}
