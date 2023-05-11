import * as React from "react";
import { IProps } from "../";
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import MediaUploadInput from "app/modules/mediaUpload/input";
import { DEFAULT_DENY_TYPE } from "common/components/moimIconUploader/constants";
import useOpenState from "common/hooks/useOpenState";
import { IImageCropperRef } from "common/components/imageCropper";
import useFileURL from "common/hooks/useFileURL";
import { cropGroupIcon } from "app/actions/group";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { denyTypes: propDenyType } = props;
  const denyTypes = propDenyType ?? DEFAULT_DENY_TYPE;

  const [cropBlob, setCropBlob] = React.useState<Blob | null>(null);
  const {
    file: originalIcon,
    setFile: setOriginalIcon,
    imageSrc: originalIconSrc,
  } = useFileURL();
  const { setFile: setCropIcon, imageSrc: cropIconSrc } = useFileURL();
  const [isLoading, setIsLoading] = React.useState(false);
  const iconInputRef: React.RefObject<MediaUploadInput> = React.useRef(null);
  const imageCropperRef: React.RefObject<IImageCropperRef> = React.useRef(null);

  const {
    isOpen: isOpenCropper,
    open: openCropper,
    close: closeCropper,
  } = useOpenState();
  const actions = useActions({
    dispatchCropIcon: cropGroupIcon,
  });
  const cancelToken = useCancelToken();

  return {
    ...props,
    ...actions,
    cancelToken,
    iconInputRef,
    imageCropperRef,
    denyTypes,
    isOpenCropper,
    openCropper,
    closeCropper,
    cropBlob,
    setCropBlob,
    originalIcon,
    setOriginalIcon,
    originalIconSrc,
    setCropIcon,
    cropIconSrc,
    isLoading,
    setIsLoading,
  };
}
