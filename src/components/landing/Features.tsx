"use client";

import { useState } from "react";
import Image from "next/image";

const features = [
  {
    id: "voice",
    icon: "🎤",
    title: "Voice-to-Text Diary",
    description: "Record your daily thoughts and experiences using your voice, with advanced transcription that captures your tone and emotion.",
    details: "Our voice recognition technology is optimized for personal journaling, understanding context and formatting your entries beautifully. Speak naturally and watch your thoughts transform into organized, searchable text.",
  },
  {
    id: "search",
    icon: "🔎",
    title: "Memory Search",
    description: "Find specific memories with natural language queries like 'When did I first meet Sara?' or 'What was I feeling last Christmas?'",
    details: "DiaryVio's semantic search understands the meaning behind your questions, not just keywords. It connects related memories and provides context-aware results that help you rediscover your past experiences.",
  },
  {
    id: "companion",
    icon: "🧑‍🤝",
    title: "AI Best Friend",
    description: "Your personalized AI companion learns about you over time and provides emotional support tailored to your personality.",
    details: "Unlike generic AI assistants, your DiaryVio companion builds a deep understanding of your life story, preferences, and emotional patterns. It offers perspective, encouragement, and a judgment-free space for reflection.",
  },
  {
    id: "mood",
    icon: "😊",
    title: "Mood-Adaptive Responses",
    description: "AI adapts its tone and support based on your emotional state, providing the right kind of encouragement when you need it.",
    details: "Through voice analysis and natural language processing, DiaryVio detects subtle emotional cues in your entries. Your companion responds with appropriate empathy, celebration, or gentle guidance based on your current mood.",
  },
  {
    id: "markdown",
    icon: "📖",
    title: "Markdown Journal Support",
    description: "Write traditional text entries with markdown formatting when you prefer typing over speaking.",
    details: "Our beautiful markdown editor gives you full control over your journal's appearance. Add headings, lists, emphasis, and more to create richly formatted entries that express exactly what you want to say.",
  },
  {
    id: "timeline",
    icon: "📆",
    title: "Timeline View",
    description: "See your life journey with a chronological view of all entries, complete with mood indicators and memory highlights.",
    details: "Visualize your personal growth and life patterns with our interactive timeline. Filter by emotion, topic, or time period to gain insights into your experiences and see how far you've come.",
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            DiaryVio combines cutting-edge AI with intuitive design to create a journaling experience unlike any other.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature tabs */}
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === feature.id
                    ? "bg-white dark:bg-slate-800 shadow-lg"
                    : "bg-transparent hover:bg-white/50 dark:hover:bg-slate-800/50"
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                    {activeFeature === feature.id && (
                      <p className="mt-3 text-indigo-600 dark:text-indigo-400">
                        {feature.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature illustration */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl">
            <div className="aspect-video relative bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">{features.find(f => f.id === activeFeature)?.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                  {features.find(f => f.id === activeFeature)?.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {features.find(f => f.id === activeFeature)?.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
