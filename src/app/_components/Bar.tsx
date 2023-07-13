import { useRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

export default function Bar(props: any) {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={props.className}>
      <div
        className={`flex space-x-2 rounded-full border-2 bg-white p-3 shadow-lg`}
      >
        <button
          className="h-10 w-10 rounded-full border-4 shadow"
          style={{ backgroundColor: props.color }}
          onClick={() => colorPickerRef.current?.classList.toggle("invisible")}
        ></button>
        <button
          className="h-10 rounded-full border-2 px-3 text-xl shadow"
          onClick={props.onPlace}
        >
          Place
        </button>
      </div>
      <div
        className={`invisible absolute bottom-16 grid w-[200px] grid-cols-2 divide-x divide-y overflow-hidden rounded-lg border shadow-lg`}
        ref={colorPickerRef}
      >
        <HexColorPicker
          className="col-span-2 [&>*:last-child]:!rounded-b-none"
          color={props.color}
          onChange={props.setColor}
        ></HexColorPicker>
        <HexColorInput
          className="inline px-2 py-1"
          placeholder="Input Hex Color Code"
          color={props.color}
          onChange={props.setColor}
        ></HexColorInput>
        <button
          className="inline bg-white px-2 py-1"
          onClick={() => colorPickerRef.current?.classList.toggle("invisible")}
        >
          Done
        </button>
      </div>
    </div>
  );
}
