"use client";

import { useRef, useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import Bar from "./Bar";

export default function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000000");
  const [select, setSelect] = useState({ x: 0, y: 0 });
  const CANVAS_SIZE = 100;

  function onTransformed(
    ref: ReactZoomPanPinchRef,
    state: {
      scale: number;
      positionX: number;
      positionY: number;
    },
  ) {
    setSelect({
      x: Math.floor((window.innerWidth / 2 - state.positionX) / state.scale),
      y: Math.floor((window.innerHeight / 2 - state.positionY) / state.scale),
    });

    console.log(
      state.positionX,
      state.positionY,
      window.innerWidth,
      window.innerHeight,
    );
  }

  function onPlace() {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    context.fillStyle = color;
    context.fillRect(select.x, select.y, 1, 1);
  }

  return (
    <TransformWrapper
      initialScale={10}
      maxScale={30}
      centerOnInit={true}
      onTransformed={onTransformed}
      limitToBounds={false}
      wheel={{ smoothStep: 0.01 }}
      minPositionX={-1300}
      minPositionY={-1400}
      maxPositionX={window.innerWidth / 2}
      maxPositionY={window.innerHeight / 2}
    >
      <TransformComponent wrapperStyle={{ width: "100vw", height: "100vh" }}>
        <canvas
          className="border-[0.5px] shadow-2xl"
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{ imageRendering: "pixelated" }}
        ></canvas>
        <div
          className={`absolute box-content h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 scale-[0.1] border-2`}
          style={{
            left: select.x + 1,
            top: select.y + 1,
            backgroundColor: color,
          }}
        ></div>
      </TransformComponent>
      <Bar
        className="fixed bottom-5 left-1/2 flex -translate-x-1/2 -translate-y-1/2"
        color={color}
        setColor={setColor}
        onPlace={onPlace}
      ></Bar>
    </TransformWrapper>
  );
}
