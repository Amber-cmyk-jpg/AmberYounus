-- policies.sql
-- Migration: Row Level Security (RLS) policies for `posts` table
-- Usage: Paste into Supabase SQL editor and Run

-- 1) Enable RLS on the table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 2) Allow inserts only for authenticated users and ensure they set user_id = auth.uid()
CREATE POLICY "Allow insert for authenticated (owner check)" ON posts
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- 3) Allow only the owner to update their posts
CREATE POLICY "Allow owner update" ON posts
FOR UPDATE
USING (user_id = auth.uid());

-- 4) Allow only the owner to delete their posts
CREATE POLICY "Allow owner delete" ON posts
FOR DELETE
USING (user_id = auth.uid());

-- 5) Allow anyone to read posts (change as needed)
CREATE POLICY "Allow select for all" ON posts
FOR SELECT
USING (true);

-- OPTIONAL: If you prefer only authenticated users read posts, use:
-- CREATE POLICY "Allow select for authenticated" ON posts
-- FOR SELECT
-- USING (auth.uid() IS NOT NULL);

-- NOTES:
-- - The INSERT policy requires that the client sets `user_id` to the authenticated user's ID.
-- - Alternatively, you can enforce `user_id` server-side via a trigger in a secure environment.
-- - After running this migration, test by attempting insert/update/delete as different users and as an unauthenticated client.
