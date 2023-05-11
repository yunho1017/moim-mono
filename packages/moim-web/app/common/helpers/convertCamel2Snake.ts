export default function convertCamel2Snake(str: string) {
  return str.split("").reduce((result, char, index) => {
    if (index > 0 && char === char.toUpperCase()) {
      result += "_";
    }
    result += char.toLowerCase();

    return result;
  }, "");
}
