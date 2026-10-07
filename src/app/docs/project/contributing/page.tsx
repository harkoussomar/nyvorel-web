import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Contributing",
  description:
    "Nyvorel contribution workflow, source boundaries, portability rules, and minimum validation.",
  alternates: { canonical: "/docs/project/contributing" },
};

const workflow = [
  ["01", "Fork or clone", "Start from the public repository."],
  ["02", "Branch from main", "Keep the change focused and independently reviewable."],
  ["03", "Change only the intended scope", "Avoid unrelated formatting churn or drive-by rewrites."],
  ["04", "Validate affected sources", "At minimum, syntax-check changed Bash/Python and run relevant functional checks."],
  ["05", "Explain behavior and migration impact", "Document user-visible effects in the pull request."],
] as const;

export default function ContributingPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Project & support · 01</p>
        <h1>Contributing</h1>
        <p>
          Nyvorel contributions should preserve the same boundaries used to
          publish the project: focused changes, portable public source,
          explicit validation, and preserved provenance.
        </p>
      </header>

      <section className="docSection">
        <h2>Development workflow</h2>

        <div className="docFlow">
          {workflow.map(([number, title, description], index) => (
            <div key={number}>
              <div className="docFlowNode">
                <span>{number}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
              {index < workflow.length - 1 ? (
                <div className="docFlowArrow" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Source boundaries</h2>
        <p>
          Contribution work must not remove or weaken Nyvorel&apos;s licensing
          and provenance evidence. The contribution contract explicitly
          protects:
        </p>
        <ul>
          <li><code>LICENSE</code></li>
          <li><code>NOTICE.md</code></li>
          <li><code>PROVENANCE.md</code></li>
          <li><code>THIRD_PARTY_NOTICES.md</code></li>
          <li><code>INHERITED_ASSETS.md</code></li>
          <li><code>TRADEMARKS.md</code></li>
          <li>component license files under <code>LICENSES/</code></li>
        </ul>

        <Callout title="New copied code or assets need provenance" tone="important">
          New third-party material must carry enough provenance and licensing
          information for redistribution. Do not add copied assets first and
          leave attribution as a later cleanup task.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Portability rules</h2>
        <p>
          Public source must not contain a maintainer-specific home path.
          Source files that require an absolute target-user home use the
          literal <code>@HOME@</code> token and let the installer materialize it.
        </p>
        <p>
          Do not commit local backup trees, generated runtime state, secrets,
          credentials, tokens, or user data.
        </p>
      </section>

      <section className="docSection">
        <h2>Minimum validation</h2>
        <p>For changed Bash:</p>
        <CodeBlock>{`bash -n path/to/script`}</CodeBlock>

        <p>
          For Python, ensure changed files parse and run the functional checks
          relevant to the behavior being modified.
        </p>

        <Callout title="Lifecycle changes need explicit evidence" tone="safe">
          If a change affects installation, lifecycle, systemd, Hyprland, or
          Quickshell startup, include the validation performed in the pull
          request description.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Keep changes reviewable</h2>
        <p>
          A Nyvorel contribution should make it possible to answer three
          questions quickly: what behavior changed, which source boundary owns
          it, and how the contributor verified that behavior.
        </p>

        <div className="docPath">CONTRIBUTING.md</div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/reference/repository-map",
          title: "Repository map",
        }}
        next={{
          href: "/docs/project/licensing-provenance",
          title: "Licensing & provenance",
        }}
      />
    </article>
  );
}
