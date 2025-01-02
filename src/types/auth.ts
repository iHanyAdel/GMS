export type Role = 'athlete' | 'coach' | 'referee' | 'official' | 'staff';
export type MembershipType = 'minor' | 'cadet' | 'junior' | 'senior';

export interface Province {
  id: string;
  name: string;
}

export interface Club {
  id: string;
  name: string;
  provinceId: string;
}