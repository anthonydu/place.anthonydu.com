"use client";

import { useState } from "react";
import Canvas from "./_components/Canvas";
import ColorPicker from "./_components/ColorPicker";
import { ColorResult } from "react-color";

// TODO: Create color picker from scratch
// TODO: Make more mobile friendly
// TODO: Click to move to clicked point

export default function Home() {
  const [color, setColor] = useState("");
  const [selecting, setSelecting] = useState(false);
  const [placing, setPlacing] = useState(false);

  return (
    <main className="font-['Trebuchet_MS']">
      <Canvas
        width="100vw"
        height="100vh"
        color={color}
        placing={placing}
        setPlacing={setPlacing}
      ></Canvas>
      <button
        className={`fixed bottom-5 left-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-10 py-2 text-xl font-semibold shadow`}
        onClick={() => setSelecting(true)}
      >
        Place a Pixel
      </button>
      <ColorPicker
        className="fixed bottom-0 left-0"
        selecting={selecting}
        onChange={(color: ColorResult) => {
          setColor(color.hex);
          setPlacing(true);
          setSelecting(false);
        }}
        onCancel={() => {
          setSelecting(false);
        }}
      ></ColorPicker>
    </main>
  );
}
