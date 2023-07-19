export default function Select(props: any) {
  return (
    <div
      className={`h-[10px] w-[10px] origin-top-left opacity-50 ${props.className}`}
      style={props.style}
    >
      <div className={`absolute left-0 top-0 grid h-full w-full grid-cols-2`}>
        <div className={`mb-px mr-px border-l border-t border-black`}></div>
        <div className={`mb-px ml-px border-r border-t border-black`}></div>
        <div className={`mr-px mt-px border-b border-l border-black`}></div>
        <div className={`ml-px mt-px border-b border-r border-black`}></div>
      </div>
      <div className="absolute left-0 top-0 grid h-full w-full grid-cols-2">
        <div className="absolute -left-px -top-px h-[5px] w-[5px] border-l border-t border-white"></div>
        <div className="absolute -right-px -top-px h-[5px] w-[5px] border-r border-t border-white"></div>
        <div className="absolute -bottom-px -left-px h-[5px] w-[5px] border-b border-l border-white"></div>
        <div className="absolute -bottom-px -right-px h-[5px] w-[5px] border-b border-r border-white"></div>
      </div>
    </div>
  );
}
