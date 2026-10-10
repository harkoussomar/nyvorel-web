"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { landingScenes } from "@/lib/landing-scenes";

export function DesktopExplorer() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const scene = landingScenes[active];

  function setScene(next: number, shouldScroll = false) {
    setActive(next);
    if (shouldScroll) {
      stageRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center",
      });
    }
  }

  return (
    <>
      <div className="container" id="explore">
      <div
        className="showcase-stage"
        id="interactive-stage"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Nyvorel screenshot explorer. Focus this region and use the left or right arrow keys to change views."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            setActive((index) => (index + (event.key === "ArrowRight" ? 1 : -1) + landingScenes.length) % landingScenes.length);
          }
        }}
      >
        <div className="stage-rail">
          <span><i className="stage-led" aria-hidden="true" /> NYVOREL / EXPLORE MODE</span>
          <span>AUTHENTIC NYVOREL CAPTURES · VIEW {scene.number}/04</span>
        </div>
        <div className="screen-viewport">
          <picture className="scene-picture" key={scene.id}>
            <source media="(max-width: 540px)" srcSet={scene.mobileImage} />
            <Image
              className="real-screen"
              src={scene.image}
              alt={scene.alt}
              width={1918}
              height={1078}
              fetchPriority={active === 0 ? "high" : "auto"}
              loading="eager"
              unoptimized
              sizes="(max-width: 540px) 100vw, (max-width: 1280px) 94vw, 1280px"
            />
          </picture>
          <div className="screen-mask" aria-hidden="true" />
          <div className="screen-indicator"><span /> REAL NYVOREL UI · SCREENSHOT VIEWER</div>
        </div>
        <div className="stage-info">
          <div>
            <div className="stage-info-title"><span>{scene.number} / 04</span><strong>{scene.title}</strong></div>
            <p className="stage-info-sub">{scene.subtitle}</p>
          </div>
          <div className="stage-controls" role="group" aria-label="Select Nyvorel desktop screenshot">
            {landingScenes.map((item, index) => (
              <button className={`scene-btn${active === index ? " active" : ""}`} key={item.id} type="button" aria-pressed={active === index} onClick={() => setScene(index)}>
                <span>{item.number}</span> {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="stage-bottom">
          <span>ACTUAL CAPTURES, NOT A RUNNING LINUX SYSTEM. USE ← → WHILE VIEWER IS FOCUSED.</span>
          <a href="https://github.com/harkoussomar/nyvorel" target="_blank" rel="noopener noreferrer">Explore source ↗</a>
        </div>
      </div>
      </div>
      <section className="section container" id="discover" aria-labelledby="nv-discover-title">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="hairline" />01 / A closer look</div><h2 className="display-title" id="nv-discover-title">Every detail,<br /><em>in its place.</em></h2></div>
          <p>Nyvorel is more than its wallpaper. Discover the surfaces, controls, and operational tools that make the desktop feel like one coherent environment.<br /><a className="outline-link" href="#appearance">Explore appearance <span aria-hidden="true">↗</span></a></p>
        </div>
      <div className="discovery-head">
        <span><strong>THE EXPERIENCE</strong> / FOUR WAYS IN</span>
        <span>SELECT A CAPTURE TO VIEW ABOVE ↗</span>
      </div>
      <div className="discovery-grid">
        {landingScenes.map((item, index) => (
          <button className="discovery-item" aria-pressed={index === active} key={item.id} type="button" onClick={() => setScene(index, true)}>
            <span className="thumb">
              <Image src={`/showcase/v2/thumbs/${item.id}.webp`} width={560} height={315} alt="" unoptimized loading="lazy" sizes="(max-width: 700px) 46vw, 23vw" />
            </span>
            <span className="txt"><strong>{item.label === "Daily rhythm" ? "Daily rhythm" : item.label}</strong><span>{item.number} ↗</span></span>
            <small>{item.description}</small>
          </button>
        ))}
      </div>
      <p className="nv-disclosure">These are authentic Nyvorel captures. Mobile frames use crops of the original screenshots, without changing the shell UI. Choosing a scene changes the image, not a running Linux desktop.</p>
      </section>
    </>
  );
}
