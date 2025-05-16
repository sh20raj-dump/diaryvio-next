"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import {
  FaceSmileIcon,
  FaceFrownIcon,
  ExclamationCircleIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import AppLayout from '@/components/layout/AppLayout';
import AICompanion from '@/components/diary/AICompanion';

export default function EntryDetailPage() {
  const params = useParams();
  const entryId = params.id as string;

  // Mock data - in a real app, you would fetch this from your database
  const mockEntries = {
    '1': {
      id: '1',
      title: 'Morning Reflection',
      content: `Today I woke up feeling refreshed after trying those new sleep techniques. I think I'll continue with this routine.

I went to bed at 10 PM last night, avoided screens for an hour before, and did some light stretching. The difference in how I feel is remarkable. I had vivid dreams too, which I haven't experienced in a while.

I'm going to try to maintain this routine for at least a week and see if the benefits continue. Maybe I'll add some meditation in the morning as well.`,
      date: '2023-10-15T08:30:00Z',
      mood: 'happy',
      tags: ['sleep', 'morning', 'routine', 'wellness'],
      location: 'Home',
    },
    '2': {
      id: '2',
      title: 'Work Challenges',
      content: `The project deadline is approaching and I'm feeling a bit anxious about meeting all the requirements. We still have several key features to implement, and the testing phase hasn't even started yet.

I had a meeting with the team today to discuss our progress. Everyone seems to be working hard, but there's a sense of tension in the air. I need to make sure I'm supporting everyone while also ensuring we stay on track.

Tomorrow I'll create a detailed plan for the remaining tasks and allocate resources more efficiently. Maybe we need to prioritize certain features and leave others for a future update.`,
      date: '2023-10-14T18:45:00Z',
      mood: 'anxious',
      tags: ['work', 'stress', 'project', 'management'],
      location: 'Office',
    },
    '3': {
      id: '3',
      title: 'Evening Thoughts',
      content: `Had dinner with friends tonight. It was nice to catch up after so long. We went to that new Italian restaurant downtown, and the food was amazing. I had the mushroom risotto, which was perfectly cooked.

We talked about our lives, shared some laughs, and reminisced about old times. It's interesting how we've all taken different paths but still maintain our connection. I feel grateful for having such long-lasting friendships.

I should organize these get-togethers more often. Maybe once a month would be a good frequency.`,
      date: '2023-10-13T21:20:00Z',
      mood: 'excited',
      tags: ['friends', 'social', 'dinner', 'relationships'],
      location: 'Downtown Restaurant',
    },
  };

  const entry = mockEntries[entryId as keyof typeof mockEntries];

  if (!entry) {
    return (
      <AppLayout title="Entry Not Found">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-white mb-4">Entry Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            We couldn't find the diary entry you're looking for.
          </p>
          <Link href="/diary">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors">
              Back to Diary
            </button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  // Format date
  const entryDate = new Date(entry.date);
  const formattedDate = entryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = entryDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Mood icon mapping
  const moodIcon = {
    happy: <FaceSmileIcon className="w-5 h-5 text-green-400" />,
    neutral: <FaceSmileIcon className="w-5 h-5 text-blue-400" />,
    sad: <FaceFrownIcon className="w-5 h-5 text-blue-400" />,
    anxious: <ExclamationCircleIcon className="w-5 h-5 text-amber-400" />,
    excited: <HeartIcon className="w-5 h-5 text-purple-400" />,
  };

  // Mood color mapping for text
  const moodTextColor = {
    happy: 'text-green-400',
    neutral: 'text-blue-400',
    sad: 'text-blue-400',
    anxious: 'text-amber-400',
    excited: 'text-purple-400',
  };

  return (
    <AppLayout
      title={entry.title}
      extra={
        <div className="flex space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Entry metadata */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="text-white">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p className="text-white">{formattedTime}</p>
              </div>
            </div>

            {entry.location && (
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">{entry.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <div className="mr-3">
                {moodIcon[entry.mood as keyof typeof moodIcon]}
              </div>
              <div>
                <p className="text-gray-400 text-sm">Mood</p>
                <p className={`capitalize ${moodTextColor[entry.mood as keyof typeof moodTextColor]}`}>
                  {entry.mood}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Entry content */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          {entry.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-200 mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm border border-indigo-800/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back button */}
        <div>
          <Link href="/diary">
            <button className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Diary
            </button>
          </Link>
        </div>
      </div>

      {/* AI Companion */}
      <AICompanion name="Violet" />
    </AppLayout>
  );
}
