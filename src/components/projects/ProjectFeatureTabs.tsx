import { useState, type CSSProperties } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectExperiences } from "@/content/projectExperiences";

export const ProjectFeatureTabs = ({
  slug,
  headingLevel = "h4",
}: {
  slug: string;
  headingLevel?: "h3" | "h4";
}) => {
  const Heading = headingLevel;
  const views = projectExperiences[slug];
  const [selected, setSelected] = useState(views?.[0]?.id);
  if (!views?.length) return null;

  return (
    <Tabs
      value={selected}
      onValueChange={setSelected}
      className={`product-experience product-${slug}`}
    >
      <div className="product-tabs-scroll">
        <TabsList aria-label={`${slug} product views`} className="product-tabs">
          {views.map((view, index) => (
            <TabsTrigger
              key={view.id}
              value={view.id}
              className="product-tab"
              onFocus={(event) =>
                event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })
              }
            >
              <span aria-hidden="true">0{index + 1}</span> {view.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {views.map((view) => (
        <TabsContent key={view.id} value={view.id} className="product-panel">
          <div className="product-view-copy">
            <p className="eyebrow">Inside the product</p>
            <Heading className="product-view-title">{view.title}</Heading>
            <p>{view.description}</p>
            <div className="engineering-note">
              <span aria-hidden="true">↳</span> {view.engineering}
            </div>
            {slug === "teacheasy" && <small>Public product website imagery</small>}
          </div>
          <figure className={`product-stage ${view.format}`}>
            <a
              className="device-frame"
              href={view.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${slug} ${view.label.toLowerCase()} screenshot at full size (opens in a new tab)`}
              title="View full-size screenshot"
              style={{ "--screenshot-aspect": view.width / view.height } as CSSProperties}
            >
              <div className="device-chrome" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{slug === "teacheasy" ? "teacheasylms.com" : "Product experience"}</span>
              </div>
              <img
                src={view.src}
                alt={view.alt}
                loading="lazy"
                decoding="async"
                width={view.width}
                height={view.height}
              />
            </a>
            <figcaption>
              {view.label}{" "}
              <span>
                {" "}
                /{" "}
                {slug === "teacheasy"
                  ? "Public web"
                  : view.format === "phone"
                    ? "Native app"
                    : "Public web"}
              </span>
            </figcaption>
          </figure>
        </TabsContent>
      ))}
    </Tabs>
  );
};
