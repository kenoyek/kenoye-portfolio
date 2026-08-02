const orbitNodes = [
  { label: "Strategy", className: "left-[7%] top-[18%]" },
  { label: "Design", className: "right-[7%] top-[18%]" },
  { label: "Engineering", className: "bottom-[18%] left-[4%]" },
  { label: "Delivery", className: "bottom-[18%] right-[4%]" },
];

export const SignatureOrbit = () => (
  <div
    className="signature-orbit group/orbit relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px]"
    aria-label="Connected product delivery model"
  >
    <svg
      viewBox="0 0 320 320"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Orbit connecting strategy, design, engineering, and delivery"
    >
      <circle cx="160" cy="160" r="118" className="orbit-ring" />
      <circle cx="160" cy="160" r="82" className="orbit-ring orbit-ring-muted" />
      <path d="M76 160 C102 82 218 82 244 160 C218 238 102 238 76 160Z" className="orbit-path" />
      <path d="M160 42V278M42 160H278" className="orbit-axis" />
      <g className="orbit-runner">
        <circle cx="160" cy="42" r="5" className="orbit-dot" />
      </g>
    </svg>

    <div className="absolute inset-[32%] grid place-items-center border border-border bg-background/90 text-center shadow-subtle backdrop-blur-sm">
      <div>
        <p className="font-mono text-[0.68rem] uppercase text-accent">Product system</p>
        <p className="mt-1.5 text-xs font-semibold leading-snug text-foreground sm:text-sm">
          Concept to architecture to shipped software
        </p>
      </div>
    </div>

    {orbitNodes.map((node) => (
      <span
        key={node.label}
        className={`absolute rounded-full border border-border bg-surface-elevated px-3 py-1 text-[0.68rem] font-semibold uppercase text-muted-foreground shadow-subtle ${node.className}`}
      >
        {node.label}
      </span>
    ))}
  </div>
);
