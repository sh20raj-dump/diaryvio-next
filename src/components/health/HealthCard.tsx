import React from 'react';

interface HealthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  gradient?: string;
  className?: string;
}

export default function HealthCard({
  title,
  subtitle,
  children,
  gradient = "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
  className = "",
}: HealthCardProps) {
  return (
    <div 
      className={`rounded-3xl overflow-hidden shadow-lg ${className}`}
    >
      <div className={`bg-gradient-to-br ${gradient} p-6 h-full`}>
        <div className="flex flex-col h-full">
          <div className="mb-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
          </div>
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
