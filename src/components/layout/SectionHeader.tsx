import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export const SectionHeader = ({ eyebrow, title, description, className }: SectionHeaderProps) => (
  <div className={cn("mb-8 sm:mb-10", className)}>
    {eyebrow && (
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">{eyebrow}</p>
    )}
    <h2 className="mb-3 text-section-title font-bold tracking-normal text-foreground">{title}</h2>
    <div className="mb-4 h-px w-16 bg-border-strong" />
    {description && (
      <p className="max-w-2xl text-body-large text-muted-foreground">{description}</p>
    )}
  </div>
);
