"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TimelineView from '@/components/diary/TimelineView';
import AICompanion from '@/components/diary/AICompanion';

interface TimelineEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'excited';
  tags: string[];
}

export default function TimelinePage() {
  // Mock data grouped by month
  const mockTimelineData: Record<string, TimelineEntry[]> = {
    'October 2023': [
      {
        id: '1',
        title: 'Morning Reflection',
        content: 'Today I woke up feeling refreshed after trying those new sleep techniques. I think I\'ll continue with this routine.',
        date: '2023-10-15',
        mood: 'happy',
        tags: ['sleep', 'morning', 'routine'],
      },
      {
        id: '2',
        title: 'Work Challenges',
        content: 'The project deadline is approaching and I\'m feeling a bit anxious about meeting all the requirements.',
        date: '2023-10-14',
        mood: 'anxious',
        tags: ['work', 'stress'],
      },
      {
        id: '3',
        title: 'Evening Thoughts',
        content: 'Had dinner with friends tonight. It was nice to catch up after so long.',
        date: '2023-10-13',
        mood: 'excited',
        tags: ['friends', 'social'],
      },
    ],
    'September 2023': [
      {
        id: '4',
        title: 'Weekend Getaway',
        content: 'Spent the weekend at the beach. The weather was perfect and I feel recharged.',
        date: '2023-09-25',
        mood: 'happy',
        tags: ['travel', 'beach', 'relaxation'],
      },
      {
        id: '5',
        title: 'Reflection on Goals',
        content: 'Reviewing my yearly goals. I\'ve made progress on some, but others need more attention.',
        date: '2023-09-15',
        mood: 'neutral',
        tags: ['goals', 'reflection'],
      },
    ],
  };

  return (
    <AppLayout title="Timeline">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Your Journal Timeline</h2>
        <TimelineView data={mockTimelineData} />
      </div>

      {/* AI Companion */}
      <AICompanion name="Violet" />
    </AppLayout>
  );
}
