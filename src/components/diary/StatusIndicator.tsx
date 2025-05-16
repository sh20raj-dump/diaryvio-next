"use client";

import React from 'react';

type StatusType = 'normal' | 'good' | 'excellent' | 'warning' | 'alert';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  value?: string | number;
  className?: string;
}

export default function StatusIndicator({
  status,
  label,
  value,
  className = "",
}: StatusIndicatorProps) {
  // Define status colors
  const statusConfig = {
    normal: {
      gradient: "from-cyan-200 to-blue-200 dark:from-cyan-900/40 dark:to-blue-900/40",
      textColor: "text-cyan-800 dark:text-cyan-300",
    },
    good: {
      gradient: "from-green-200 to-emerald-200 dark:from-green-900/40 dark:to-emerald-900/40",
      textColor: "text-green-800 dark:text-green-300",
    },
    excellent: {
      gradient: "from-indigo-200 to-purple-200 dark:from-indigo-900/40 dark:to-purple-900/40",
      textColor: "text-indigo-800 dark:text-indigo-300",
    },
    warning: {
      gradient: "from-yellow-200 to-amber-200 dark:from-yellow-900/40 dark:to-amber-900/40",
      textColor: "text-amber-800 dark:text-amber-300",
    },
    alert: {
      gradient: "from-red-200 to-rose-200 dark:from-red-900/40 dark:to-rose-900/40",
      textColor: "text-rose-800 dark:text-rose-300",
    },
  };

  const { gradient, textColor } = statusConfig[status];

  return (
    <div className={`rounded-2xl overflow-hidden shadow-md ${className}`}>
      <div className={`bg-gradient-to-br ${gradient} p-4`}>
        {label && (
          <div className={`text-sm font-medium ${textColor} mb-1 opacity-80`}>
            {label}
          </div>
        )}
        {value !== undefined && (
          <div className={`text-2xl font-bold ${textColor}`}>
            {value}
          </div>
        )}
      </div>
    </div>
  );
}
