import React from 'react';
import { Camera } from 'lucide-react';
import type { Profile } from '../../types/database';

interface ProfileHeaderProps {
  profile: Profile;
  onUploadPhoto: () => void;
}

export function ProfileHeader({ profile, onUploadPhoto }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={profile.avatar_url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=192&h=192'}
          alt={profile.full_name || 'Profile'}
          className="w-full h-full object-cover"
        />
      </div>
      <button
        onClick={onUploadPhoto}
        className="flex items-center text-blue-600 hover:text-blue-700"
      >
        <Camera className="w-4 h-4 mr-2" />
        Upload a New Photo
      </button>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
        <p className="text-gray-600">ID: {profile.gms_id}</p>
      </div>
    </div>
  );
}