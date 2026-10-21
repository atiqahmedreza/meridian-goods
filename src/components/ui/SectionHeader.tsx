import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        centered ? "text-center sm:text-center sm:justify-center" : ""
      }`}
    >
      <div className={centered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-ink-muted">{description}</p>
        )}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
      {action && centered && <div className="mt-2">{action}</div>}
    </div>
  );
}
