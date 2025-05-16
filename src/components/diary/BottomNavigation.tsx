"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface BottomNavigationProps {
  className?: string;
}

export default function BottomNavigation({ className = "" }: BottomNavigationProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/diary',
      icon: '🏠',
    },
    {
      label: 'Search',
      href: '/diary/search',
      icon: '🔍',
    },
    {
      label: 'New Entry',
      href: '/diary/new',
      icon: '🎤',
    },
    {
      label: 'Timeline',
      href: '/diary/timeline',
      icon: '📆',
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: '👤',
    },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 shadow-lg z-50 ${className}`}>
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300'
              }`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
