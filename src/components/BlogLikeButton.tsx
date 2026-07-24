import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const getSessionId = () => {
  let id = localStorage.getItem("blog_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("blog_session_id", id);
  }
  return id;
};

const BlogLikeButton = ({ postId }: { postId: string }) => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const sessionId = getSessionId();

  const fetch = async () => {
    const [{ count: total }, { data: mine }] = await Promise.all([
      supabase.from("blog_likes").select("*", { count: "exact", head: true }).eq("post_id", postId),
      supabase.from("blog_likes").select("id").eq("post_id", postId).eq("session_id", sessionId).maybeSingle(),
    ]);
    setCount(total || 0);
    setLiked(!!mine);
  };

  useEffect(() => {
    fetch();

    const channel = supabase
      .channel(`likes-${postId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_likes", filter: `post_id=eq.${postId}` }, () => {
        fetch();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [postId]);

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    if (liked) {
      await supabase.from("blog_likes").delete().eq("post_id", postId).eq("session_id", sessionId);
    } else {
      await supabase.from("blog_likes").insert({ post_id: postId, session_id: sessionId });
    }
    await fetch();
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all text-sm font-medium",
        liked
          ? "bg-destructive/10 border-destructive/30 text-destructive"
          : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Heart size={16} className={cn(liked && "fill-current")} />
      {count}
    </button>
  );
};

export default BlogLikeButton;
