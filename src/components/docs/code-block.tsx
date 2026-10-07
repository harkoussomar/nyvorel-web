type CodeBlockProps = {
  children: string;
  label?: string;
};

export function CodeBlock({ children, label = "shell" }: CodeBlockProps) {
  return (
    <div className="docCode">
      <div className="docCodeBar">
        <span>{label}</span>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
