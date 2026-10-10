import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Recover or uninstall — Nyvorel",
  description: "Preview Nyvorel recovery, restore pre-install files, and understand what development setup leaves installed.",
  alternates: { canonical: "/docs/getting-started/recovery" },
};

export default function RecoveryPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 04 · Development and stable</p>
        <h1>Uninstall without losing your work</h1>
        <p>
          Nyvorel&apos;s uninstaller is manifest-backed. It restores managed files
          that existed before Nyvorel and removes managed files that Nyvorel
          created. Start by inspecting the plan—especially if you edited your
          desktop after installation.
        </p>
      </header>

      <Callout title="Recover user files, not a whole operating system" tone="important">
        After development setup, uninstall does not reverse the
        <code> pacman -Syu</code>, remove installed desktop packages, or undo an
        explicitly enabled NetworkManager service. It recovers Nyvorel-managed
        user files and services. Make a separate backup of important personal
        configuration before proceeding.
      </Callout>

      <section className="docSection">
        <h2>1. Check the installation evidence</h2>
        <p>
          Return to the same source checkout used for installation: the matching
          development checkout or the <strong>v0.1.0 source</strong>. Do not run
          an uninstaller from a different source version against an unfamiliar
          manifest.
        </p>
        <CodeBlock label="Terminal · read-only">{`cat "$HOME/.local/state/nyvorel/current-install"
ls -ld "$HOME/.local/state/nyvorel/installations"`}</CodeBlock>
        <p>
          <strong>Expected:</strong> the first command prints the directory for
          your current installation; the second shows retained installation
          history. If the pointer is missing, see
          <Link href="/docs/troubleshooting"> Troubleshooting</Link> before
          supplying an explicit state path.
        </p>
      </section>

      <section className="docSection">
        <h2>2. Preview what recovery would change</h2>
        <CodeBlock label="Terminal · read-only">{`./uninstall.sh --dry-run`}</CodeBlock>
        <p>
          Review the counts of managed entries, restored backups, and removed
          Nyvorel-created files. If managed files changed or disappeared after
          installation, the tool refuses normal recovery (and may exit with a
          nonzero status) before making changes.
        </p>
      </section>

      <section className="docSection">
        <h2>3. Choose a safe recovery path</h2>
        <h3>If no managed files have changed</h3>
        <CodeBlock label="Terminal · changes files and services">{`./uninstall.sh --yes`}</CodeBlock>
        <p>
          By default, this stops or disables Nyvorel&apos;s managed user services,
          restores backed-up managed files, and removes only managed files
          that Nyvorel installed as new destinations.
        </p>
        <h3>If the preview reports changed or missing files</h3>
        <p>
          Inspect the reported paths and back up your edits independently.
          Then review the forced recovery plan <em>without applying it</em>:
        </p>
        <CodeBlock label="Terminal · read-only">{`./uninstall.sh --dry-run --force-changed`}</CodeBlock>
        <p>
          Only when you accept those file replacements or removals, run the
          explicit forced recovery:
        </p>
        <CodeBlock label="Terminal · changes files and services">{`./uninstall.sh --yes --force-changed`}</CodeBlock>
        <Callout title="How forced recovery preserves edits" tone="important">
          Changed files that still exist are archived inside the installation
          state under <code>uninstall-conflicts/&lt;timestamp&gt;/</code> before
          the original destinations are recovered. Missing files have no
          contents to archive. Check the archive yourself before deleting
          installation history.
        </Callout>
      </section>

      <section className="docSection">
        <h2>4. Verify recovery</h2>
        <p>
          Confirm the uninstaller reported success and restored/removed counts.
          Compare important pre-install desktop files with your own backup.
          The state and runtime preferences are intentionally retained:
        </p>
        <CodeBlock label="Retained paths">{`~/.config/nyvorel
~/.local/state/nyvorel/installations/`}</CodeBlock>
        <p>
          The <code>current-install</code> pointer is removed after a successful
          uninstall when it refers to that installation. A retained state
          directory does not mean the shell is still installed.
        </p>
      </section>

      <section className="docSection">
        <h2>Testing recovery in a separate home</h2>
        <p>
          Advanced maintainers can test file installation and recovery against
          an isolated target home without activating/deactivating live services.
          This is not a full graphical or package-installation test.
        </p>
        <CodeBlock label="Isolated test home · changes only the target path">{`./install.sh --target-home /tmp/nyvorel-test-home --yes --no-activate
./uninstall.sh --target-home /tmp/nyvorel-test-home --yes --no-deactivate`}</CodeBlock>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/first-launch", title: "First launch" }}
        next={{ href: "/docs/troubleshooting", title: "Troubleshooting" }}
      />
    </article>
  );
}
