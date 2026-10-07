import type { ReactNode } from "react";

type CalloutProps = {
  title: string;
  children: ReactNode;
  tone?: "note" | "important" | "safe";
};

export function Callout({
  title,
  children,
  tone = "note",
}: CalloutProps) {
  return (
    <aside className={`docCallout docCallout-${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
