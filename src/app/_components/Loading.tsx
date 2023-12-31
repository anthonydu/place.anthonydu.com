import { ComponentProps } from "react";

export default function Loading({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={`flex flex-row gap-[2px] ${className}`} {...props}>
      <div className="h-[10px] w-[10px] animate-pulse rounded-full bg-slate-500"></div>
      <div className="h-[10px] w-[10px] animate-pulse rounded-full bg-slate-500"></div>
      <div className="h-[10px] w-[10px] animate-pulse rounded-full bg-slate-500"></div>
    </div>
  );
}
