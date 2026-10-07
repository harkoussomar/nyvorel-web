"use client";

import { useState } from "react";

type CopyCommandProps = {
  command: string;
};

export function CopyCommand({ command }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className="copyButton"
      type="button"
      onClick={copy}
      aria-label={copied ? "Command copied" : "Copy install command"}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
