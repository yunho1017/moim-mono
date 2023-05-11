export default function getMediaRatioWidthAndHeight({
  ratio,
  width,
  height,
  maxWidth,
  maxHeight,
}: {
  ratio: number;
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
}) {
  let ratioWidth = width;
  let ratioHeight = height;

  if (ratioWidth > maxWidth) {
    ratioWidth = maxWidth;
    ratioHeight = maxWidth * ratio;
  }

  if (ratioHeight > maxHeight) {
    ratioWidth = Math.floor(maxHeight / ratio);
    ratioHeight = maxHeight;
  }

  return { width: Math.floor(ratioWidth), height: Math.floor(ratioHeight) };
}
