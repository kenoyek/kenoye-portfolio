import type { ProjectOutcome } from "@/content/projects";

type ProjectOutcomeListProps = {
  outcomes?: ProjectOutcome[];
};

export const ProjectOutcomeList = ({ outcomes }: ProjectOutcomeListProps) => {
  if (!outcomes?.length) return null;

  return (
    <ul className="space-y-2">
      {outcomes.map((outcome) => (
        <li key={outcome.label} className="flex gap-2 text-sm text-muted-foreground">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>
            {outcome.label}
            {outcome.detail && <span className="text-foreground/70"> - {outcome.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
};

