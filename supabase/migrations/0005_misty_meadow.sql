/*
  # Add unique constraints for GMS ID and National ID

  1. Changes
    - Add unique constraint for gms_id column
    - Add unique constraint for national_id column

  2. Security
    - No changes to RLS policies
*/

DO $$ 
BEGIN
  -- Add unique constraint for gms_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'profiles_gms_id_key'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_gms_id_key UNIQUE (gms_id);
  END IF;

  -- Add unique constraint for national_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'profiles_national_id_key'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_national_id_key UNIQUE (national_id);
  END IF;
END $$;