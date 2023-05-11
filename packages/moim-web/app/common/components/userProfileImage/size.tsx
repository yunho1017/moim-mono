export const sizeMap = new Map<Moim.DesignSystem.Size, number>([
  ["xl", 80],
  ["l", 48],
  ["m", 36],
  ["s", 24],
  ["xs", 18],
]);

export const onlineStatusSizeMap = new Map<Moim.DesignSystem.Size, number>([
  ["xl", 18],
  ["l", 12],
  ["m", 8],
  ["s", 6],
  ["xs", 4],
]);

export const onlineStatusPositionMap = new Map<
  Moim.DesignSystem.Size,
  { right: number; bottom: number }
>([
  ["xl", { bottom: 3, right: 3 }],
  ["l", { bottom: 2, right: 2 }],
  ["m", { bottom: 2, right: 2 }],
  ["s", { bottom: 1, right: 1 }],
  ["xs", { bottom: 1, right: 1 }],
]);
