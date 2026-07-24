import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "primary";
};

const tones = {
  default: "bg-background text-foreground",
  muted: "bg-muted/30 text-foreground",
  primary: "bg-primary text-primary-foreground",
};

export const Section = ({ children, className, id, tone = "default" }: SectionProps) => (
  <section id={id} className={cn("section-padding", tones[tone], className)}>
    {children}
  </section>
);
