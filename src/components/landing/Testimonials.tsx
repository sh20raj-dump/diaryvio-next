"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    content: "DiaryVio has completely transformed how I journal. Speaking my thoughts feels so much more natural than typing, and the AI companion offers insights I never would have considered on my own.",
    author: "Sarah J.",
    role: "Daily Journaler",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    content: "As someone who's always struggled to maintain a journaling habit, the voice feature has been a game-changer. I can record entries while walking or before bed without staring at a screen.",
    author: "Michael T.",
    role: "Busy Professional",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    content: "The memory search is incredible. I asked 'When did I last feel really proud of myself?' and it found entries from months ago that I'd completely forgotten about. It's like having a personal historian.",
    author: "Aisha K.",
    role: "Creative Writer",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
  },
  {
    id: 4,
    content: "I recommend DiaryVio to all my therapy clients as a complement to our sessions. The AI companion provides daily support, and clients bring insights from their journals to our discussions.",
    author: "Dr. James L.",
    role: "Therapist",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 5,
    content: "The emotional intelligence of the AI companion is remarkable. It knows when to ask deeper questions, when to just listen, and when to offer encouragement. It feels like talking to a friend who really gets me.",
    author: "Elena R.",
    role: "Mental Health Advocate",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Join thousands of people who have transformed their journaling experience with DiaryVio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-10 mb-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-6xl text-indigo-200 dark:text-indigo-900">"</div>
            <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-6 relative z-10">
              {testimonials[activeIndex].content}
            </blockquote>
            <div className="flex items-center">
              <img
                src={testimonials[activeIndex].avatar}
                alt={testimonials[activeIndex].author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  {testimonials[activeIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial navigation */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex
                    ? "bg-indigo-600 dark:bg-indigo-400"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
