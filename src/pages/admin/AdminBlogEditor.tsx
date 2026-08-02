import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  ArrowLeft,
  Save,
  Send,
  Clock,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Quote,
  Code,
  Minus,
  Code2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const AdminBlogEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [htmlMode, setHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: { HTMLAttributes: { class: "blog-code-block" } },
      }),
      LinkExt.configure({ openOnClick: false }),
      Image,
      Underline,
      Placeholder.configure({ placeholder: "Start writing your post…" }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "blog-content min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (isEditing) {
      supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            toast({ title: "Post not found", variant: "destructive" });
            navigate("/admin/blog");
            return;
          }
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt || "");
          setCoverImageUrl(data.cover_image_url || "");
          if (data.status === "scheduled" && data.published_at) {
            setScheduledDate(new Date(data.published_at));
          }
          setSlugManuallyEdited(true);
          editor?.commands.setContent(data.content || "");
        });
    }
  }, [id, editor, isEditing, navigate, toast]);

  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  const toggleHtmlMode = () => {
    if (htmlMode) {
      // Switching from HTML to rich text
      editor?.commands.setContent(rawHtml);
    } else {
      // Switching from rich text to HTML
      setRawHtml(editor?.getHTML() || "");
    }
    setHtmlMode(!htmlMode);
  };

  const getContent = useCallback(
    () => (htmlMode ? rawHtml : editor?.getHTML() || ""),
    [editor, htmlMode, rawHtml],
  );

  const savePost = useCallback(
    async (status: "draft" | "scheduled" | "published") => {
      if (!title.trim()) {
        toast({ title: "Title is required", variant: "destructive" });
        return;
      }
      setSaving(true);

      const postData = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        content: getContent(),
        excerpt: excerpt.trim() || null,
        cover_image_url: coverImageUrl.trim() || null,
        status,
        published_at:
          status === "published"
            ? new Date().toISOString()
            : status === "scheduled" && scheduledDate
              ? scheduledDate.toISOString()
              : null,
      };

      let error;
      if (isEditing) {
        ({ error } = await supabase.from("blog_posts").update(postData).eq("id", id));
      } else {
        ({ error } = await supabase.from("blog_posts").insert(postData));
      }

      if (error) {
        toast({ title: "Save failed", description: error.message, variant: "destructive" });
      } else {
        toast({
          title:
            status === "published"
              ? "Published!"
              : status === "scheduled"
                ? "Scheduled!"
                : "Draft saved",
        });
        navigate("/admin/blog");
      }
      setSaving(false);
    },
    [
      title,
      slug,
      excerpt,
      coverImageUrl,
      getContent,
      scheduledDate,
      isEditing,
      id,
      navigate,
      toast,
    ],
  );

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`h-8 w-8 ${active ? "bg-accent text-accent-foreground" : ""}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/blog")}>
            <ArrowLeft size={16} /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => savePost("draft")} disabled={saving}>
              <Save size={14} /> Draft
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" disabled={saving}>
                  <Clock size={14} /> Schedule
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={(date) => {
                    setScheduledDate(date);
                    if (date) savePost("scheduled");
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => savePost("published")}
              disabled={saving}
            >
              <Send size={14} /> Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="font-heading text-lg font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManuallyEdited(true);
              }}
              placeholder="post-url-slug"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL</Label>
            <Input
              id="cover"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary of the post..."
            rows={2}
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-border bg-card px-3 py-2">
          {!htmlMode && (
            <>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                active={editor?.isActive("bold")}
                title="Bold"
              >
                <Bold size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                active={editor?.isActive("italic")}
                title="Italic"
              >
                <Italic size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                active={editor?.isActive("underline")}
                title="Underline"
              >
                <UnderlineIcon size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                active={editor?.isActive("strike")}
                title="Strikethrough"
              >
                <Strikethrough size={14} />
              </ToolbarButton>
              <div className="mx-1 h-5 w-px bg-border" />
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor?.isActive("heading", { level: 1 })}
                title="Heading 1"
              >
                <Heading1 size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor?.isActive("heading", { level: 2 })}
                title="Heading 2"
              >
                <Heading2 size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor?.isActive("heading", { level: 3 })}
                title="Heading 3"
              >
                <Heading3 size={14} />
              </ToolbarButton>
              <div className="mx-1 h-5 w-px bg-border" />
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                active={editor?.isActive("bulletList")}
                title="Bullet List"
              >
                <List size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                active={editor?.isActive("orderedList")}
                title="Ordered List"
              >
                <ListOrdered size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                active={editor?.isActive("blockquote")}
                title="Blockquote"
              >
                <Quote size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                active={editor?.isActive("codeBlock")}
                title="Code Block"
              >
                <Code size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                title="Horizontal Rule"
              >
                <Minus size={14} />
              </ToolbarButton>
              <div className="mx-1 h-5 w-px bg-border" />
              <ToolbarButton onClick={addLink} active={editor?.isActive("link")} title="Add Link">
                <LinkIcon size={14} />
              </ToolbarButton>
              <ToolbarButton onClick={addImage} title="Add Image">
                <ImageIcon size={14} />
              </ToolbarButton>
              <div className="flex-1" />
              <ToolbarButton onClick={() => editor?.chain().focus().undo().run()} title="Undo">
                <Undo size={14} />
              </ToolbarButton>
              <ToolbarButton onClick={() => editor?.chain().focus().redo().run()} title="Redo">
                <Redo size={14} />
              </ToolbarButton>
            </>
          )}
          {htmlMode && <div className="flex-1" />}
          <Button
            type="button"
            variant={htmlMode ? "default" : "outline"}
            size="sm"
            className="h-8 gap-1 text-xs"
            onClick={toggleHtmlMode}
          >
            <Code2 size={14} /> {htmlMode ? "Rich Text" : "HTML"}
          </Button>
        </div>

        <div className="min-h-[300px] rounded-b-xl border border-t-0 border-border bg-card">
          {htmlMode ? (
            <textarea
              value={rawHtml}
              onChange={(e) => setRawHtml(e.target.value)}
              className="min-h-[300px] w-full resize-y bg-transparent p-4 font-mono text-sm text-foreground focus:outline-none"
              placeholder="<p>Write your HTML here...</p>"
              spellCheck={false}
            />
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminBlogEditor;
