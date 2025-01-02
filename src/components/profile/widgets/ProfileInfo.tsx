import React from 'react';
import { Camera } from 'lucide-react';
import type { Profile } from '../../../types/database';

interface ProfileInfoProps {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col items-start space-y-4">
        <div className="relative">
          <img
            src={profile.avatar_url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=192&h=192'}
            alt={profile.full_name || ''}
            className="w-32 h-32 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-sm hover:bg-gray-50">
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="text-left">
          <h2 className="text-xl font-bold text-emerald-600">{profile.full_name}</h2>
          <p className="text-gray-600">ID: {profile.gms_id}</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Upload a New Photo
        </button>
      </div>
    </div>
  );
}