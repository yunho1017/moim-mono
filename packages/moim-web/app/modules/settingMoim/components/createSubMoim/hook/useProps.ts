import * as React from "react";
import { IProps } from "../";
import useMoimNameState from "common/hooks/useMoimNameState";
import useMoimDescriptionState from "common/hooks/useMoimDescriptionState";
import useGroupDomainValidation from "common/hooks/useGroupDomainValidation";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useUploadImagePreview from "common/hooks/useUploadImagePreview";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { name, nameError, setName } = useMoimNameState();
  const currentGroup = useCurrentGroup();
  const domainPrefix = React.useMemo(
    () => currentGroup?.domain_prefix || `${currentGroup?.domain}-`,
    [currentGroup],
  );
  const {
    description,
    setDescription,
    descriptionError,
  } = useMoimDescriptionState();
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
        : undefined,
    [uploadImageState.cropImageSrc, uploadImageState.imagePreview],
  );
  const [selectedTags, setSelectedTags] = React.useState<Moim.Id[]>([]);

  const {
    domain,
    setDomain,
    error: domainError,
    isLoading: isDomainValidateLoading,
  } = useGroupDomainValidation(domainPrefix);
  const submittable =
    name &&
    domain &&
    !nameError &&
    !descriptionError &&
    !domainError &&
    !isDomainValidateLoading;

  return {
    ...props,
    ...uploadImageState,
    icon,
    name,
    nameError,
    setName,
    selectedTags,
    setSelectedTags,
    description,
    setDescription,
    descriptionError,
    domain,
    domainPrefix,
    setDomain,
    domainError,
    submittable,
  };
}
