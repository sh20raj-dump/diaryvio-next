"use client";

import React from 'react';
import {
  FireIcon,
  BookOpenIcon,
  FaceSmileIcon,
  CalendarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { FireIcon as FireIconSolid } from '@heroicons/react/24/solid';

interface StatsCardsProps {
  streak: number;
  totalEntries: number;
  mood: string;
  moodScore: number;
  lastEntry?: string;
}

export default function StatsCards({
  streak,
  totalEntries,
  mood,
  moodScore,
  lastEntry,
}: StatsCardsProps) {
  // Calculate mood color
  const getMoodColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const moodColor = getMoodColor(moodScore);

  // Get streak flame icons based on streak count
  const getStreakIcons = (count: number) => {
    const icons = [];
    const maxVisible = 5;
    const visibleCount = Math.min(count, maxVisible);

    for (let i = 0; i < visibleCount; i++) {
      icons.push(
        <FireIconSolid
          key={i}
          className={`w-4 h-4 ${i === 0 ? 'text-orange-500' : i === 1 ? 'text-orange-400' : 'text-orange-300'}`}
        />
      );
    }

    if (count > maxVisible) {
      icons.push(<span key="more" className="text-xs text-orange-300 ml-1">+{count - maxVisible}</span>);
    }

    return icons;
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold gradient-text mb-5 flex items-center">
        <SparklesIcon className="w-5 h-5 mr-2 text-indigo-400" />
        Your Journal Stats
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak Card - with glass morphism */}
        <div className="glass rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:shadow-glow transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-12 h-12 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/30 transition-all duration-500"></div>

          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-2">
              <p className="text-gray-300 text-sm font-medium">Streak</p>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-1.5 rounded-lg shadow-md">
                <FireIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-white">{streak}</span>
                <span className="ml-1.5 text-gray-400 text-sm">days</span>
              </div>

              <div className="flex mt-2">
                {getStreakIcons(streak)}
              </div>
            </div>
          </div>
        </div>

        {/* Total Entries Card */}
        <div className="glass rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:shadow-glow transition-all duration-300">
          <div className="absolute -left-6 -bottom-6 w-12 h-12 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all duration-500"></div>

          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-2">
              <p className="text-gray-300 text-sm font-medium">Total Entries</p>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-1.5 rounded-lg shadow-md">
                <BookOpenIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-white">{totalEntries}</span>
                <span className="ml-1.5 text-gray-400 text-sm">total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mood Card */}
        <div className="glass rounded-2xl p-5 shadow-lg col-span-2 relative overflow-hidden group hover:shadow-glow transition-all duration-300">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-300 text-sm font-medium">Current Mood</p>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold text-white">{mood}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-lg shadow-md">
                <FaceSmileIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Mood Progress Bar - with glow effect */}
            <div className="w-full bg-gray-700/50 rounded-full h-3 mb-1 overflow-hidden shadow-inner mt-auto">
              <div
                className={`h-3 rounded-full ${moodColor} relative`}
                style={{ width: `${moodScore}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Last Entry Card (optional) */}
        {lastEntry && (
          <div className="glass rounded-2xl p-5 shadow-lg col-span-2 md:col-span-4 relative overflow-hidden group hover:shadow-glow transition-all duration-300">
            <div className="absolute left-0 top-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-all duration-500"></div>

            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-gray-300 text-sm font-medium">Last Entry</p>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-medium text-white">{lastEntry}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 rounded-lg shadow-md">
                <CalendarIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
