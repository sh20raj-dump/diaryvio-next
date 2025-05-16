"use client";

import React from 'react';
import Link from 'next/link';
import { 
  CalendarIcon, 
  ClockIcon, 
  TagIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import {
  FaceSmileIcon,
  FaceFrownIcon,
  ExclamationCircleIcon,
  HeartIcon
} from '@heroicons/react/24/solid';

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

interface TimelineViewProps {
  data: TimelineData;
}

export default function TimelineView({ data }: TimelineViewProps) {
  // Mood icon mapping
  const moodIcon = {
    happy: <FaceSmileIcon className="w-5 h-5 text-green-400" />,
    neutral: <FaceSmileIcon className="w-5 h-5 text-blue-400" />,
    sad: <FaceFrownIcon className="w-5 h-5 text-blue-400" />,
    anxious: <ExclamationCircleIcon className="w-5 h-5 text-amber-400" />,
    excited: <HeartIcon className="w-5 h-5 text-purple-400" />,
  };
  
  // Mood color mapping for border
  const moodBorderColor = {
    happy: 'border-green-500/20',
    neutral: 'border-blue-500/20',
    sad: 'border-blue-500/20',
    anxious: 'border-amber-500/20',
    excited: 'border-purple-500/20',
  };
  
  // Mood color mapping for timeline dot
  const moodDotColor = {
    happy: 'bg-green-500',
    neutral: 'bg-blue-500',
    sad: 'bg-blue-500',
    anxious: 'bg-amber-500',
    excited: 'bg-purple-500',
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
      
      {/* Timeline entries */}
      <div className="space-y-12">
        {Object.entries(data).map(([month, entries]) => (
          <div key={month} className="relative">
            {/* Month label */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center z-10">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold ml-4 text-white">
                {month}
              </h2>
            </div>
            
            {/* Entries for this month */}
            <div className="space-y-6 ml-8 pl-8">
              {entries.map((entry) => {
                // Format date
                const entryDate = new Date(entry.date);
                const formattedDate = entryDate.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                });
                
                const formattedTime = entryDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                
                return (
                  <div key={entry.id} className="relative">
                    {/* Date dot */}
                    <div className={`absolute -left-12 top-6 w-4 h-4 rounded-full ${moodDotColor[entry.mood]} z-10`}></div>
                    
                    {/* Entry card */}
                    <Link href={`/diary/entry/${entry.id}`}>
                      <div className={`bg-gray-800 border ${moodBorderColor[entry.mood]} rounded-xl p-4 hover:bg-gray-750 transition-colors shadow-md`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
                          <div className="flex items-center">
                            {moodIcon[entry.mood]}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {entry.content}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-between text-sm">
                          <div className="flex items-center text-gray-400 space-x-4">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              <span>{formattedTime}</span>
                            </div>
                          </div>
                          
                          {entry.tags.length > 0 && (
                            <div className="flex items-center mt-2 sm:mt-0">
                              <TagIcon className="w-4 h-4 mr-1 text-gray-400" />
                              <div className="flex flex-wrap gap-1">
                                {entry.tags.slice(0, 2).map((tag) => (
                                  <span 
                                    key={tag}
                                    className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {entry.tags.length > 2 && (
                                  <span className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">
                                    +{entry.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <ChevronRightIcon className="w-5 h-5 text-gray-500 ml-auto hidden sm:block" />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
