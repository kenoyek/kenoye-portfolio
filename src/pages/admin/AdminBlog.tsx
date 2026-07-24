import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, LogOut, Eye } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const statusColor: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-yellow-500/20 text-yellow-700",
  published: "bg-accent/20 text-accent",
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, status, published_at, created_at, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading posts", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Post deleted" });
      fetchPosts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="font-heading text-xl font-bold text-foreground">Blog Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/admin/blog/new"><Plus size={16} /> New Post</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-4">No blog posts yet</p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/admin/blog/new"><Plus size={16} /> Create your first post</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between bg-card border border-border rounded-xl px-5 py-4 hover:shadow-md transition-shadow">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-heading font-semibold text-foreground truncate">{post.title}</h2>
                    <Badge className={`text-xs ${statusColor[post.status] || ""}`}>{post.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Updated {format(new Date(post.updated_at), "MMM d, yyyy")}
                    {post.published_at && ` · Published ${format(new Date(post.published_at), "MMM d, yyyy")}`}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  {post.status === "published" && (
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/blog/${post.slug}`} target="_blank"><Eye size={16} /></Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/admin/blog/edit/${post.id}`}><Edit size={16} /></Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id, post.title)}>
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBlog;
