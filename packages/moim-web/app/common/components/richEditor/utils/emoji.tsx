import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";
import focusAndScrollIntoSelection from "./focusIntoSelection";

export function insertEmoji(
  quill: Quill | null | undefined,
  colons: string,
  storedRange?: RangeStatic,
) {
  if (quill) {
    const range = quill.getSelection() ||
      storedRange || { index: 0, length: 0 };
    const delta = new Delta()
      .retain(range.index)
      .delete(range.length)
      .insert({
        emoji: {
          colons,
        },
      })
      .insert(" ");

    quill.updateContents(delta, "user");

    requestAnimationFrame(() => {
      const next = range.index + 2;
      quill.setSelection(next, 0, "silent");
      focusAndScrollIntoSelection();
    });
  }
}
