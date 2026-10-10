"use client";

import Image from "next/image";
import { useState } from "react";

const lighting = [
  { id: "dusk", name: "Warm dusk", detail: "WARM / COPPER", color: "#b88362", bars: ["#d0a07e", "#a87a60", "#64554b", "#393b3b"] },
  { id: "pearl", name: "Soft mineral", detail: "COOL / NEUTRAL", color: "#9fa69b", bars: ["#d1d3c9", "#a0afa4", "#71807d", "#3e4746"] },
  { id: "charcoal", name: "Deep graphite", detail: "DARK / QUIET", color: "#3d4145", bars: ["#858b93", "#555b64", "#3f444d", "#24272b"] },
] as const;

export function AppearanceShowcase() {
  const [light, setLight] = useState<(typeof lighting)[number]["id"]>("dusk");
  const [view, setView] = useState<"detail" | "desktop">("detail");
  const selected = lighting.find((item) => item.id === light)!;

  return (
    <div className="appearance-grid">
      <div className="appearance-product theater-backdrop" data-light={light}>
        <div className="photo">
          <Image
            className="nv-real-image"
            src={view === "detail" ? "/showcase/v2/appearance-studio-theme-editor.png" : "/showcase/v2/appearance-studio-theme-desktop.png"}
            width={view === "detail" ? 1128 : 1918}
            height={view === "detail" ? 728 : 1078}
            alt={view === "detail" ? "Authentic close-up of Nyvorel Appearance Studio theme editor" : "Authentic Nyvorel Appearance Studio inside the desktop"}
            sizes="(max-width: 900px) 92vw, 55vw"
            unoptimized
          />
        </div>
        <div className="caption"><span>FIG. 02 — APPEARANCE STUDIO / AUTHENTIC CAPTURE</span><span>EXHIBITION LIGHTING ONLY</span></div>
      </div>
      <div className="appearance-copy">
        <div className="eyebrow"><span className="hairline" /> A responsive environment</div>
        <h3>Light changes.<br /><em>Character stays.</em></h3>
        <p>Inspect the real Appearance Studio at full detail or within its desktop. Choose a presentation tone to see how the frame changes around the unmodified product capture.</p>
        <div className="nv-view-switch" role="group" aria-label="Choose screenshot framing">
          <button aria-pressed={view === "detail"} type="button" onClick={() => setView("detail")}>Closer look</button>
          <button aria-pressed={view === "desktop"} type="button" onClick={() => setView("desktop")}>In the desktop</button>
        </div>
        <p className="nv-meta-note">Presentation lighting</p>
        <div className="appearance-controls" role="group" aria-label="Change website presentation lighting">
          {lighting.map((item) => (
            <button className={`selector${light === item.id ? " active" : ""}`} key={item.id} type="button" aria-pressed={light === item.id} onClick={() => setLight(item.id)}>
              <span style={{ background: item.color }} aria-hidden="true" /><strong>{item.name}</strong><i>{item.detail}</i>
            </button>
          ))}
        </div>
        <div className="preview-swatches" aria-hidden="true">
          {selected.bars.map((bar) => <i style={{ background: bar }} key={bar} />)}
        </div>
        <p className="nv-disclosure">These controls adjust the website presentation around a real screenshot—not Nyvorel&apos;s own theme. A faithful live theme-switching demo will require additional captures of genuine Nyvorel theme states.</p>
      </div>
    </div>
  );
}
