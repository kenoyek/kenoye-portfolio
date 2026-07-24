import { cn } from "@/lib/utils";

type ProjectTechnologyListProps = {
  technologies: string[];
  className?: string;
};

export const ProjectTechnologyList = ({ technologies, className }: ProjectTechnologyListProps) => (
  <p className={cn("text-xs font-mono leading-relaxed text-muted-foreground", className)}>
    {technologies.join(" / ")}
  </p>
);

