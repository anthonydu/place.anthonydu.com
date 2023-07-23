import { ComponentProps } from "react";

export default function Modal({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`fixed left-1/2 top-1/2 flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[rgba(0,0,0,0.3)] ${className}`}
      {...props}
    >
      <div className="rounded-lg border bg-white p-10 text-center">
        {children}
      </div>
    </div>
  );
}
