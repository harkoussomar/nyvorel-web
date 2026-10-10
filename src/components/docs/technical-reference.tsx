import React from "react";
import Link from "next/link";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

type Row = readonly [string, string, string];
type Item = readonly [string, string];
type Check = readonly [string, string, string];
export type TechnicalGuide = {
  title: string;
  intro: string;
  kind: string;
  number: string;
  concepts: readonly Item[];
  steps: readonly Item[];
  contracts: readonly Row[];
  checks: readonly Check[];
  cautions: readonly string[];
  refs: readonly string[];
  previous: {href:string;title:string};
  next: {href:string;title:string};
};

export function TechnicalReference({guide}:{guide:TechnicalGuide}) {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">{guide.kind} · {guide.number} · Nyvorel v0.1.0</p>
        <h1>{guide.title}</h1>
        <p>{guide.intro}</p>
      </header>

      <Callout title="Version boundary" tone="important">
        The commands, paths and defaults on this page are scoped to the published
        <code> v0.1.0</code> tag. Development branch commands may differ.
        Read-only checks are labeled; do not treat a reference command as an installation step.
      </Callout>

      <nav aria-label={`${guide.title} sections`} className="docSection">
        <strong>On this page</strong>
        <ul>
          <li><a href="#mental-model">Understand the ownership</a></li>
          <li><a href="#sequence">Follow the path</a></li>
          <li><a href="#contract">Reference contracts</a></li>
          <li><a href="#verify">Verify safely</a></li>
          <li><a href="#boundaries">Limits and cautions</a></li>
          <li><a href="#sources">Verified source</a></li>
        </ul>
      </nav>

      <section className="docSection" id="mental-model">
        <h2>Understand the ownership</h2>
        <div className="docSurfaceGrid">
          {guide.concepts.map(([title,detail],i)=>(
            <section className="docSurfaceCard" key={title}>
              <span>{String(i+1).padStart(2,"0")}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="docSection" id="sequence">
        <h2>Follow the path</h2>
        <ol>
          {guide.steps.map(([title,detail])=>(
            <li key={title}><strong>{title}</strong><p>{detail}</p></li>
          ))}
        </ol>
      </section>

      <section className="docSection" id="contract">
        <h2>Reference contracts</h2>
        <p>These are source-level facts and ownership boundaries, not a replacement for the complete upstream schema.</p>
        <div className="docSurfaceGrid">
          {guide.contracts.map(([name,meaning,detail])=>(
            <section key={name} className="docSurfaceCard">
              <h3><code>{name}</code></h3>
              <p>{meaning}</p>
              <p>{detail}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="docSection" id="verify">
        <h2>Verify safely</h2>
        <p>Run only checks that match your environment. None of the commands below writes files or enables services.</p>
        {guide.checks.map(([label,command,explanation])=>(
          <section key={label}>
            <h3>{label}</h3>
            <p>{explanation}</p>
            <CodeBlock label="read-only shell command">{command}</CodeBlock>
          </section>
        ))}
      </section>

      <section className="docSection" id="boundaries">
        <h2>Limits and cautions</h2>
        <ul>{guide.cautions.map(note=><li key={note}>{note}</li>)}</ul>
        <p>When a check fails, preserve the output and follow <Link href="/docs/troubleshooting">Troubleshooting</Link> rather than guessing a destructive repair.</p>
      </section>

      <section className="docSection" id="sources">
        <h2>Verified source</h2>
        <p>Inspect the actual tagged files to resolve implementation details or release differences.</p>
        <ul>
          {guide.refs.map(path=>(
            <li key={path}><a href={`https://github.com/harkoussomar/nyvorel/tree/v0.1.0/${path}`} target="_blank" rel="noreferrer"><code>{path}</code></a></li>
          ))}
        </ul>
      </section>
      <PageFooter previous={guide.previous} next={guide.next}/>
    </article>
  );
}
