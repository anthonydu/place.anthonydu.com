export default function Loading(props: any) {
  return (
    <div className={`flex flex-row gap-[2px] ${props.className}`}>
      <div className="h-[10px] w-[10px] animate-pulse rounded-full bg-slate-500"></div>
      <div className="h-[10px] w-[10px] animate-pulse rounded-full bg-slate-500"></div>
      <div className="h-[10px] w-[10px] animate-pulse rounded-full bg-slate-500"></div>
    </div>
  );
}
