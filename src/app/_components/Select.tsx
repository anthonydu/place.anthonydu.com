export default function Select(props: any) {
  return (
    <div {...props}>
      <div className={`grid h-full w-full grid-cols-2`}>
        <div className={`mb-px mr-px border-l border-t border-black`}></div>
        <div className={`mb-px ml-px border-r border-t border-black`}></div>
        <div className={`mr-px mt-px border-b border-l border-black`}></div>
        <div className={`ml-px mt-px border-b border-r border-black`}></div>
      </div>
    </div>
  );
}
