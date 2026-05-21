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

  // Mood color mapping for border and gradients
  const moodStyles = {
    happy: {
      border: 'border-green-500/20',
      gradient: 'from-green-500/10 to-green-600/5',
      shadow: 'shadow-green-500/10',
      icon: 'bg-gradient-to-br from-green-400 to-green-500'
    },
    neutral: {
      border: 'border-blue-500/20',
      gradient: 'from-blue-500/10 to-blue-600/5',
      shadow: 'shadow-blue-500/10',
      icon: 'bg-gradient-to-br from-blue-400 to-blue-500'
    },
    sad: {
      border: 'border-blue-500/20',
      gradient: 'from-blue-500/10 to-blue-600/5',
      shadow: 'shadow-blue-500/10',
      icon: 'bg-gradient-to-br from-blue-400 to-blue-500'
    },
    anxious: {
      border: 'border-amber-500/20',
      gradient: 'from-amber-500/10 to-amber-600/5',
      shadow: 'shadow-amber-500/10',
      icon: 'bg-gradient-to-br from-amber-400 to-amber-500'
    },
    excited: {
      border: 'border-purple-500/20',
      gradient: 'from-purple-500/10 to-purple-600/5',
      shadow: 'shadow-purple-500/10',
      icon: 'bg-gradient-to-br from-purple-400 to-purple-500'
    },
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
      <div className={`glass bg-gradient-to-br ${moodStyles[mood].gradient} border ${moodStyles[mood].border} rounded-2xl p-5 mb-4 hover:bg-gray-800/60 transition-all duration-300 shadow-lg hover:${moodStyles[mood].shadow} group`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:gradient-text transition-all duration-300">{title}</h3>
          <div className={`${moodStyles[mood].icon} p-2 rounded-lg shadow-md`}>
            {moodIcon[mood]}
          </div>
        </div>

        <p className="text-gray-300 mb-5 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
          {truncatedContent}
        </p>

        <div className="flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center text-gray-400 space-x-4 group-hover:text-gray-300 transition-colors duration-300">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1.5" />
              <span>{formattedTime}</span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex items-center mt-2 sm:mt-0">
              <TagIcon className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-gray-300 transition-colors duration-300" />
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-gray-700/50 group-hover:bg-gray-700/80 rounded-full text-xs text-gray-300 group-hover:text-white transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="px-2.5 py-0.5 bg-gray-700/50 group-hover:bg-gray-700/80 rounded-full text-xs text-gray-300 group-hover:text-white transition-all duration-300">
                    +{tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          <ChevronRightIcon className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 ml-auto hidden sm:block transition-colors duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
