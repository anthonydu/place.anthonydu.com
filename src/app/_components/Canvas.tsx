"use client";

import { useRef, useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

export default function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const container = containerRef.current!;

    container.scrollTo(
      600 - window.innerWidth / 2,
      600 - window.innerHeight / 2,
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const container = containerRef.current!;

    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const scaledX = event.clientX - rect.left;
      const scaledY = event.clientY - rect.top;
      const canvasX = Math.floor(scaledX / 10);
      const canvasY = Math.floor(scaledY / 10);

      setX(rect.left + canvasX * 10 + container.scrollLeft);
      setY(rect.top + canvasY * 10 + container.scrollTop);
    });
  });

  return (
    <ScrollContainer
      className="relative h-screen w-screen"
      innerRef={containerRef}
    >
      <canvas
        className="m-[100px] h-[1000px] w-[1000px] shadow-2xl"
        ref={canvasRef}
        width={100}
        height={100}
        style={{ imageRendering: "pixelated" }}
      ></canvas>
      <div
        className={`absolute z-50 h-[10px] w-[10px] border shadow`}
        style={{ left: x, top: y, backgroundColor: props.color }}
      ></div>
    </ScrollContainer>
  );
}
