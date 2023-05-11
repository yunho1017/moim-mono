import * as React from "react";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { tags, selected, onSubmit, setSelected, canNext } = hookProps;

  const isSelected = React.useCallback(
    (tagId: Moim.Id) =>
      Boolean(selected.find(selectedData => selectedData === tagId)),
    [selected],
  );

  const selectTag = React.useCallback(
    (tagId: Moim.Id) => {
      if (selected.length >= 10) {
        return;
      }
      const selectedTag = tags && tags.find(tag => tag.id === tagId);

      if (!selectedTag) {
        return;
      }

      setSelected([...selected, selectedTag.id]);
    },
    [selected, tags, setSelected],
  );

  const unselectTag = React.useCallback(
    (unselectTagId: Moim.Id) => {
      setSelected(
        selected.filter(selectedData => selectedData !== unselectTagId),
      );
    },
    [selected, setSelected],
  );

  const handleClickNextButton = React.useCallback(() => {
    if (canNext) {
      onSubmit(selected);
    }
  }, [onSubmit, selected, canNext]);

  const handleClickTag = React.useCallback(
    (tagId: Moim.Id) => {
      if (isSelected(tagId)) {
        unselectTag(tagId);
      } else {
        selectTag(tagId);
      }
    },
    [isSelected, selectTag, unselectTag],
  );

  const handleResetData = React.useCallback(() => {
    setSelected([]);
  }, [setSelected]);

  return {
    handleClickNextButton,
    handleClickTag,
    isSelected,
    handleResetData,
  };
}
