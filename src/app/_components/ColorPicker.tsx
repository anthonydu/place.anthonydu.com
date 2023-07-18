export default function ColorPicker(props: any) {
  const {
    colors,
    onPick,
    onCancel,
  }: {
    colors: string[];
    onPick: (color: number) => void;
    onCancel: () => void;
  } = props;

  return (
    <div
      className={`flex flex-col justify-center space-y-5 bg-white p-5 shadow-2xl ${props.className}`}
    >
      <ul className="grid grid-cols-4 justify-center gap-2 sm:grid-cols-8 md:grid-cols-[repeat(16,1fr)] 2xl:grid-cols-[repeat(32,minmax(0,4rem))]">
        {colors.map((color) => {
          return (
            <li
              className={`h-8 w-auto border`}
              style={{ backgroundColor: color }}
              key={color}
              onClick={() => onPick(parseInt(color.split("#")[1], 16))}
            ></li>
          );
        })}
      </ul>
      <button
        className="mx-auto w-fit rounded-full border border-black px-10 py-1 font-semibold"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}
