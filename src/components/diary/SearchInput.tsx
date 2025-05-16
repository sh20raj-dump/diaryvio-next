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
        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl shadow-inner overflow-hidden group focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
          {/* Left icon */}
          <div className="pl-4 pr-2">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-400" />
          </div>

          {/* Input field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full py-3 px-2 text-white bg-transparent outline-none placeholder-gray-500"
          />

          {/* Voice button */}
          {showVoiceButton && (
            <button
              type="button"
              className="p-3 text-gray-400 hover:text-indigo-400 transition-colors"
              aria-label="Voice search"
            >
              <MicrophoneIcon className="w-5 h-5" />
            </button>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className={`p-3 transition-colors flex items-center justify-center w-10
              ${loading || !query.trim()
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            aria-label="Search"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
            ) : (
              <ArrowRightIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
