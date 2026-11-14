import type { ComponentPropsWithoutRef } from "react";

export function Container({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] px-5 md:px-10 xl:px-16 ${className}`}
      {...props}
    />
  );
}
