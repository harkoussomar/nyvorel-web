"use client";

import { useEffect, useRef, useState } from "react";

type CodeBlockProps = {
  children: string;
  label?: string;
};

export function CodeBlock({ children, label = "shell" }: CodeBlockProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState("idle"), 2000);
  }

  return (
    <div className="docCode">
      <div className="docCodeBar">
        <span className="docCodeLanguage"><span aria-hidden="true" className="docCodeLed" />{label}</span>
        <button type="button" className="docCodeCopy" onClick={copy} aria-label={copyState === "copied" ? "Code copied" : "Copy code to clipboard"}>
          <span aria-hidden="true">{copyState === "copied" ? "✓" : copyState === "failed" ? "!" : "⧉"}</span>
          {copyState === "copied" ? "Copied" : copyState === "failed" ? "Select text" : "Copy"}
        </button>
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}
