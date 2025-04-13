
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {}

export function Grid({ className, ...props }: GridProps) {
  return (
    <div className={cn("grid", className)} {...props} />
  );
}
