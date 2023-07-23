import { useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import Select from "./Select";

export default function Canvas({
  width,
  height,
  size,
  pixelSize,
  select,
  setSelect,
  changeListener,
  fetchCanvas,
}: {
  width: string;
  height: string;
  size: number;
  pixelSize: number;
  select: { x: number; y: number };
  setSelect: (select: { x: number; y: number }) => void;
  changeListener: any;
  fetchCanvas: () => Promise<[{ x: number; y: number; color: number }]>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<ReactZoomPanPinchRef>(null);
  const [scale, setScale] = useState(0);

  // Place the colors
  useEffect(() => {
    const context = canvasRef.current?.getContext("2d")!;
    context.clearRect(0, 0, size, size);
    fetchCanvas().then((rows) => {
      rows.map(({ x, y, color }) => {
        context.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
        context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeListener]);

  // Calculate the selected pixel
  function onTransformed(
    _ref: ReactZoomPanPinchRef,
    state: {
      positionX: number;
      positionY: number;
      scale: number;
    },
  ) {
    const { positionX, positionY, scale } = state;
    setSelect({
      x: Math.floor((window.innerWidth / 2 - positionX) / scale / pixelSize),
      y: Math.floor((window.innerHeight / 2 - positionY) / scale / pixelSize),
    });
    setScale(scale);
  }

  // Handle click to focus on pixel
  let deltaX: number, deltaY: number;

  function onMouseDown(e: React.MouseEvent) {
    [deltaX, deltaY] = [e.clientX, e.clientY];
  }

  function onMouseUp(e: React.MouseEvent) {
    deltaX = e.clientX - deltaX;
    deltaY = e.clientY - deltaY;
  }

  function onClick(e: React.MouseEvent) {
    if (deltaX === 0 && deltaY === 0) {
      wrapperRef.current!.setTransform(
        window.innerWidth / 2 - e.nativeEvent.offsetX * scale,
        window.innerHeight / 2 - e.nativeEvent.offsetY * scale,
        scale,
      );
    }
  }

  return (
    <TransformWrapper
      initialScale={25 / pixelSize}
      minScale={1 / pixelSize}
      maxScale={50 / pixelSize}
      centerOnInit={true}
      onTransformed={onTransformed}
      limitToBounds={false}
      wheel={{ smoothStep: 0.01 / pixelSize }}
      doubleClick={{ disabled: true }}
      ref={wrapperRef}
    >
      <TransformComponent
        wrapperStyle={{
          width: width,
          height: height,
          backgroundColor: "dimgray",
        }}
      >
        <canvas
          ref={canvasRef}
          width={size * pixelSize}
          height={size * pixelSize}
          style={{ backgroundColor: "white", imageRendering: "pixelated" }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onClick={onClick}
        ></canvas>
        <Select
          style={{
            position: "absolute",
            scale: 0.1 * pixelSize,
            left: select.x * pixelSize,
            top: select.y * pixelSize,
            pointerEvents: "none",
          }}
        ></Select>
      </TransformComponent>
      <p
        className={`absolute left-1/2 top-top-safe-6 -translate-x-1/2 rounded-full bg-white px-10 py-1 font-semibold shadow-md`}
      >
        ({select.x},{select.y})&nbsp;{scale}x
      </p>
    </TransformWrapper>
  );
}
