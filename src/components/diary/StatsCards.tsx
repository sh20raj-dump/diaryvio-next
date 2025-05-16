"use client";

import React from 'react';
import { 
  FireIcon, 
  BookOpenIcon, 
  FaceSmileIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';

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

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Your Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Streak</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-white">{streak}</span>
                <span className="ml-1 text-gray-400 text-sm">days</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-red-600 p-2 rounded-lg">
              <FireIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        {/* Total Entries Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Entries</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-white">{totalEntries}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        {/* Mood Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md col-span-2">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-gray-400 text-sm mb-1">Current Mood</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-white">{mood}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
              <FaceSmileIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* Mood Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
            <div 
              className={`h-2.5 rounded-full ${moodColor}`} 
              style={{ width: `${moodScore}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        {/* Last Entry Card (optional) */}
        {lastEntry && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md col-span-2 md:col-span-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Last Entry</p>
                <div className="flex items-baseline">
                  <span className="text-lg font-medium text-white">{lastEntry}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
