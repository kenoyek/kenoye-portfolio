import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/content/capabilities";

export const HomeCapabilities = () => (
  <section id="capabilities" className="expertise-editorial premium-section">
    <div className="editorial-section-heading">
      <div>
        <p className="eyebrow">02 / What I bring</p>
        <h2>
          Big-picture thinking.
          <br />
          <em>Every-detail execution.</em>
        </h2>
      </div>
      <p>
        From architecture to the interface, I connect the disciplines it takes to ship a complete
        product.
      </p>
    </div>
    <div className="expertise-list">
      {capabilities.map((capability, index) => (
        <details
          key={capability.title}
          className="expertise-row"
          open={index === 0 ? true : undefined}
        >
          <summary>
            <span className="expertise-index">0{index + 1}</span>
            <h3>{capability.title}</h3>
            <ArrowUpRight size={23} className="expertise-arrow" />
          </summary>
          <div className="expertise-detail">
            <p>{capability.summary}</p>
            <ul>
              {capability.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  </section>
);
