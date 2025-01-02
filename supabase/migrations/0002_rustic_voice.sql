/*
  # Add Member ID System
  
  1. New Tables
    - `id_sequences`
      - `name` (text, primary key) - Sequence identifier
      - `last_value` (integer) - Last used number in sequence
      
  2. Changes
    - Add `member_id` column to profiles table
    - Create function to generate next member ID
    
  3. Security
    - Enable RLS on id_sequences table
    - Add policy for authenticated users
*/

-- Create sequence table
CREATE TABLE IF NOT EXISTS id_sequences (
  name text PRIMARY KEY,
  last_value integer NOT NULL DEFAULT 999
);

-- Insert initial sequence
INSERT INTO id_sequences (name, last_value)
VALUES ('member_id', 999)
ON CONFLICT (name) DO NOTHING;

-- Create function to generate next member ID
CREATE OR REPLACE FUNCTION generate_member_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  next_val integer;
  result text;
BEGIN
  -- Get and update next value atomically
  UPDATE id_sequences 
  SET last_value = last_value + 1
  WHERE name = 'member_id'
  RETURNING last_value INTO next_val;
  
  -- Format the result
  result := 'ID-' || LPAD(next_val::text, 4, '0');
  
  RETURN result;
END;
$$;

-- Add member_id to profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'member_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN member_id text UNIQUE;
    
    -- Set default for new rows
    ALTER TABLE profiles 
    ALTER COLUMN member_id 
    SET DEFAULT generate_member_id();
  END IF;
END $$;

-- Enable RLS on sequences
ALTER TABLE id_sequences ENABLE ROW LEVEL SECURITY;

-- Add policy for sequences
CREATE POLICY "Allow read access to authenticated users"
  ON id_sequences
  FOR SELECT
  TO authenticated
  USING (true);