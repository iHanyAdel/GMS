/*
  # Add additional profile fields

  1. New Fields
    - Add club_id, province_id, gms_id, national_id, date_of_birth, gender, membership_type fields to profiles table
    - Add newsletter subscription field

  2. Changes
    - Add constraints and validations for new fields
*/

DO $$ 
BEGIN
  -- Add new columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'club_id') THEN
    ALTER TABLE profiles ADD COLUMN club_id text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'province_id') THEN
    ALTER TABLE profiles ADD COLUMN province_id text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'gms_id') THEN
    ALTER TABLE profiles ADD COLUMN gms_id text UNIQUE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'national_id') THEN
    ALTER TABLE profiles ADD COLUMN national_id text UNIQUE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'date_of_birth') THEN
    ALTER TABLE profiles ADD COLUMN date_of_birth date;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'gender') THEN
    ALTER TABLE profiles ADD COLUMN gender text CHECK (gender IN ('male', 'female'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'membership_type') THEN
    ALTER TABLE profiles ADD COLUMN membership_type text CHECK (membership_type IN ('minor', 'cadet', 'junior', 'senior'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'newsletter') THEN
    ALTER TABLE profiles ADD COLUMN newsletter boolean DEFAULT false;
  END IF;
END $$;