"use client";

import { useState } from "react";
import Canvas from "./_components/Canvas";
import ColorPicker from "./_components/ColorPicker";

export default function Home() {
  const [color, setColor] = useState("");
  const [selecting, setSelecting] = useState(false);
  const [placing, setPlacing] = useState(false);

  return (
    <main className="font-['Trebuchet_MS']">
      <Canvas
        width="100vw"
        height="100vh"
        size={500}
        pixelSize={10}
        color={color}
        placing={placing}
        setPlacing={setPlacing}
      ></Canvas>
      <button
        className={`fixed bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-10 py-1 font-semibold shadow-md`}
        onClick={() => setSelecting(true)}
      >
        Place&nbsp;a&nbsp;Pixel
      </button>
      <ColorPicker
        className={`${
          selecting
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-[100px] opacity-0"
        } fixed bottom-0 left-0 w-screen transition-all`}
        colors={[
          "#6d001a",
          "#be0039",
          "#ff4500",
          "#ffa800",
          "#ffd635",
          "#fff8b8",
          "#00a368",
          "#00cc78",
          "#7eed56",
          "#00756f",
          "#009eaa",
          "#00ccc0",
          "#2450a4",
          "#3690ea",
          "#51e9f4",
          "#493ac1",
          "#6a5cff",
          "#94b3ff",
          "#811e9f",
          "#b44ac0",
          "#e4abff",
          "#de107f",
          "#ff3881",
          "#ff99aa",
          "#6d482f",
          "#9c6926",
          "#ffb470",
          "#000000",
          "#515252",
          "#898d90",
          "#d4d7d9",
          "#ffffff",
        ]}
        selecting={selecting}
        onPick={(color: string) => {
          setColor(color);
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
