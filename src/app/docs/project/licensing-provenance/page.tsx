import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Licensing & provenance",
  description:
    "Understand Nyvorel's GPL-3.0 distribution, upstream derivation, third-party components, inherited assets, and trademark boundaries.",
};

const inventory = [
  ["Nyvorel shell source", "Nyvorel modifications over end-4/dots-hyprland", "GPL-3.0"],
  ["Waffle module tree", "end-4/dots-hyprland", "GPL-3.0"],
  ["Common widgetCanvas", "end-4/dots-hyprland", "GPL-3.0"],
  ["Translations", "Upstream translation tree with Nyvorel changes where applicable", "GPL-3.0"],
  ["Terminal scheme-base.json", "end-4/dots-hyprland", "GPL-3.0"],
  ["Rounded polygon QML/JS", "end-4/rounded-polygon-qmljs", "Apache-2.0"],
  ["Nyvorel logo", "Nyvorel project-owned artwork", "Project asset"],
] as const;

export default function LicensingProvenancePage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Project & support · 02</p>
        <h1>Licensing &amp; provenance</h1>
        <p>
          Nyvorel is distributed under GPL-3.0 as a substantially modified
          derivative of end-4/dots-hyprland. The repository keeps separate
          provenance and notice files for inherited and third-party material.
        </p>
      </header>

      <section className="docSection">
        <h2>Project-level provenance</h2>
        <dl className="docDefinitionGrid">
          {inventory.map(([area, origin, treatment]) => (
            <div key={area} style={{ display: "contents" }}>
              <dt>{area}</dt>
              <dd>
                {origin}
                <br />
                <code>{treatment}</code>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="docSection">
        <h2>Third-party component families</h2>
        <p>
          Nyvorel preserves additional notices for bundled material whose
          treatment is not described only by the repository&apos;s root GPL
          license. The published notices include:
        </p>
        <ul>
          <li>Microsoft Fluent UI System Icons — MIT license evidence;</li>
          <li>
            selected Windows 11 Figma Community icon variants — CC BY 4.0
            attribution and modification notice;
          </li>
          <li>
            rounded polygon QML/JS — Apache-2.0 component licensing;
          </li>
          <li>
            Fedora symbolic icon attribution — Font Awesome / CC BY 4.0;
          </li>
          <li>
            Gentoo symbolic icon metadata — Pictogrammers Material Design Icons,
            documented with Apache-2.0 context.
          </li>
        </ul>

        <Callout title="Provenance inventory is not legal advice">
          Nyvorel&apos;s provenance documents record project decisions and
          retained evidence. They explicitly do not present themselves as
          legal advice.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Inherited upstream assets</h2>
        <p>
          Nyvorel retains a group of brand/project SVGs and the default
          wallpaper from its upstream source tree. Those assets are documented
          as inherited third-party/upstream material rather than claimed as
          Nyvorel-owned artwork.
        </p>
        <p>
          The default wallpaper has exact upstream binary provenance. The
          inherited icon list and treatment are recorded in{" "}
          <code>INHERITED_ASSETS.md</code>.
        </p>
      </section>

      <section className="docSection">
        <h2>Trademark boundary</h2>
        <p>
          Third-party names, logos, and marks remain the property of their
          respective owners. Nyvorel states that their inclusion is for
          identification and compatibility and does not imply sponsorship,
          affiliation, or endorsement.
        </p>

        <Callout title="Copyright license and trademark permission are separate" tone="important">
          The project&apos;s trademark policy explicitly distinguishes
          copyright/source licensing from rights in third-party marks.
          Redistributors should review policies relevant to their own
          distribution and commercial context.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Files to preserve when redistributing or contributing</h2>
        <ul>
          <li><code>LICENSE</code></li>
          <li><code>NOTICE.md</code></li>
          <li><code>PROVENANCE.md</code></li>
          <li><code>THIRD_PARTY_NOTICES.md</code></li>
          <li><code>INHERITED_ASSETS.md</code></li>
          <li><code>TRADEMARKS.md</code></li>
          <li><code>LICENSES/</code></li>
        </ul>

        <div className="docPath">
          LICENSE
          <br />
          NOTICE.md
          <br />
          PROVENANCE.md
          <br />
          THIRD_PARTY_NOTICES.md
          <br />
          INHERITED_ASSETS.md
          <br />
          TRADEMARKS.md
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/project/contributing",
          title: "Contributing",
        }}
        next={{ href: "/docs/troubleshooting", title: "Troubleshooting" }}
      />
    </article>
  );
}
