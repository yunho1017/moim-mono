import * as React from "react";

export default function useFileURL() {
  const [file, setFile] = React.useState<File | Blob | null>(null);
  const imageSrc = React.useMemo(() => file && URL.createObjectURL(file), [
    file,
  ]) as string;
  React.useEffect(
    () => () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    },
    [imageSrc],
  );

  return {
    file,
    setFile,
    imageSrc,
  };
}
