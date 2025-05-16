"use client";

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/components/layout/AppLayout';
import SearchInput from '@/components/diary/SearchInput';
import DiaryEntry from '@/components/diary/DiaryEntry';
import AICompanion from '@/components/diary/AICompanion';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search function - in a real app, this would query your database
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock results based on query
      const mockResults = [
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
      ].filter(entry =>
        entry.title.toLowerCase().includes(query.toLowerCase()) ||
        entry.content.toLowerCase().includes(query.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  // Example search suggestions
  const searchExamples = [
    "When did I last feel anxious about work?",
    "Show me entries about my friends",
    "What was I doing last weekend?",
  ];

  return (
    <AppLayout title="Search Memories">
      <div className="space-y-8">
        {/* Search input */}
        <div>
          <SearchInput
            placeholder="Search your memories or ask a question..."
            onSearch={handleSearch}
            loading={isSearching}
          />
          <p className="text-gray-400 mt-2 text-sm">
            Try: "When did I last feel happy?" or "Show me entries about work"
          </p>
        </div>

        {/* Search results or initial state */}
        {searchQuery ? (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
            </h2>

            {isSearching ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((entry) => (
                  <DiaryEntry
                    key={entry.id}
                    id={entry.id}
                    title={entry.title}
                    content={entry.content}
                    date={entry.date}
                    mood={entry.mood}
                    tags={entry.tags}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  No results found for your search. Try different keywords or phrases.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Search your memories</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Ask questions in natural language or search for specific keywords, topics, or emotions.
            </p>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-white mb-4">Try these examples:</h3>
              <ul className="space-y-3">
                {searchExamples.map((example, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSearch(example)}
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                    >
                      {example}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* AI Companion */}
      <AICompanion name="Violet" />
    </AppLayout>
  );
}
