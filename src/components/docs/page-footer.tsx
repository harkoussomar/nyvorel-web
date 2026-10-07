import Link from "next/link";

type PageFooterProps = {
  previous?: {
    href: string;
    title: string;
  };
  next?: {
    href: string;
    title: string;
  };
};

export function PageFooter({ previous, next }: PageFooterProps) {
  return (
    <nav className="docPageFooter" aria-label="Documentation pagination">
      {previous ? (
        <Link className="docPageFooterItem" href={previous.href}>
          <span>Previous</span>
          <strong>← {previous.title}</strong>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link className="docPageFooterItem docPageFooterNext" href={next.href}>
          <span>Next</span>
          <strong>{next.title} →</strong>
        </Link>
      ) : null}
    </nav>
  );
}
