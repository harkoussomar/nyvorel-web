import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export type WorkflowGuideData = {
  order: string;
  title: string;
  intro: string;
  outcome: string;
  image: { src: string; alt: string; width: number; height: number } | null;
  prerequisites: string[];
  orient: [string, string][];
  steps: [string, string, string][];
  understand: [string, string][];
  issues: [string, string][];
  source: string[];
  previous: { title: string; href: string };
  next: { title: string; href: string };
};

export function WorkflowGuide({ guide }: { guide: WorkflowGuideData }) {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · {guide.order} · v0.1.0</p>
        <h1>{guide.title}</h1>
        <p>{guide.intro}</p>
      </header>

      <section className="docSection" aria-label="Guide goal and scope">
        <div className="docCallout docCallout-safe">
          <strong>What you will accomplish</strong>
          <p>{guide.outcome}</p>
        </div>
        <Callout title="Applies to the published v0.1.0 shell">
          Workflows below follow the published Nyvorel shell and its documented
          user interfaces. Modules, controls and available integrations can
          vary with configuration and hardware. This is not a minimal-Arch
          bootstrap guide. Start with the <Link href="/docs/getting-started/requirements">requirements</Link>
          or <Link href="/docs/getting-started/first-launch">first-launch guide</Link> if needed.
        </Callout>
      </section>

      {guide.image && (
        <figure className="docVisual docVisualHighFidelity">
          <a className="docVisualFullSize" href={guide.image.src} target="_blank" rel="noreferrer" aria-label={`Open full-resolution screenshot: ${guide.image.alt}`}>
            <Image
              src={guide.image.src}
              alt={guide.image.alt}
              width={guide.image.width}
              height={guide.image.height}
              sizes="(max-width: 920px) 96vw, 820px"
              unoptimized
            />
          </a>
          <figcaption><span>Real Nyvorel capture · Interface may vary with configuration.</span><a href={guide.image.src} target="_blank" rel="noreferrer">Open full resolution ↗</a></figcaption>
        </figure>
      )}

      <section className="docSection">
        <h2 id="before-you-start">Before you start</h2>
        <ul>{guide.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="docSection">
        <h2 id="find-your-way-around">Find your way around</h2>
        <dl className="docDefinitionGrid">
          {guide.orient.map(([name, description]) => (
            <Fragment key={name}><dt>{name}</dt><dd>{description}</dd></Fragment>
          ))}
        </dl>
      </section>

      <section className="docSection">
        <h2 id="follow-the-workflow">Follow the workflow</h2>
        <ol>
          {guide.steps.map(([title, instructions, result]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{instructions}</p>
              <p><strong>Expected result:</strong> {result}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="docSection">
        <h2 id="understand-the-signals">Understand the signals</h2>
        <dl className="docDefinitionGrid">
          {guide.understand.map(([name, description]) => (
            <Fragment key={name}><dt>{name}</dt><dd>{description}</dd></Fragment>
          ))}
        </dl>
      </section>

      <section className="docSection">
        <h2 id="if-it-does-not-work">If it does not work</h2>
        <dl className="docDefinitionGrid">
          {guide.issues.map(([symptom, response]) => (
            <Fragment key={symptom}><dt>{symptom}</dt><dd>{response}</dd></Fragment>
          ))}
        </dl>
        <p>For additional symptoms, consult <Link href="/docs/troubleshooting">Troubleshooting</Link>. Keep diagnostic details private when they include local paths, addresses or credentials.</p>
      </section>

      <section className="docSection">
        <h2>Source and next steps</h2>
        <p>These are the relevant source entry points in the tagged <code>v0.1.0</code> shell. Use them for implementation detail, not as commands to run.</p>
        <ul>
          {guide.source.map((path) => (
            <li key={path}><a href={`https://github.com/harkoussomar/nyvorel/${path.endsWith("/") ? "tree" : "blob"}/v0.1.0/${path}`} target="_blank" rel="noreferrer"><code>{path}</code></a></li>
          ))}
        </ul>
      </section>
      <PageFooter previous={guide.previous} next={guide.next} />
    </article>
  );
}
