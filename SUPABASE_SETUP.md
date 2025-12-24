# Supabase Setup Instructions

## 1. Installera paketet

Kör detta kommando i terminalen:
```bash
npm install @supabase/supabase-js
```

## 2. Skapa Supabase-projekt

1. Gå till [supabase.com](https://supabase.com) och skapa ett konto/projekt
2. Gå till Project Settings > API
3. Kopiera din **Project URL** och **anon/public key**

## 3. Lägg till miljövariabler

Lägg till dessa i din `.env.local` fil:

```env
NEXT_PUBLIC_SUPABASE_URL=din_project_url_här
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_anon_key_här

# För production, lägg även till:
NEXT_PUBLIC_SITE_URL=https://din-domän.vercel.app

# Eller för Vercel, använd VERCEL_URL (läggs till automatiskt)
```

## 4. Skapa databastabellen

1. Gå till Supabase Dashboard > SQL Editor
2. Kör SQL-koden från filen `supabase-setup.sql`

Eller kopiera den här koden:

```sql
-- Create table for storing short links
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
```

## 5. Testa

Efter installationen:
1. Starta om din dev-server: `npm run dev`
2. Gå till onboarding-sidan och fyll i företagsnamn och Google Reviews-länk
3. Klicka på "Konfigurera mitt system"
4. Data ska sparas i Supabase och du ska redirectas till send-sms-sidan

