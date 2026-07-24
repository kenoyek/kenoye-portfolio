
-- Comments table for blog posts (anonymous)
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Likes table for blog posts (anonymous, tracked by session/fingerprint)
CREATE TABLE public.blog_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, session_id)
);

-- Enable RLS
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can read comments
CREATE POLICY "Anyone can view comments" ON public.blog_comments FOR SELECT USING (true);

-- Anyone can insert comments
CREATE POLICY "Anyone can add comments" ON public.blog_comments FOR INSERT WITH CHECK (true);

-- Anyone can read likes
CREATE POLICY "Anyone can view likes" ON public.blog_likes FOR SELECT USING (true);

-- Anyone can insert likes
CREATE POLICY "Anyone can add likes" ON public.blog_likes FOR INSERT WITH CHECK (true);

-- Anyone can delete their own like (by session_id)
CREATE POLICY "Anyone can remove their like" ON public.blog_likes FOR DELETE USING (true);

-- Authenticated users can delete comments (admin moderation)
CREATE POLICY "Authenticated users can delete comments" ON public.blog_comments FOR DELETE USING (auth.uid() IS NOT NULL);

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_likes;
