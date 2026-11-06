-- Paste and run this ENTIRE file in the NEW project's SQL Editor.
-- It creates missing tables first and preserves existing rows on repeat runs.
BEGIN;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace
                 WHERE n.nspname = 'public' AND t.typname = 'blog_post_status') THEN
    CREATE TYPE public.blog_post_status AS ENUM ('draft', 'scheduled', 'published');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL DEFAULT '',
  excerpt text,
  cover_image_url text,
  status public.blog_post_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  author_name text NOT NULL DEFAULT 'Okagua',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT 'Anonymous',
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, session_id)
);

CREATE TABLE IF NOT EXISTS public.blog_admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_admins ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT SELECT, INSERT ON public.blog_comments TO anon, authenticated;
GRANT DELETE ON public.blog_comments TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.blog_likes TO anon, authenticated;
GRANT SELECT ON public.blog_admins TO authenticated;

DROP POLICY IF EXISTS "Admins can read their own membership" ON public.blog_admins;
CREATE POLICY "Admins can read their own membership" ON public.blog_admins
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can view published posts" ON public.blog_posts;
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (status = 'published' AND published_at <= now());

DROP POLICY IF EXISTS "Authenticated users can manage all posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Approved admins manage posts" ON public.blog_posts;
CREATE POLICY "Approved admins manage posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.blog_admins WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.blog_admins WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Anyone can view comments" ON public.blog_comments;
CREATE POLICY "Anyone can view comments" ON public.blog_comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can add comments" ON public.blog_comments;
CREATE POLICY "Anyone can add comments" ON public.blog_comments FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated users can delete comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Approved admins moderate comments" ON public.blog_comments;
CREATE POLICY "Approved admins moderate comments" ON public.blog_comments
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.blog_admins WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Anyone can view likes" ON public.blog_likes;
CREATE POLICY "Anyone can view likes" ON public.blog_likes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can add likes" ON public.blog_likes;
CREATE POLICY "Anyone can add likes" ON public.blog_likes FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can remove their like" ON public.blog_likes;
CREATE POLICY "Anyone can remove their like" ON public.blog_likes FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_posts_updated_at();

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime' AND NOT puballtables) THEN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'blog_comments') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_comments;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'blog_likes') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_likes;
    END IF;
  END IF;
END $$;

COMMIT;

-- This result should show all four tables. Do not run only a selected fragment.
SELECT to_regclass('public.blog_posts') AS posts,
       to_regclass('public.blog_comments') AS comments,
       to_regclass('public.blog_likes') AS likes,
       to_regclass('public.blog_admins') AS admins;
