export const sizeMap = new Map<Moim.DesignSystem.Size, number>([
  ["xxl", 200],
  ["xl", 80],
  ["l", 48],
  ["m", 36],
  ["s", 24],
  ["xs", 18],
]);

export const borderRadiusMap = new Map<Moim.DesignSystem.Size, number>([
  ["xxl", 8],
  ["l", 4],
  ["m", 4],
  ["s", 2],
  ["xs", 2],
]);

export const selectedBorderWidthMap = new Map<Moim.DesignSystem.Size, number>([
  ["l", 2],
  ["m", 2],
  ["s", 1.5],
  ["xs", 1],
]);

export const selectedBorderRadiusMap = new Map<Moim.DesignSystem.Size, number>([
  ["l", 2],
  ["m", 2],
  ["s", 2],
  ["xs", 1],
]);

export const fontSizeMap = new Map<Moim.DesignSystem.Size, number>([
  ["xxl", 140],
  ["xl", 40],
  ["l", 32],
  ["m", 24],
  ["s", 17],
  ["xs", 12],
]);

export const fontWeightMap = new Map<
  Moim.DesignSystem.Size,
  (theme: Moim.Theme.ITheme) => number
>([
  ["xxl", theme => theme.font.medium],
  ["l", theme => theme.font.medium],
  ["m", theme => theme.font.medium],
  ["s", theme => theme.font.medium],
  ["xs", theme => theme.font.regular],
]);
