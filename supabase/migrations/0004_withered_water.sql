/*
  # Update RLS policies for profiles

  1. Changes
    - Add policy to allow profile creation during signup
    - Modify existing policies to be more permissive for new users
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can read their own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
END $$;

-- Create new policies
CREATE POLICY "Enable insert for authentication"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable read access for users"
  ON profiles
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Enable update for users based on user_id"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);