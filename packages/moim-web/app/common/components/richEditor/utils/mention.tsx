import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";
import focusAndScrollIntoSelection from "./focusIntoSelection";

export function insertMention(
  quill: Quill | null | undefined,
  payload: {
    id: Moim.Id;
    displayText: string;
  },
  storedRange?: RangeStatic,
) {
  if (!quill) return;
  const range = quill.getSelection() || storedRange || { index: 0, length: 0 };

  const delta = new Delta()
    .retain(range.index)
    .delete(range.length)
    .insert({ mention: payload })
    .insert(" ");
  quill.updateContents(delta, "user");

  requestAnimationFrame(() => {
    const next = range.index + 2;
    quill.setSelection(next, 0, "silent");
    focusAndScrollIntoSelection();
  });
}

export function insertUserMentionDenotation(
  quill: Quill | null | undefined,
  storedRange?: RangeStatic,
) {
  if (!quill) return;
  quill.root.focus();
  requestAnimationFrame(() => {
    const range = quill.getSelection() ||
      storedRange || { index: 0, length: 0 };

    quill.insertText(range.index, "@", "api");
    quill.setSelection(range.index + 1, range.length, "silent");
  });
}
