import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Troubleshoot Nyvorel installation, activation, Quickshell lifecycle, and recovery failures using the project's published contracts.",
  alternates: { canonical: "/docs/troubleshooting" },
};

export default function TroubleshootingPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Project & support · 03</p>
        <h1>Troubleshooting</h1>
        <p>
          Start from the boundary that failed: package setup, user-file
          installation, first login, Quickshell runtime, or recovery. Use the
          development-branch setup on a minimal Arch installation.
        </p>
      </header>

      <section className="docSection">
        <h2>Setup needs an interactive terminal</h2>
        <p>
          Pacman must show its full-system-upgrade transaction and receive a
          response. Run from a local console or use SSH with a PTY.
        </p>
        <CodeBlock>{`./setup.sh --plan
./setup.sh --install --yes`}</CodeBlock>
        <p>
          If an SSH connection reports no terminal, reconnect with
          <code>ssh -t</code>. The plan itself is read-only and does not need a
          PTY. Setup uses official pacman packages and no AUR helper.
        </p>
      </section>

      <section className="docSection">
        <h2>Setup found existing personal files</h2>
        <p>
          Setup previews managed-file replacements and stops before replacing
          them. Review the affected destinations and rerun only when you want
          them backed up and replaced.
        </p>
        <CodeBlock>{`./setup.sh --install --yes --replace-existing`}</CodeBlock>
        <Callout title="Keep the install backups" tone="important">
          The file installer records original managed files under
          <code>~/.local/state/nyvorel/installations/</code>.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Packages installed, but setup stopped later</h2>
        <p>
          An interrupted user-file or first-run step can be resumed from the
          same checkout. Do not rerun a completed setup as a fresh install.
        </p>
        <CodeBlock>{`./setup.sh --install --yes --resume
~/.local/bin/nyvorel doctor --no-session`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>Files installed, but services are not active</h2>
        <p>
          Package and file setup runs outside the graphical session. Start
          the first desktop from a text console; the session imports Wayland
          state and activates Nyvorel&apos;s user services.
        </p>
        <CodeBlock>{`~/.local/bin/nyvorel session --check
~/.local/bin/nyvorel session`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>Nyvorel shell is not running</h2>
        <p>
          The published Quickshell service runs{" "}
          <code>/usr/bin/qs -c nyvorel</code> and is owned by the user systemd
          manager. Standard systemd inspection can show whether that boundary
          is active and why it exited.
        </p>

        <CodeBlock label="diagnostics">{`systemctl --user status nyvorel-quickshell.service
journalctl --user -u nyvorel-quickshell.service -b`}</CodeBlock>

        <p>
          If the graphical-session environment changed, use Nyvorel&apos;s
          activation command inside the live Hyprland session:
        </p>
        <CodeBlock>{`nyvorel activate --yes`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>Activation reports no systemctl</h2>
        <p>
          Nyvorel requires systemd user services for the supported desktop.
          Confirm the account has a running systemd user manager and that the
          graphical session was started using <code>nyvorel session</code>.
        </p>
      </section>

      <section className="docSection">
        <h2>Uninstall says there is no current installation</h2>
        <p>
          Normal recovery follows:
        </p>

        <CodeBlock label="pointer">{`~/.local/state/nyvorel/current-install`}</CodeBlock>

        <p>
          If that pointer is absent, the uninstaller cannot infer the active
          installation manifest. If you intentionally need a specific retained
          installation state, the uninstaller also supports an explicit{" "}
          <code>--state</code> path.
        </p>
      </section>

      <section className="docSection">
        <h2>Uninstall refuses changed or missing files</h2>
        <p>
          This refusal is a safety feature. A managed destination changed after
          installation, so Nyvorel will not overwrite/remove it silently.
        </p>

        <CodeBlock>{`./uninstall.sh --dry-run`}</CodeBlock>

        <p>
          After reviewing the affected files, forced recovery is explicit:
        </p>

        <CodeBlock>{`./uninstall.sh --yes --force-changed`}</CodeBlock>

        <Callout title="Changed files are archived before forced recovery" tone="safe">
          Existing conflicting files are copied under the installation state in
          <code>uninstall-conflicts/&lt;timestamp&gt;/</code> before
          restoration/removal continues.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Testing recovery in an alternate home</h2>
        <p>
          Use the sandbox path documented by the installer/recovery contract
          and disable service activation/deactivation for that alternate home.
        </p>

        <CodeBlock>{`./install.sh \
  --target-home /tmp/nyvorel-test-home \
  --yes \
  --no-activate

./uninstall.sh \
  --target-home /tmp/nyvorel-test-home \
  --yes \
  --no-deactivate`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>Where to inspect installation evidence</h2>
        <CodeBlock label="state">{`~/.local/state/nyvorel/installations/YYYYMMDD-HHMMSS/
├── manifest.json
├── backup/
└── uninstall-conflicts/   # when forced recovery archived changes`}</CodeBlock>

        <p>
          The manifest records the installation status, destinations, source
          mapping, checksums, target home, and whether destinations existed
          before installation.
        </p>

        <div className="docPath">
          setup.sh
          <br />
          INSTALL.md
          <br />
          install.sh
          <br />
          uninstall.sh
          <br />
          systemd/nyvorel-quickshell.service.in
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/project/licensing-provenance",
          title: "Licensing & provenance",
        }}
      />
    </article>
  );
}
