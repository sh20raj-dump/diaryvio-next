"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-300 dark:bg-violet-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            DiaryVio
          </h1>
          
          <div className="h-12 md:h-16">
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-slate-700 dark:text-slate-300">
              {typedText}
              {!typingComplete && <span className="inline-block w-1 h-6 ml-1 bg-indigo-500 animate-pulse"></span>}
            </p>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto">
            Document your life through voice, search your memories with natural language, 
            and interact with a personalized AI companion who knows you deeply.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/login"
              className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              href="#features"
              className="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-slate-700 px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🗣️</div>
              <h3 className="text-lg font-semibold mb-2">Voice-to-Text</h3>
              <p className="text-slate-600 dark:text-slate-400">Speak naturally and watch your thoughts transform into beautifully formatted entries.</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🔎</div>
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-slate-600 dark:text-slate-400">Find any memory instantly with AI-powered search that understands context.</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold mb-2">AI Companion</h3>
              <p className="text-slate-600 dark:text-slate-400">Get insights and reflections from an AI that truly understands your journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
