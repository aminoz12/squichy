import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function SectionReveal({
  children,
  className = "",
  id,
}: SectionRevealProps) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
