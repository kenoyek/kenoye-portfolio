import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export const SectionHeader = ({ eyebrow, title, description, className }: SectionHeaderProps) => (
  <div className={cn("mb-8 sm:mb-10", className)}>
    {eyebrow && <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">{eyebrow}</p>}
    <h2 className="text-section-title font-bold tracking-normal text-foreground mb-3">{title}</h2>
    <div className="w-16 h-px bg-border-strong mb-4" />
    {description && <p className="text-body-large text-muted-foreground max-w-2xl">{description}</p>}
  </div>
);

