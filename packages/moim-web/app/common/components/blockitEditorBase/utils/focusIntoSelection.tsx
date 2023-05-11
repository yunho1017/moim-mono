const option: ScrollIntoViewOptions = {
  block: "center",
  inline: "nearest",
};
export default function focusAndScrollIntoSelection() {
  const targetNode = window.getSelection()?.anchorNode;
  if (targetNode) {
    targetNode.nodeType !== Node.TEXT_NODE
      ? (targetNode as any).scrollIntoView(option)
      : targetNode.parentElement?.scrollIntoView(option);
  }
}

export function getSelection() {
  const selection = window.getSelection();
  return selection?.getRangeAt(0) || null;
}

export function restoreSelection(range: Range) {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
