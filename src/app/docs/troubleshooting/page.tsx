import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Troubleshooting — stable v0.1.0",
  description: "Diagnose Nyvorel v0.1.0 installation, activation, and recovery problems using safe checks first.",
  alternates: { canonical: "/docs/troubleshooting" },
};

export default function TroubleshootingPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Help · Stable v0.1.0</p>
        <h1>Find where the problem starts</h1>
        <p>
          Diagnose one boundary at a time: prerequisites, the file-install plan,
          service activation, shell runtime, or uninstall. Begin with read-only
          evidence. Avoid repeated installs or destructive cleanup until you
          know which step failed.
        </p>
      </header>

      <Callout title="Use the matching source version" tone="important">
        These checks apply to the published v0.1.0 release. The commands
        <code>setup.sh</code>, development-only bootstrap flags, and newer
        diagnostic subcommands are not assumed to exist in this release. For
        the current minimal-Arch development workflow, use the
        <Link href="/docs/getting-started/install"> development setup section</Link>.
      </Callout>

      <section className="docSection">
        <h2>Start with these safe checks</h2>
        <CodeBlock label="Terminal · read-only">{`cat /etc/os-release
command -v Hyprland
command -v qs
cat VERSION
systemctl --user --no-pager status nyvorel-quickshell.service`}</CodeBlock>
        <p>
          Run <code>cat VERSION</code> in your Nyvorel source checkout. It should
          print <code>0.1.0</code>. The service command is most meaningful in the
          intended user&apos;s active session.
        </p>
      </section>

      <section className="docSection">
        <h2>The installer says a dependency is missing</h2>
        <p>
          The v0.1.0 installer expects a working Arch + Hyprland + Quickshell
          environment. It does not install missing system packages. Return to
          <Link href="/docs/getting-started/requirements"> Requirements</Link>,
          identify the missing command or user service, and establish a working
          desktop environment before trying the installation again.
        </p>
      </section>

      <section className="docSection">
        <h2>The dry run lists files I want to keep</h2>
        <p>
          Stop before running <code>--yes</code>. The installer replaces
          managed destinations and records backups for the originals, but a
          separate backup is recommended for important configuration. Review
          the dry-run plan and consider testing against an alternate target
          home before applying it to your live user.
        </p>
        <CodeBlock label="Terminal · read-only">{`./install.sh --dry-run`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>Files were installed, but the shell is not running</h2>
        <p>
          If you chose <code>./install.sh --yes</code> without
          <code>--activate</code>, no service activation was requested. Do not
          assume installation failure. The documented combined install and
          activate option is intended for a live Hyprland session; consult the
          <Link href="/docs/getting-started/install"> installation guide</Link>
          before deciding how to activate an already-installed system.
        </p>
        <CodeBlock label="Hyprland session · read-only">{`systemctl --user --no-pager status nyvorel-quickshell.service
journalctl --user -u nyvorel-quickshell.service -b --no-pager`}</CodeBlock>
        <p>
          Look for the first reported failure rather than only the final
          restart message. Confirm the user manager, Wayland session, and
          <code>qs</code> availability before changing service configuration.
        </p>
      </section>

      <section className="docSection">
        <h2>The desktop loads, but a particular tool does not</h2>
        <p>
          Core shell readiness does not guarantee optional applications,
          device support, or network services. Check the specific module
          requirements in its guide. For GPU-dependent features, distinguish
          software-rendered virtual machines from physical hardware; a slow VM
          alone is not proof of a Nyvorel desktop regression.
        </p>
      </section>

      <section className="docSection">
        <h2>Uninstall cannot find the installation</h2>
        <p>
          The uninstaller normally reads the current-install pointer. Check it
          before trying to recover from an older state directory:
        </p>
        <CodeBlock label="Terminal · read-only">{`ls -l "$HOME/.local/state/nyvorel/current-install"
ls -la "$HOME/.local/state/nyvorel/installations"`}</CodeBlock>
        <p>
          The verified uninstaller supports <code>--state PATH</code> for a
          specific retained installation-state directory. Only provide a path
          after verifying the <code>manifest.json</code> belongs to the intended
          user and installation.
        </p>
      </section>

      <section className="docSection">
        <h2>Uninstall refuses changed or missing files</h2>
        <p>
          The refusal protects modifications made since installation. Review
          the reported destinations, make a separate backup, and preview the
          explicit forced plan before taking action.
        </p>
        <CodeBlock label="Terminal · read-only">{`./uninstall.sh --dry-run --force-changed`}</CodeBlock>
        <p>
          If you accept the consequences, follow the documented
          <Link href="/docs/getting-started/recovery"> recovery procedure</Link>.
          Do not delete the installation-state backups simply to bypass a
          conflict.
        </p>
      </section>

      <section className="docSection">
        <h2>Collect useful evidence safely</h2>
        <p>
          When asking for help, record the release version, the first failed
          command, its complete error, and the relevant user-service log.
          Inspect logs before sharing: they can contain usernames, home paths,
          IP addresses, process names, or other private data. Never include
          passwords, tokens, authentication files, or private keys.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/recovery", title: "Recovery" }}
        next={{ href: "/docs", title: "Documentation home" }}
      />
    </article>
  );
}
