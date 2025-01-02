import React from 'react';
import { ProfileHeader } from './sections/ProfileHeader';
import { ProfileContent } from './sections/ProfileContent';
import type { Profile } from '../../types/database';

interface ProfileLayoutProps {
  profile: Profile;
}

export function ProfileLayout({ profile }: ProfileLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <ProfileHeader profile={profile} />
      <ProfileContent profile={profile} />
    </div>
  );
}