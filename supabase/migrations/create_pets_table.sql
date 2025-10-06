/*
  # Create pets table

  1. New Tables
    - `pets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `species` (text)
      - `breed` (text)
      - `age` (integer)
      - `gender` (text)
      - `color` (text)
      - `weight` (numeric)
      - `image_url` (text)
      - `medical_notes` (text)
      - `last_vaccination` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pets` table
    - Add policies for authenticated users to manage their own pets
*/

CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  species text NOT NULL,
  breed text NOT NULL,
  age integer NOT NULL DEFAULT 0,
  gender text NOT NULL,
  color text DEFAULT '',
  weight numeric NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  medical_notes text DEFAULT '',
  last_vaccination date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own pets"
  ON pets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pets"
  ON pets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pets"
  ON pets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pets"
  ON pets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS pets_user_id_idx ON pets(user_id);