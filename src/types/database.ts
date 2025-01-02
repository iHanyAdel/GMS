export interface Profile {
  id: string;
  user_id: string;
  member_id: string;
  full_name: string | null;
  role: 'coach' | 'athlete';
  club_id: string;
  gms_id: string;
  created_at: string;
  updated_at: string;
}

export interface Club {
  id: string;
  name: string;
  province_id: string;
}

export interface Team {
  id: string;
  name: string;
  coach_id: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  athlete_id: string;
  joined_at: string;
}

export interface IdSequence {
  name: string;
  last_value: number;
}