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

interface DiaryEntryProps {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: 'happy' | 'neutral' | 'sad' | 'anxious' | 'excited';
  tags?: string[];
  className?: string;
}

export default function DiaryEntry({
  id,
  title,
  content,
  date,
  mood = 'neutral',
  tags = [],
  className = "",
}: DiaryEntryProps) {
  // Format date
  const entryDate = new Date(date);
  const formattedDate = entryDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
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

  // Mood color mapping for border
  const moodBorderColor = {
    happy: 'border-green-500/20',
    neutral: 'border-blue-500/20',
    sad: 'border-blue-500/20',
    anxious: 'border-amber-500/20',
    excited: 'border-purple-500/20',
  };

  // Truncate content for preview
  const truncatedContent = content.length > 150
    ? content.substring(0, 150) + '...'
    : content;

  return (
    <Link
      href={`/diary/entry/${id}`}
      className={className}
    >
      <div className={`bg-gray-800 border ${moodBorderColor[mood]} rounded-xl p-4 mb-4 hover:bg-gray-750 transition-colors shadow-md`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="flex items-center">
            {moodIcon[mood]}
          </div>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">
          {truncatedContent}
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

          {tags.length > 0 && (
            <div className="flex items-center mt-2 sm:mt-0">
              <TagIcon className="w-4 h-4 mr-1 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">
                    +{tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          <ChevronRightIcon className="w-5 h-5 text-gray-500 ml-auto hidden sm:block" />
        </div>
      </div>
    </Link>
  );
}
