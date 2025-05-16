"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MicrophoneIcon, PencilIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/components/layout/AppLayout';
import SearchInput from '@/components/diary/SearchInput';
import StatsCards from '@/components/diary/StatsCards';
import DiaryEntry from '@/components/diary/DiaryEntry';
import AICompanion from '@/components/diary/AICompanion';

export default function DiaryDashboard() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const userName = session?.user?.name?.split(" ")[0] || "there";

  // Mock data for demonstration
  const mockEntries = [
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
  ];

  // Mock stats
  const entryStreak = 7;
  const totalEntries = 42;
  const moodStatus = 'Normal';
  const moodScore = 75;
  const lastEntry = 'Yesterday at 9:30 PM';

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-400">How are you feeling today?</p>
        </div>

        {/* Search bar */}
        <SearchInput placeholder="Search your memories or ask a question..." />

        {/* Stats cards */}
        <StatsCards
          streak={entryStreak}
          totalEntries={totalEntries}
          mood={moodStatus}
          moodScore={moodScore}
          lastEntry={lastEntry}
        />

        {/* Quick actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/diary/new">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl flex items-center justify-center transition-colors">
                <MicrophoneIcon className="w-5 h-5 mr-2" />
                New Voice Entry
              </button>
            </Link>
            <Link href="/diary/new-text">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-4 px-6 rounded-xl flex items-center justify-center transition-colors">
                <PencilIcon className="w-5 h-5 mr-2" />
                New Text Entry
              </button>
            </Link>
          </div>
        </div>

        {/* Recent entries */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Entries</h2>
            <Link href="/diary/timeline" className="text-indigo-400 hover:text-indigo-300 flex items-center">
              View All
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {mockEntries.map((entry) => (
              <DiaryEntry
                key={entry.id}
                id={entry.id}
                title={entry.title}
                content={entry.content}
                date={entry.date}
                mood={entry.mood as any}
                tags={entry.tags}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI Companion */}
      <AICompanion name="Violet" />
    </AppLayout>
  );
}
