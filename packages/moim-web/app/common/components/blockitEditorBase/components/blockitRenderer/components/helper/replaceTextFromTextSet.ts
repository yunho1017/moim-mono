import { parseCommonFormat } from "common/helpers/moimDown";

export default function replaceTextFromTextSet({
  locale,
  textSets,
  text,
}: {
  locale: "ko" | "en";
  text?: string;
  textSets?: Record<string, Moim.Group.IGroupTextSet>;
}) {
  if (!text) {
    return undefined;
  }

  const parsedResult = parseCommonFormat(text);
  let newText = text;
  parsedResult.forEach(item => {
    let replaceData = item.fallback;

    switch (item.type) {
      case "text_sets": {
        const textSet = textSets?.[item.value];
        if (textSet) {
          replaceData = textSet[locale].singular;
        }
        break;
      }
    }

    newText = newText.replace(item.origin, replaceData);
  });

  return newText;
}
