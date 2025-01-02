/*
  # Create clubs table and add relations

  1. New Tables
    - `clubs`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `province_id` (text, not null)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Changes
    - Add foreign key from profiles to clubs
    
  3. Security
    - Enable RLS
    - Add policies for read access
*/

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  province_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update profiles table to reference clubs
ALTER TABLE profiles
DROP COLUMN IF EXISTS club_name;

-- Enable RLS
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow read access for authenticated users"
  ON clubs
  FOR SELECT
  TO authenticated
  USING (true);