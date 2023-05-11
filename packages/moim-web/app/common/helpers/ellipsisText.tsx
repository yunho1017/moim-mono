function ellipsisText(
  text: string,
  maxLength: number,
  ellipsis: string = "...",
): string {
  if (maxLength >= text.length) {
    return text;
  }

  return `${text.slice(0, maxLength)}${ellipsis}`;
}

export default ellipsisText;
