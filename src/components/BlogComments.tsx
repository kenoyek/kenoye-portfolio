import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

const BlogComments = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("blog_comments")
      .select("id, author_name, content, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    setComments(data || []);
  }, [postId]);

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blog_comments", filter: `post_id=eq.${postId}` },
        () => {
          fetchComments();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchComments, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    if (trimmedContent.length > 2000) {
      toast.error("Comment is too long (max 2000 characters)");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("blog_comments").insert({
      post_id: postId,
      author_name: name.trim() || "Anonymous",
      content: trimmedContent,
    });

    if (error) {
      toast.error("Failed to post comment");
    } else {
      setContent("");
      toast.success("Comment posted!");
    }
    setSubmitting(false);
  };

  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
        <MessageCircle size={22} />
        Comments ({comments.length})
      </h2>

      {/* Comment form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-3 rounded-xl border border-border bg-surface/80 p-4 sm:p-5"
      >
        <Input
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="sm:max-w-xs"
        />
        <Textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={2000}
          required
          rows={3}
        />
        <Button
          type="submit"
          disabled={submitting || !content.trim()}
          size="sm"
          className="gap-1.5"
        >
          <Send size={14} />
          {submitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="glass-card p-4">
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-foreground">{c.author_name}</span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(c.created_at), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
            <p className="whitespace-pre-wrap text-sm text-foreground/90">{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogComments;
