"use client";

import React, { useState } from 'react';
import { MagnifyingGlassIcon, MicrophoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  showVoiceButton?: boolean;
  loading?: boolean;
}

export default function SearchInput({
  placeholder = "How do I stop poor sleep habits?",
  onSearch,
  className = "",
  showVoiceButton = true,
  loading = false,
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-full shadow-inner overflow-hidden group focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all duration-300 hover:bg-gray-800/90">
          {/* Left icon with gradient background */}
          <div className="pl-4 pr-2">
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-1.5 rounded-full group-focus-within:from-indigo-500/30 group-focus-within:to-purple-500/30 transition-all duration-300">
              <MagnifyingGlassIcon className="w-5 h-5 text-indigo-400 group-focus-within:text-indigo-300" />
            </div>
          </div>

          {/* Input field with improved styling */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full py-4 px-2 text-white bg-transparent outline-none placeholder-gray-400 font-medium"
          />

          {/* Voice button with animated hover effect */}
          {showVoiceButton && (
            <button
              type="button"
              className="p-3 text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:scale-110"
              aria-label="Voice search"
            >
              <div className="bg-gray-700/50 hover:bg-gray-700 p-1.5 rounded-full transition-colors duration-300">
                <MicrophoneIcon className="w-5 h-5" />
              </div>
            </button>
          )}

          {/* Submit button with gradient and improved styling */}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className={`p-4 transition-all duration-300 flex items-center justify-center w-14
              ${loading || !query.trim()
                ? 'bg-gray-700/70 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500'
              }`}
            aria-label="Search"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
            ) : (
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Subtle hint text */}
        <p className="text-xs text-gray-500 mt-2 ml-4 hidden md:block">
          Try: "How did I feel last week?" or "Show entries about work"
        </p>
      </form>
    </div>
  );
}
