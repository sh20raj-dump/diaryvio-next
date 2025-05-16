"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MicrophoneIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Your voice, your story, your AI companion.";
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950 opacity-80"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              DiaryVio
            </h1>

            <div className="h-16 md:h-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white">
                {typedText}
                {!typingComplete && (
                  <span className="inline-block w-1 h-8 ml-1 bg-indigo-400 animate-pulse"></span>
                )}
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-300 my-8 max-w-xl">
              Document your life through voice, search your memories with natural language,
              and interact with a personalized AI companion who knows you deeply.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-10">
              <Link
                href="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center"
              >
                Get Started Free
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/diary"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Try Demo
              </Link>
            </div>
          </div>

          {/* App mockup */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-[320px]">
              {/* Phone frame */}
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-gray-900">
                {/* App screen */}
                <div className="aspect-[9/19] bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                  {/* App content */}
                  <div className="p-4">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-6 text-xs text-gray-400">
                      <div>13:13</div>
                      <div className="flex items-center gap-1">
                        <span>●●●●</span>
                        <span>📶</span>
                      </div>
                    </div>

                    {/* App header */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-1 text-white">Your Journal</h3>
                      <div className="flex items-center">
                        <span className="text-xs px-2 py-0.5 bg-indigo-900/50 text-indigo-300 rounded-full">Voice Diary</span>
                      </div>
                    </div>

                    {/* Search input */}
                    <div className="bg-gray-800 rounded-full shadow-inner p-3 px-4 mb-6 flex items-center text-sm border border-gray-700">
                      <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-400">How was your day?</span>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 p-3 rounded-xl border border-amber-800/30">
                        <div className="text-sm mb-1 text-amber-300/70">Today's mood</div>
                        <div className="text-lg font-semibold text-amber-300">Excited</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-3 rounded-xl border border-blue-800/30">
                        <div className="text-sm mb-1 text-blue-300/70">Streak</div>
                        <div className="text-lg font-semibold text-blue-300">7 days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full opacity-30 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-400 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
              <MicrophoneIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Voice-to-Text</h3>
            <p className="text-gray-300">
              Speak naturally and watch your thoughts transform into beautifully formatted entries.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-400 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Smart Search</h3>
            <p className="text-gray-300">
              Find any memory instantly with AI-powered search that understands context.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
            <div className="bg-gradient-to-br from-violet-600 to-violet-400 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">AI Companion</h3>
            <p className="text-gray-300">
              Get insights and reflections from an AI that truly understands your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
