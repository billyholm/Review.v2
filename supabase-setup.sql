-- Create table for storing short links
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS short_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  business_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_short_links_slug ON short_links(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE short_links ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read (for redirects)
CREATE POLICY "Allow public read access" ON short_links
  FOR SELECT
  USING (true);

-- Create policy to allow inserts (you may want to restrict this later)
CREATE POLICY "Allow public insert" ON short_links
  FOR INSERT
  WITH CHECK (true);

