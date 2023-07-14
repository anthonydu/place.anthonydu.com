import { useEffect, useState } from "react";
import { SwatchesPicker } from "react-color";

export default function ColorPicker(props: any) {
  const [windowWidth, setWindowWidth] = useState<number>();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <div
      className={`${props.className} ${
        props.selecting
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-[100px] opacity-0"
      } flex flex-col bg-white transition-all`}
    >
      <SwatchesPicker
        className={`
          [&>div>:nth-child(1)]:!shadow-none
          [&>div>:nth-child(2)>div>div>div]:!m-[5px]
          [&>div>:nth-child(2)>div>div>div]:!p-0
          [&>div>:nth-child(2)>div>div]:m-auto
          [&>div>:nth-child(2)>div>div]:scale-150
          [&>div>:nth-child(2)>div>div]:!p-0
          [&>div>:nth-child(2)>div]:flex 
          [&>div>:nth-child(2)>div]:content-center
          [&>div>:nth-child(2)>div]:justify-center
          [&>div>:nth-child(2)>div]:!overflow-auto
          [&>div]:w-full 
          [&_[title^="#"]]:!rounded-none
          [&_[title^="#"]]:border
          `}
        color={props.color}
        width={windowWidth}
        height={100}
        colors={[
          ["#ff4500"],
          ["#ffa800"],
          ["#ffd635"],
          ["#00a268"],
          ["#7eed56"],
          ["#2450a4"],
          ["#3690ea"],
          ["#51e9f4"],
          ["#811e9f"],
          ["#b44ac0"],
          ["#ff99aa"],
          ["#9c6926"],
          ["#000000"],
          ["#898d90"],
          ["#d4d7d9"],
          ["#ffffff"],
        ]}
        onChange={props.onChange}
      ></SwatchesPicker>
      <button
        className="m-auto -translate-y-4 rounded-full border border-black px-10 py-2 font-semibold"
        onClick={props.onCancel}
      >
        Cancel
      </button>
    </div>
  );
}
