const engagementFormatMap_KO = new Map<number, string>([
  [1000000000000, "조"],
  [100000000, "억"],
  [10000, "만"],
]);

const engagementFormatMap_EN = new Map<number, string>([
  [1000000000, "B"],
  [1000000, "M"],
  [1000, "K"],
]);

export default function actionCountFormat(
  value: number,
  locale?: string,
): string {
  const targetMap =
    locale === "ko" ? engagementFormatMap_KO : engagementFormatMap_EN;
  for (const [ref, format] of targetMap) {
    if (value > ref) {
      return `${Math.floor(value / (ref / 10)) / 10}${format}`;
    }
  }
  return String(value);
}
