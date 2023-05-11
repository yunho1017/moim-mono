import * as React from "react";

import MediaUploadInput from "app/modules/mediaUpload/input";

export type IHookProps = ReturnType<typeof useProps>;

export default function useProps() {
  const mediaUploadInputRef: React.RefObject<MediaUploadInput> = React.useRef(
    null,
  );

  return {
    mediaUploadInputRef,
  };
}
