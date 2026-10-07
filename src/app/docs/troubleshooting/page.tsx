import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Troubleshoot Nyvorel installation, activation, Quickshell lifecycle, and recovery failures using the project's published contracts.",
};

export default function TroubleshootingPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Project & support · 03</p>
        <h1>Troubleshooting</h1>
        <p>
          Start from the boundary that failed: installation, activation,
          Quickshell runtime, or recovery. Nyvorel&apos;s installer and
          uninstaller deliberately stop before unsafe mutations when their
          preconditions are not satisfied.
        </p>
      </header>

      <section className="docSection">
        <h2>Installation wants confirmation</h2>
        <p>
          If managed destinations already exist, Nyvorel requires an explicit
          confirmation before replacing them.
        </p>

        <CodeBlock>{`./install.sh --dry-run
./install.sh --yes`}</CodeBlock>

        <p>
          Review the dry-run plan first. Existing managed files are backed up
          before replacement during the real install.
        </p>
      </section>

      <section className="docSection">
        <h2>Files installed, but services are not active</h2>
        <p>
          This is expected after <code>./install.sh --yes</code>. Activation is
          separate by design.
        </p>

        <CodeBlock>{`./install.sh --yes --activate`}</CodeBlock>

        <Callout title="Activation only applies to the current real HOME" tone="important">
          The installer rejects <code>--activate</code> when{" "}
          <code>--target-home</code> points at an alternate/sandbox home. Use
          the non-activating path for sandbox installation tests.
        </Callout>
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
          If the graphical-session environment changed or Hyprland was
          reloaded, use Nyvorel&apos;s normal shell-reload path:
        </p>

        <CodeBlock>{`systemctl --user import-environment \
  DISPLAY WAYLAND_DISPLAY HYPRLAND_INSTANCE_SIGNATURE \
  XDG_CURRENT_DESKTOP XDG_SESSION_TYPE

hyprctl reload
systemctl --user restart nyvorel-quickshell.service`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>Activation reports no systemctl</h2>
        <p>
          The installer treats missing <code>systemctl</code> as an activation
          warning: files remain installed, but Nyvorel user services are not
          activated. The supported target environment requires systemd user
          services.
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
