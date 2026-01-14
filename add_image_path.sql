-- add_image_path.sql
-- Adds the missing `image_path` column to the `posts` table
-- Usage: paste into Supabase SQL editor and Run

ALTER TABLE posts
ADD COLUMN IF NOT EXISTS image_path text;

-- Optional: create an index if you plan to query by path
-- CREATE INDEX IF NOT EXISTS idx_posts_image_path ON posts (image_path);

-- After running: reload your frontend (refresh the page or re-deploy) so the schema cache updates.