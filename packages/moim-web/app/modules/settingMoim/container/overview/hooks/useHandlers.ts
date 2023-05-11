import * as React from "react";
import { IHookProps } from "./useProps";
import { ISubmitGroupData } from "../types";
import isEmptyString from "common/helpers/isEmptyString";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    currentGroup,
    loading,
    renameMoim,
    setDescriptionMoim,
    updateMoimIcon,
    dispatchUpdateMoimBanner,
    bannerPreview,
    cancelToken,
  } = hookProps;

  const handleSubmit = React.useCallback(
    async (data: ISubmitGroupData) => {
      // TODO: Check role
      // TODO: IF Role is empty then open dialog
      // TODO: IF Role is verifyed then save data

      const { name, description, iconId } = data;
      const id = currentGroup?.id;

      if (loading || !id) {
        return;
      }

      await renameMoim({ name, id }, cancelToken.current.token);
      await setDescriptionMoim(
        { description: isEmptyString(description) ? null : description, id },
        cancelToken.current.token,
      );

      if (iconId) {
        await updateMoimIcon({ id, iconId }, cancelToken.current.token);
      }

      if (bannerPreview) {
        await dispatchUpdateMoimBanner(
          { id, bannerId: bannerPreview.id },
          cancelToken.current.token,
        );
      }
    },
    [
      currentGroup,
      loading,
      renameMoim,
      cancelToken,
      setDescriptionMoim,
      bannerPreview,
      updateMoimIcon,
      dispatchUpdateMoimBanner,
    ],
  );

  return {
    handleSubmit,
  };
}
