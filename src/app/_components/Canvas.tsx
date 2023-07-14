"use client";

import { useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import Select from "./Select";

export default function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [select, setSelect] = useState({ x: 0, y: 0 });
  const CANVAS_SIZE = 100;
  const {
    color,
    placing,
    setPlacing,
  }: {
    color: string;
    placing: boolean;
    setPlacing: (placing: boolean) => void;
  } = props;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    if (placing) {
      context.fillStyle = color;
      context.fillRect(select.x, select.y, 1, 1);
      setPlacing(false);
    }
  }, [color, placing, setPlacing, select]);

  function onTransformed(
    _ref: ReactZoomPanPinchRef,
    state: {
      scale: number;
      positionX: number;
      positionY: number;
    },
  ) {
    setSelect({
      x:
        Math.floor(
          (window.innerWidth / 2 - state.positionX) / state.scale + 0.5,
        ) - 1,
      y:
        Math.floor(
          (window.innerHeight / 2 - state.positionY) / state.scale + 0.5,
        ) - 1,
    });
  }

  return (
    <TransformWrapper
      initialScale={10}
      maxScale={30}
      centerOnInit={true}
      onTransformed={onTransformed}
      limitToBounds={false}
      wheel={{ smoothStep: 0.01 }}
    >
      <TransformComponent
        wrapperStyle={{ width: props.width, height: props.height }}
        contentStyle={{ border: "0.5px solid black" }}
      >
        <canvas
          className="shadow-2xl"
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{ imageRendering: "pixelated" }}
        ></canvas>
        <Select
          className={`absolute h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 scale-[0.1]`}
          color={props.color}
          style={{
            left: select.x + 0.5,
            top: select.y + 0.5,
          }}
        ></Select>
      </TransformComponent>
    </TransformWrapper>
  );
}
