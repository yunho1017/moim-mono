import * as React from "react";

import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { data, startIconUpload, successIconUpload, failIconUpload } = props;

  const handleSetIconBlob = React.useCallback(
    (blob: Blob | null) => {
      data.handler?.(blob);
    },
    [data.handler],
  );

  const handleStartUploadIcon = React.useCallback(() => {
    startIconUpload();
  }, [startIconUpload]);

  const handleFailUploadIcon = React.useCallback(() => {
    failIconUpload();
  }, [failIconUpload]);

  const handleSuccessUploadIcon = React.useCallback(
    ({
      blob,
      preview,
    }: {
      blob: Blob | null;
      preview: Moim.Group.IGroupImagePreview;
    }) => {
      successIconUpload(preview);
      handleSetIconBlob(blob);
    },
    [handleSetIconBlob, successIconUpload],
  );

  return {
    handleSetIconBlob,
    handleStartUploadIcon,
    handleSuccessUploadIcon,
    handleFailUploadIcon,
  };
}
