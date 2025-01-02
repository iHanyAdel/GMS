import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardWidgetProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
}

export function DashboardWidget({ icon: Icon, title, onClick }: DashboardWidgetProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center justify-center space-y-3 w-full"
    >
      <Icon className="h-8 w-8 text-blue-500" />
      <span className="text-gray-700 font-medium text-sm text-center">{title}</span>
    </button>
  );
}