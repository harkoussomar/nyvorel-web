import type { Metadata } from "next";
import Image from "next/image";
import { CopyCommand } from "@/components/copy-command";
import { project } from "@/lib/project";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const featureCards = [
  {
    number: "01",
    title: "Shell that behaves like a system",
    signal: "SHELL / SESSION",
    copy:
      "Workspace, session, media, notifications, utilities and desktop workflows live inside one coherent interaction model.",
  },
  {
    number: "02",
    title: "Appearance with intent",
    signal: "PALETTE / SYNC",
    copy:
      "Wallpaper-aware palettes, theme modes and application synchronization keep the desktop visually connected instead of merely themed.",
  },
  {
    number: "03",
    title: "Operations within reach",
    signal: "OPS / REMOTE",
    copy:
      "Nyvorel brings operational workflows such as recovery, remote access and system visibility into the shell itself.",
  },
  {
    number: "04",
    title: "Recovery is part of the design",
    signal: "BACKUP / MANIFEST",
    copy:
      "The install model is backup-first, manifest-backed and built to preserve user edits rather than assuming configuration is disposable.",
  },
] as const;

const architecture = [
  ["01", "SESSION", "Hyprland", "Compositor & session"],
  ["02", "LIFECYCLE", "systemd --user", "Lifecycle ownership"],
  ["03", "RUNTIME", "Quickshell", "Nyvorel runtime"],
  ["04", "EXPERIENCE", "Modules", "UI & workflows"],
] as const;

