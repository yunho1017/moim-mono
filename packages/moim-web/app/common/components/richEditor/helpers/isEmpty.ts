export default function isEmpty(contents: Moim.Blockit.Blocks[]) {
  const textContents = contents.filter(
    content => content.type === "text",
  ) as Moim.Blockit.ITextBlock[];
  const fileContents = contents.filter(
    content => content.type === "file",
  ) as Moim.Blockit.IFileBlock[];
  const imageContents = contents.filter(
    content => content.type === "image",
  ) as Moim.Blockit.IFileBlock[];
  const linkPreviewContents = contents.filter(
    content => content.type === "link-preview",
  ) as Moim.Blockit.ILinkPreviewBlock[];

  const isEmptyText =
    textContents.length === 0 ||
    !textContents.map(content => content.content).join("");
  const isEmptyFile = fileContents.length === 0;
  const isEmptyImageFile = imageContents.length === 0;
  const isEmptyLinkPreview = linkPreviewContents.length === 0;

  return {
    isEmptyText,
    isEmptyFile,
    isEmptyImageFile,
    isEmptyLinkPreview,
  };
}
