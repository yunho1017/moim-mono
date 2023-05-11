const RANDOM_COLOR_PALETTE = [
  "#ff00f4",
  "#ff00a5",
  "#ff0050",
  "#f60606",
  "#f66606",
  "#ff9000",
  "#ffe300",
  "#bdf400",
  "#00f406",
  "#00f498",
  "#00efd9",
  "#00e9ff",
  "#00c7ff",
  "#3e00ff",
  "#6300ff",
  "#8c1dff",
  "#c01dff",
];

export default function getRandomColorOfLetter(letters: string) {
  return RANDOM_COLOR_PALETTE[
    (letters.charCodeAt(0) || 0) % RANDOM_COLOR_PALETTE.length
  ];
}
