import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Recovery",
  description:
    "Uninstall Nyvorel safely, restore pre-install files, and protect user edits.",
  alternates: { canonical: "/docs/getting-started/recovery" },
};

export default function RecoveryPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 03</p>
        <h1>Uninstall &amp; recover</h1>
        <p>
          Recovery is part of Nyvorel&apos;s installation contract. The
          uninstaller uses the recorded installation manifest instead of
          guessing what should be removed or restored.
        </p>
      </header>

      <section className="docSection">
        <h2>Normal recovery</h2>
        <CodeBlock>{`./uninstall.sh --yes`}</CodeBlock>
        <p>The recovery flow:</p>
        <ol>
          <li>
            reads <code>~/.local/state/nyvorel/current-install</code>;
          </li>
          <li>verifies managed files against the versions Nyvorel installed;</li>
          <li>restores files that existed before installation;</li>
          <li>removes files that Nyvorel originally created.</li>
        </ol>
      </section>

      <section className="docSection">
        <h2>State intentionally retained</h2>
        <p>Normal recovery intentionally keeps:</p>
        <CodeBlock label="paths">{`~/.config/nyvorel
~/.local/state/nyvorel/installations/`}</CodeBlock>
        <p>
          This preserves user/runtime state and installation/recovery history.
        </p>
      </section>

      <section className="docSection">
        <h2>Protecting post-install edits</h2>
        <p>
          If an installed file was edited or removed after installation, the
          normal uninstaller stops before making filesystem changes.
        </p>
        <CodeBlock>{`./uninstall.sh --dry-run`}</CodeBlock>

        <Callout title="Nyvorel does not silently overwrite your edits" tone="safe">
          Changed or missing managed files are treated as a boundary that
          requires an explicit decision.
        </Callout>

        <h3>Forced recovery</h3>
        <CodeBlock>{`./uninstall.sh --yes --force-changed`}</CodeBlock>
        <p>
          Existing changed files are archived under the installation state in{" "}
          <code>uninstall-conflicts/&lt;timestamp&gt;/</code> before restoration
          or removal continues.
        </p>
      </section>

      <section className="docSection">
        <h2>Testing against another home</h2>
        <p>
          Both installer and uninstaller can target an alternate home. Nyvorel
          uses this model for release verification without touching the normal
          user&apos;s live configuration.
        </p>
        <CodeBlock>{`./install.sh \\
  --target-home /tmp/nyvorel-test-home \\
  --yes \\
  --no-activate

./uninstall.sh \\
  --target-home /tmp/nyvorel-test-home \\
  --yes \\
  --no-deactivate`}</CodeBlock>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/install", title: "Install" }}
        next={{ href: "/docs/concepts/architecture", title: "Architecture" }}
      />
    </article>
  );
}
