import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type BadgeProps = ComponentPropsWithoutRef<"span">;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex max-w-28 shrink-0 items-center gap-1.5 truncate rounded border",
          "border-slate-200 bg-slate-50 px-1.5 py-0.5",
          "text-xs font-medium text-slate-600",
          className,
        ),
      )}
      {...props}
    />
  );
}
