export const FILE_NAME_COLLATOR = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export function makeOrderedFiles(
  files: FileList | File[],
): Moim.Upload.IUploadFileMeta[] {
  const arr = Array.from(files)
    .map((i, index) => ({
      file: i,
      priorityId: `priority-${index}`,
      priority: index + 1,
    }))
    .sort((x, y) => {
      if (y.file.lastModified === x.file.lastModified) {
        return FILE_NAME_COLLATOR.compare(x.file.name, y.file.name);
      }
      return y.file.lastModified - x.file.lastModified;
    });

  return [...arr].sort((x, y) => x.priority - y.priority);
}
