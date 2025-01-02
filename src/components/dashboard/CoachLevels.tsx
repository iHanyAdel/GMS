import React from 'react';

interface CoachLevel {
  club: string;
  role: string;
}

interface CoachLevelsProps {
  levels: CoachLevel[];
}

export function CoachLevels({ levels }: CoachLevelsProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Coach Levels</h2>
      <div className="space-y-4">
        {levels.map((level, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">{level.club}</span>
            <span className="text-blue-600 font-medium">{level.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}