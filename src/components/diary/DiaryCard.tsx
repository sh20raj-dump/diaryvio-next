"use client";

import React from 'react';
import Link from 'next/link';

interface DiaryCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  gradient?: string;
  className?: string;
  link?: string;
  icon?: React.ReactNode;
}

export default function DiaryCard({
  title,
  subtitle,
  children,
  gradient = "from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30",
  className = "",
  link,
  icon,
}: DiaryCardProps) {
  const CardContent = () => (
    <div className={`bg-gradient-to-br ${gradient} p-6 h-full`}>
      <div className="flex flex-col h-full">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
          </div>
          {icon && <div className="text-2xl">{icon}</div>}
        </div>
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className={`block rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${className}`}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={`rounded-3xl overflow-hidden shadow-lg ${className}`}>
      <CardContent />
    </div>
  );
}
