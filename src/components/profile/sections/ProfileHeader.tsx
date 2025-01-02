import React from 'react';
import { ProfileInfo } from '../widgets/ProfileInfo';
import { CoachLevels } from '../../dashboard/CoachLevels';
import { ProfileNavigation } from '../ProfileNavigation';
import type { Profile } from '../../../types/database';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const mockCoachLevels = [
    { club: 'YMA Mansoura', role: 'Coach' },
    { club: 'Al Hawar Club', role: 'Coach' }
  ];

  return (
    <section className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInfo profile={profile} />
          <CoachLevels levels={mockCoachLevels} />
        </div>
      </div>
      <ProfileNavigation />
    </section>
  );
}