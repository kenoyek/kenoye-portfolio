import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "content" | "wide" | "narrow";
};

const widths = {
  narrow: "max-w-3xl",
  content: "max-w-[1120px]",
  wide: "max-w-7xl",
};

export const Container = ({ children, className, size = "content" }: ContainerProps) => (
  <div className={cn("mx-auto w-full px-5 sm:px-6", widths[size], className)}>{children}</div>
);
