import * as React from "react";
import useDevicePixcelRatio from "common/hooks/useDevicePixelRatio";

interface IProps {
  size: number;
  stroke: number;
  backgroundColor: string;
  activeColor: string;
  padding: number;
  percentage?: number; // 0 ~ 1
}

export default function CircleCanvas({
  size,
  stroke,
  backgroundColor,
  activeColor,
  padding,
  percentage,
}: IProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const ratio = useDevicePixcelRatio();
  React.useLayoutEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext(
        "2d",
      ) as CanvasRenderingContext2D;
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      context.scale(ratio, ratio);
      context.globalCompositeOperation = "source-over";
      const value = percentage === undefined ? 0.25 : percentage;
      const center = size / 2;
      // Draw background
      context.fillStyle = backgroundColor;
      context.beginPath();
      context.moveTo(center, center);
      context.arc(center, center, center - padding, 0, Math.PI * 2);
      context.fill();
      context.closePath();
      // Draw indicator
      context.fillStyle = activeColor;
      context.beginPath();
      context.moveTo(center, center);
      context.arc(
        center,
        center,
        center - padding,
        Math.PI * 1.5,
        Math.PI * (1.5 + 2 * value),
        false,
      );
      context.fill();
      context.closePath();
      // Clear center
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.moveTo(center, center);
      context.arc(center, center, center - padding - stroke, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    }
  }, [size, ratio, backgroundColor, activeColor, percentage, padding, stroke]);
  return <canvas width={size * ratio} height={size * ratio} ref={canvasRef} />;
}
