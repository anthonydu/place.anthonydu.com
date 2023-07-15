import { useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import Select from "./Select";

export default function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<ReactZoomPanPinchRef>(null);
  const [select, setSelect] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0);
  const {
    color,
    placing,
    setPlacing,
    size,
    pixelSize,
  }: {
    color: string;
    placing: boolean;
    setPlacing: (placing: boolean) => void;
    size: number;
    pixelSize: number;
  } = props;

  // Place the colors
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    if (placing) {
      context.fillStyle = color;
      context.fillRect(
        select.x * pixelSize,
        select.y * pixelSize,
        pixelSize,
        pixelSize,
      );
      setPlacing(false);
    }
  }, [color, placing, setPlacing, select, pixelSize]);

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
    console.log(positionX, positionY, scale);
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
      initialScale={10 / pixelSize}
      minScale={1 / pixelSize}
      maxScale={50 / pixelSize}
      minPositionX={0}
      centerOnInit={true}
      onTransformed={onTransformed}
      limitToBounds={false}
      wheel={{ smoothStep: 0.01 / pixelSize }}
      doubleClick={{ disabled: true }}
      ref={wrapperRef}
    >
      <TransformComponent
        wrapperStyle={{
          width: props.width,
          height: props.height,
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
        className={`fixed left-1/2 top-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white px-10 py-1 font-semibold shadow-md`}
      >
        ({select.x},{select.y})&nbsp;{scale}x
      </p>
    </TransformWrapper>
  );
}
