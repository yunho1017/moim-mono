import * as React from "react";
import { IProps } from "../";
import useMoimNameState from "common/hooks/useMoimNameState";
import useMoimDescriptionState from "common/hooks/useMoimDescriptionState";
import useUploadImagePreview from "common/hooks/useUploadImagePreview";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { name, nameError, setName } = useMoimNameState(props.name);
  const {
    description,
    setDescription,
    descriptionError,
  } = useMoimDescriptionState(props.description || "");
  const uploadImageState = useUploadImagePreview();
  const icon: Moim.IIcon | undefined = React.useMemo(
    () =>
      uploadImageState.cropImageSrc
        ? {
            type: "image",
            data: {
              url: uploadImageState.cropImageSrc,
            },
          }
        : uploadImageState.imagePreview
        ? {
            type: "image",
            data: {
              url: uploadImageState.imagePreview.url,
            },
          }
        : props.icon,
    [props.icon, uploadImageState.cropImageSrc, uploadImageState.imagePreview],
  );

  const [urlPrefix, setUrlPrefix] = React.useState(props.urlPrefix);
  const submittable = !nameError && !descriptionError;

  return {
    ...props,
    ...uploadImageState,
    name,
    nameError,
    setName,
    icon,
    description,
    setDescription,
    descriptionError,
    urlPrefix,
    setUrlPrefix,
    submittable,
  };
}
