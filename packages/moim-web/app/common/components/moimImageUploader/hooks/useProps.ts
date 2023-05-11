import * as React from "react";
import { IProps } from "../";

import { DEFAULT_DENY_TYPE } from "common/components/moimImageUploader/constants";
import useOpenState from "common/hooks/useOpenState";
import { IImageCropperRef } from "common/components/imageCropper";
import useFileURL from "common/hooks/useFileURL";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { denyTypes: propDenyType } = props;
  const denyTypes = propDenyType ?? DEFAULT_DENY_TYPE;

  const {
    file: originalIcon,
    setFile: setOriginalIcon,
    imageSrc: originalIconSrc,
  } = useFileURL();
  const [isLoading, setIsLoading] = React.useState(false);
  const imageCropperRef: React.RefObject<IImageCropperRef> = React.useRef(null);

  const {
    isOpen: isOpenCropper,
    open: openCropper,
    close: closeCropper,
  } = useOpenState();

  return {
    ...props,
    imageCropperRef,
    denyTypes,
    isOpenCropper,
    openCropper,
    closeCropper,
    originalIcon,
    setOriginalIcon,
    originalIconSrc,
    isLoading,
    setIsLoading,
  };
}
