"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlusIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import {
  FaceSmileIcon,
  FaceFrownIcon,
  ExclamationCircleIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import AppLayout from '@/components/layout/AppLayout';
import VoiceInput from '@/components/diary/VoiceInput';

export default function NewVoiceEntryPage() {
  const router = useRouter();
  const [transcript, setTranscript] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad' | 'anxious' | 'excited'>('neutral');
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTranscript = (text: string) => {
    setTranscript(text);

    // Auto-generate a title if none exists
    if (!title && text) {
      const words = text.split(' ').slice(0, 5).join(' ');
      setTitle(words + (words.length < text.length ? '...' : ''));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would save the entry to the database
    console.log('Saving entry:', {
      title,
      content: transcript,
      mood,
      tags,
      date: new Date().toISOString(),
    });

    // Show success notification
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.remove('translate-y-full');
      setTimeout(() => {
        notification.classList.add('translate-y-full');

        // Reset form and redirect
        setTimeout(() => {
          router.push('/diary');
        }, 500);
      }, 2000);
    }
  };

  // Tag input handlers
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  // Mood options with icons
  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: <FaceSmileIcon className="w-5 h-5" /> },
    { value: 'neutral', label: 'Neutral', icon: <FaceSmileIcon className="w-5 h-5" /> },
    { value: 'sad', label: 'Sad', icon: <FaceFrownIcon className="w-5 h-5" /> },
    { value: 'anxious', label: 'Anxious', icon: <ExclamationCircleIcon className="w-5 h-5" /> },
    { value: 'excited', label: 'Excited', icon: <HeartIcon className="w-5 h-5" /> },
  ];

  // Mood color mapping
  const moodColor = {
    happy: 'bg-green-600 hover:bg-green-700 border-green-500',
    neutral: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
    sad: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
    anxious: 'bg-amber-600 hover:bg-amber-700 border-amber-500',
    excited: 'bg-purple-600 hover:bg-purple-700 border-purple-500',
  };

  return (
    <AppLayout title="New Voice Entry">
      <div className="space-y-8">
        {/* Voice input */}
        <VoiceInput onTranscript={handleTranscript} />

        {/* Entry form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entry title"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="content"
              rows={6}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your entry content"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              How are you feeling?
            </label>
            <div className="flex flex-wrap gap-3">
              {moodOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMood(option.value as any)}
                  className={`px-4 py-2 rounded-lg text-white flex items-center ${
                    mood === option.value
                      ? `${moodColor[option.value as keyof typeof moodColor]} ring-2 ring-white`
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-900/50 text-indigo-300 border border-indigo-800/50"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleClose(tag)}
                    className="ml-1 text-indigo-300 hover:text-white"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </span>
              ))}

              {inputVisible ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleInputConfirm())}
                  className="w-24 px-2 py-1 bg-gray-800 border border-gray-700 rounded-full text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <button
                  type="button"
                  onClick={showInput}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-700 border-dashed hover:bg-gray-700"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  New Tag
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!transcript || !title}
            className={`w-full py-4 px-6 rounded-xl text-white flex items-center justify-center ${
              !transcript || !title
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Save Entry
          </button>
        </form>
      </div>

      {/* Success notification */}
      <div
        id="notification"
        className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 transform translate-y-full transition-transform duration-300 flex items-center justify-center"
      >
        <CheckIcon className="w-5 h-5 mr-2" />
        Entry saved successfully!
      </div>
    </AppLayout>
  );
}
