import * as React from "react";
import { decode } from "blurhash";

interface IProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  hash?: string;
  width?: number;
  height?: number;
  punch?: number;
}

function BlurHashCanvas({
  hash,
  width = 128,
  height = 128,
  punch,
  ...rest
}: IProps) {
  const w = parseInt(width.toFixed(0), 10);
  const h = parseInt(height.toFixed(0), 10);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useLayoutEffect(() => {
    if (hash && canvasRef.current) {
      try {
        const image = decode(hash, w, h, punch);
        const ctx = canvasRef.current.getContext(
          "2d",
        ) as CanvasRenderingContext2D;
        const imageData = ctx.createImageData(w, h);
        imageData.data.set(image);
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.putImageData(imageData, 0, 0);
      } catch (err) {
        console.log(">>>>> [SYS] error occurred", err);
      }
    }
  }, [hash, punch, w, h]);
  return <canvas {...rest} height={w} width={h} ref={canvasRef} />;
}

export default React.memo(BlurHashCanvas);
