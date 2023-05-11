export default function blockitForMessage(contents: Moim.Blockit.Blocks[]) {
  const textContents = contents.filter(item => item.type === "text");
  const content =
    textContents.length > 0
      ? textContents.reduce(
          (accResult: string, item: Moim.Blockit.ITextBlock) => {
            if (accResult) {
              return `${accResult}\n${item.content.trimRight()}`;
            }
            return item.content.trimRight();
          },
          "",
        )
      : undefined;
  const fileContents = contents.filter(item => item.type === "file");
  const files =
    fileContents.length > 0
      ? (fileContents[0] as Moim.Blockit.IFileBlock).files.map(file => file.id)
      : undefined;

  return {
    content: content === "" ? undefined : content,
    files,
  };
}
