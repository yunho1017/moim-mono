export default function hex2RGBA(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = parseInt(hex.slice(7, 9) || "FF", 16);
  return `rgba(${r},${g},${b},${(a / 255).toFixed(2)})`;
}
