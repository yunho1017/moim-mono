import * as React from "react";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { name, urlPrefix, description, imagePreview, onSubmit } = hookProps;

  const handleClickLogs = React.useCallback(() => {
    // TODO: Open Change logos to TBD
  }, []);

  const handleClickSubmitButton = React.useCallback(() => {
    onSubmit({
      name,
      description,
      urlPrefix,
      iconId: imagePreview?.id,
      coverImageUrl: "",
    });
  }, [onSubmit, name, description, urlPrefix, imagePreview]);

  return {
    handleClickLogs,
    handleClickSubmitButton,
  };
}
