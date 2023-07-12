"use client";

import Canvas from "./_components/Canvas";
import { HexColorPicker } from "react-colorful";
import { useState, useRef } from "react";

export default function Home() {
  const [color, setColor] = useState("#000000");
  const colorPickerRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <Canvas color={color}></Canvas>
      <div className="fixed left-1/2 top-3/4 flex -translate-x-1/2 -translate-y-1/2 space-x-2 rounded-full border-2 bg-white p-3 shadow-lg">
        <button
          className="h-10 w-10 rounded-full border-4 shadow"
          style={{ backgroundColor: color }}
          onClick={() => {
            colorPickerRef.current?.classList.toggle("hidden");
          }}
        ></button>
        <div
          className="relative right-10 top-11 !m-0 hidden h-0 w-0"
          ref={colorPickerRef}
        >
          <HexColorPicker color={color} onChange={setColor}></HexColorPicker>
        </div>
        <button className="h-10 rounded-full border-2 px-3 text-xl shadow">
          Place
        </button>
      </div>
    </main>
  );
}
