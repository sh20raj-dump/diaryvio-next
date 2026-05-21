"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  MicrophoneIcon,
  PencilIcon,
  ArrowRightIcon,
  SparklesIcon,
  CalendarDaysIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
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

  // Get current time to personalize greeting
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <AppLayout title="Journal">
      <div className="max-w-5xl mx-auto">
        {/* Welcome section with glass morphism */}
        <div className="dark-glass rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold gradient-text mb-3">{greeting}, {userName}</h1>
            <p className="text-gray-300 text-lg">How are you feeling today?</p>

            {/* Search bar integrated in welcome section */}
            <div className="mt-6">
              <SearchInput
                placeholder="Search your memories or ask a question..."
                className="shadow-glow"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats summary */}
          <div className="md:col-span-2">
            <StatsCards
              streak={entryStreak}
              totalEntries={totalEntries}
              mood={moodStatus}
              moodScore={moodScore}
              lastEntry={lastEntry}
            />
          </div>

          {/* Quick actions panel */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Quick Actions
            </h2>

            <div className="space-y-3 flex-grow flex flex-col">
              <Link href="/diary/new" className="flex-grow">
                <button className="w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white py-4 px-5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                  <MicrophoneIcon className="w-5 h-5 mr-2" />
                  Voice Entry
                </button>
              </Link>

              <Link href="/diary/new-text" className="flex-grow">
                <button className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                  <PencilIcon className="w-5 h-5 mr-2" />
                  Text Entry
                </button>
              </Link>

              <Link href="/diary/timeline" className="flex-grow">
                <button className="w-full h-full bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white py-4 px-5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  Timeline
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent entries with improved styling */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold gradient-text flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2 text-indigo-400" />
              Recent Entries
            </h2>
            <Link href="/diary/timeline" className="text-indigo-400 hover:text-indigo-300 flex items-center transition-colors px-3 py-1 rounded-lg hover:bg-indigo-500/10">
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
                className="hover:translate-y-[-2px] transition-all duration-300"
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
