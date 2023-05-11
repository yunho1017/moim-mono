import mergeWith from "lodash/mergeWith";

export function mergeArrayUniq<T>(
  objValue: T[],
  srcValue: T[],
): T[] | undefined {
  if (Array.isArray(objValue)) {
    return Array.from<T>(new Set<T>(objValue.concat(srcValue)));
  }
}

export default function mergeWithArrayConcatUniq<T = any>(
  objValue: T,
  ...srcValues: T[]
): T {
  return mergeWith(objValue, ...srcValues, mergeArrayUniq);
}
