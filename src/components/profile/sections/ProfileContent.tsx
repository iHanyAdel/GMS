import React from 'react';
import { ProfileActions } from '../ProfileActions';
import { ProfileTable } from '../ProfileTable';
import type { Profile } from '../../../types/database';

interface ProfileContentProps {
  profile: Profile;
}

export function ProfileContent({ profile }: ProfileContentProps) {
  return (
    <section className="bg-white rounded-lg p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Summary</h1>
      <ProfileActions />
      <ProfileTable profile={profile} />
    </section>
  );
}