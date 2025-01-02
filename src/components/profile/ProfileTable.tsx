import React from 'react';
import type { Profile } from '../../types/database';

interface ProfileTableProps {
  profile: Profile;
}

export function ProfileTable({ profile }: ProfileTableProps) {
  const fields = [
    { label: 'Email', value: profile.email },
    { label: 'First (Given) Name', value: profile.first_name },
    { label: 'Last (Family) Name', value: profile.last_name },
    { label: 'Nick Name', value: profile.nick_name || 'Not Provided' },
    { label: 'Preferred First Name', value: profile.preferred_first_name || 'Not Provided' },
    { label: 'Preferred Last Name', value: profile.preferred_last_name || 'Not Provided' },
    { label: 'Date of Birth', value: profile.date_of_birth },
    { label: 'Gender', value: profile.gender },
    { label: 'Primary Position/Title', value: profile.primary_position || 'Not Provided' },
    { label: 'Secondary Position/Title 1', value: profile.secondary_position_1 || 'Not Provided' },
    { label: 'Secondary Position/Title 2', value: profile.secondary_position_2 || 'Not Provided' },
    { label: 'Secondary Position/Title 3', value: profile.secondary_position_3 || 'Not Provided' },
  ];

  return (
    <div className="overflow-hidden">
      <div className="bg-gray-800 px-4 py-3">
        <h3 className="text-lg font-medium text-gray-200">PRIMARY PROFILE</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {fields.map((field, index) => (
          <div key={index} className="grid grid-cols-2 px-4 py-3 bg-gray-100">
            <div className="text-sm font-medium text-gray-600">{field.label}</div>
            <div className="text-sm text-gray-900">{field.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}