const installCommand =
  "git clone https://github.com/harkoussomar/nyvorel.git && cd nyvorel && ./setup.sh --plan";

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <div className="headerInner">
          <a className="brand" href="#top" aria-label="Nyvorel home">
            <Image
              src="/brand/nyvorel.svg"
              alt=""
              width={34}
              height={34}
              priority
            />
            <span>Nyvorel</span>
          </a>

          <nav className="navLinks" aria-label="Primary navigation">
            <a href="#experience">Experience</a>
            <a href="#showcase">Showcase</a>
            <a href="#architecture">Architecture</a>
            <a href="#install">Install</a>
          </nav>

          <div className="headerActions">
            <a className="headerDocs" href="/docs">
              Docs
            </a>
            <a
              className="headerCta"
              href={project.repository}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <section className="hero sectionShell" id="top">
        <div className="heroGlow heroGlowA" />
        <div className="heroGlow heroGlowB" />

        <div className="heroCopy">
          <a
            className="releasePill"
            href={project.release}
            target="_blank"
            rel="noreferrer"
          >
            <span className="releaseDot" />
            {project.version} is live
            <span aria-hidden="true">↗</span>
          </a>

          <p className="eyebrow">Hyprland · Quickshell · Arch Linux</p>

          <h1>
            Your desktop,
            <span> shaped into a system.</span>
          </h1>

          <p className="heroLead">
            Nyvorel is a cohesive desktop shell that brings appearance,
            operations, recovery and session lifecycle into one deliberate
            Hyprland experience.
          </p>

          <div className="heroActions">
            <a className="button buttonPrimary" href="#showcase">
              Explore Nyvorel
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button buttonSecondary"
              href={project.repository}
              target="_blank"
              rel="noreferrer"
            >
              View source
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="heroStage" aria-label="Nyvorel desktop preview">
          <div className="stageAura" />
          <div className="screenFrame">
            <div className="screenRail">
              <span />
              <span />
              <span />
              <div className="screenLabel">Nyvorel / desktop</div>
            </div>
            <Image
              className="heroImage"
              src="/showcase/hero-desktop.webp"
              alt="Nyvorel desktop running on Hyprland"
              width={1600}
              height={899}
              priority
              sizes="(max-width: 900px) 96vw, 1200px"
            />
          </div>

          <div className="stageSignals" aria-hidden="true">
            <span>01 / shell</span>
            <span>02 / workflows</span>
            <span>03 / recovery</span>
          </div>
        </div>

        <div className="platformStrip" aria-label="Nyvorel platform">
          <span>Arch Linux</span>
          <i />
          <span>Hyprland</span>
          <i />
          <span>Quickshell</span>
          <i />
          <span>systemd --user</span>
          <i />
          <span>GPL-3.0</span>
        </div>
      </section>

      <section className="sectionShell sectionBlock" id="experience">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">One environment</p>
            <h2>More than a theme. More than a dotfiles bundle.</h2>
          </div>
          <p>
            Nyvorel treats the desktop as a connected product: shell surfaces,
            services, appearance and recovery all share the same system
            boundary.
          </p>
        </div>

        <div className="featureGrid">
          {featureCards.map((feature) => (
            <article className="featureCard" key={feature.number}>
              <div className="featureMeta">
                <span className="featureNumber">{feature.number}</span>
                <span className="featureSignal">{feature.signal}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <div className="featureTrace" />
            </article>
          ))}
        </div>
      </section>

      <section className="sectionShell sectionBlock showcase" id="showcase">
        <div className="sectionHeading compactHeading">
          <div>
            <p className="eyebrow">Real surfaces</p>
            <h2>The shell in motion.</h2>
          </div>
          <p>
            Every frame below is a real Nyvorel surface running on the desktop
            — no product mockups.
          </p>
        </div>

        <div className="showcaseGrid">
          <a
            className="shot shotLarge"
            href="/docs/workflows/settings"
            aria-label="Open Nyvorel Settings guide"
          >
            <div className="shotTopline">
              <div>
                <span>01</span>
                <h3>Nyvorel Settings</h3>
              </div>
              <div className="shotMeta">
                <p>Shell configuration without leaving the shell.</p>
                <span className="shotGuide">Open guide →</span>
              </div>
            </div>
            <Image
              src="/showcase/settings-overview.webp"
              alt="Nyvorel Settings"
              width={1600}
              height={899}
              sizes="(max-width: 900px) 96vw, 760px"
            />
          </a>

          <a
            className="shot shotTall"
            href="/docs/workflows/appearance-studio"
            aria-label="Open Appearance Studio guide"
          >
            <div className="shotTopline">
              <div>
                <span>02</span>
                <h3>Appearance Studio</h3>
              </div>
              <div className="shotMeta">
                <p>Theme source, palette character and visual treatment.</p>
                <span className="shotGuide">Open guide →</span>
              </div>
            </div>
            <Image
              src="/showcase/appearance-studio.webp"
              alt="Nyvorel Appearance Studio"
              width={1600}
              height={898}
              sizes="(max-width: 900px) 96vw, 760px"
            />
          </a>

          <a
            className="shot shotWide"
            href="/docs/workflows/backup-recovery"
            aria-label="Open Backup and Recovery guide"
          >
            <div className="shotTopline">
              <div>
                <span>03</span>
                <h3>Backup &amp; Recovery</h3>
              </div>
              <div className="shotMeta">
                <p>Protection state and recovery evidence as a desktop workflow.</p>
                <span className="shotGuide">Open guide →</span>
              </div>
            </div>
            <Image
              src="/showcase/backup-recovery.webp"
              alt="Nyvorel Backup and Recovery"
              width={1600}
              height={897}
              sizes="(max-width: 900px) 96vw, 1200px"
            />
          </a>
        </div>
      </section>

      <section className="sectionShell sectionBlock">
        <div className="reliabilityPanel">
          <div className="reliabilityCopy">
            <p className="eyebrow">Reliability by design</p>
            <h2>Install with a way back.</h2>
            <p>
              Nyvorel&apos;s public release model is intentionally recovery
              oriented. Existing managed files are backed up, installed state is
              recorded, and user changes are protected during uninstall.
            </p>

            <a className="textLink" href="/docs/getting-started/recovery">
              Read the recovery guide
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <ol className="reliabilitySteps">
            <li>
              <span>01</span>
              <div>
                <strong>Preview</strong>
                <p>Inspect the installation plan before changing anything.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Back up</strong>
                <p>Pre-existing managed files are preserved before replacement.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Record</strong>
                <p>A timestamped manifest tracks the installed state.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Recover</strong>
                <p>User-edited files are protected instead of overwritten.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section
        className="sectionShell sectionBlock architectureSection"
        id="architecture"
      >
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2>Clear ownership from session to surface.</h2>
          </div>
          <p>
            Hyprland starts the session. systemd owns the lifecycle. Quickshell
            owns the runtime. Nyvorel modules own the experience.
          </p>
        </div>

        <div className="architectureFlow">
          {architecture.map(([number, stage, title, subtitle], index) => (
            <div className="architectureNodeWrap" key={number}>
              <article className="architectureNode">
                <span>
                  {number} / {stage}
                </span>
                <strong>{title}</strong>
                <p>{subtitle}</p>
              </article>
              {index < architecture.length - 1 ? (
                <div className="architectureConnector" aria-hidden="true">
                  <i />
                  <b>→</b>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="sectionShell sectionBlock" id="install">
        <div className="installPanel">
          <div className="installCopy">
            <p className="eyebrow">Start safely</p>
            <h2>Preview first. Install second.</h2>
            <p>
              Development-branch setup prepares Nyvorel on an existing minimal
              Arch installation. The immutable {project.version} release uses
              the earlier file-only workflow.
            </p>
          </div>

          <div className="terminal">
            <div className="terminalBar">
              <div className="terminalDots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>terminal / bash</p>
            </div>
            <div className="terminalBody">
              <span className="prompt">$</span>
              <code>{installCommand}</code>
              <CopyCommand command={installCommand} />
            </div>
          </div>

          <div className="installLinks">
            <a href="/docs/getting-started/install">
              Installation guide <span aria-hidden="true">→</span>
            </a>
            <a href="/docs/getting-started/requirements">
              Requirements <span aria-hidden="true">→</span>
            </a>
            <a href={project.release} target="_blank" rel="noreferrer">
              Release {project.version} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="footerInner sectionShell">
          <div className="footerBrand">
            <Image
              src="/brand/nyvorel.svg"
              alt=""
              width={40}
              height={40}
            />
            <div>
              <strong>Nyvorel</strong>
              <p>Built around Hyprland. Shaped into its own system.</p>
            </div>
          </div>

          <div className="footerLinks">
            <a href="/docs">Docs</a>
            <a href={project.repository} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={project.release} target="_blank" rel="noreferrer">
              Release
            </a>
            <a href={project.upstream} target="_blank" rel="noreferrer">
              Upstream
            </a>
          </div>

          <p className="footerLegal">
            GPL-3.0 · Independent community project · Derived from
            end-4/dots-hyprland with upstream attribution preserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
