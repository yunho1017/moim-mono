import * as React from "react";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    name,
    domain,
    imagePreview,
    description,
    selectedTags,
    onSubmit,
    domainPrefix,
  } = hookProps;

  const handleClickSubmitButton = React.useCallback(() => {
    const submitParams: Moim.Group.ICreateSubGroupRequestBody = {
      group: {
        name,
        domain: domainPrefix + domain,
        icon: imagePreview && { type: "image", data: { id: imagePreview.id } },
        is_public: true,
      },
    };

    if (description) {
      submitParams.group.description = description;
    }

    if (selectedTags.length) {
      submitParams.group.tags = selectedTags;
    }

    onSubmit(submitParams);
  }, [
    name,
    domainPrefix,
    domain,
    imagePreview,
    description,
    selectedTags,
    onSubmit,
  ]);

  return {
    handleClickSubmitButton,
  };
}
