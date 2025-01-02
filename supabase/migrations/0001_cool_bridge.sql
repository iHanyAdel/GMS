/*
  # Initial Schema Setup for Club Management System

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - full_name (text)
      - role (text)
      - membership_number (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - teams
      - id (uuid, primary key)
      - name (text)
      - coach_id (uuid, references profiles)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - team_members
      - id (uuid, primary key)
      - team_id (uuid, references teams)
      - athlete_id (uuid, references profiles)
      - joined_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for coaches and athletes
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  role text CHECK (role IN ('coach', 'athlete')),
  membership_number text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  coach_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  athlete_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(team_id, athlete_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Teams policies
CREATE POLICY "Coaches can create teams"
  ON teams
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'coach'
    )
  );

CREATE POLICY "Coaches can manage their teams"
  ON teams
  FOR ALL
  USING (coach_id IN (
    SELECT id FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'coach'
  ));

CREATE POLICY "Athletes can view teams they belong to"
  ON teams
  FOR SELECT
  USING (
    id IN (
      SELECT team_id FROM team_members
      WHERE athlete_id IN (
        SELECT id FROM profiles
        WHERE user_id = auth.uid()
      )
    )
  );

-- Team members policies
CREATE POLICY "Coaches can manage team members"
  ON team_members
  FOR ALL
  USING (
    team_id IN (
      SELECT id FROM teams
      WHERE coach_id IN (
        SELECT id FROM profiles
        WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Athletes can view their team memberships"
  ON team_members
  FOR SELECT
  USING (
    athlete_id IN (
      SELECT id FROM profiles
      WHERE user_id = auth.uid()
    )
  );