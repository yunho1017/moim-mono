import * as React from "react";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    users,
    selected,
    isMultipleSelect,
    onNext,
    setSelected,
    onSearchUser,
    inputRef,
    selectedListRef,
    canNext,
    onGetMembers,
  } = hookProps;

  const isSelected = React.useCallback(
    (userId: Moim.Id) =>
      Boolean(selected.find(selectedData => selectedData.id === userId)),
    [selected],
  );

  const selectUser = React.useCallback(
    (userId: Moim.Id) => {
      const selectedUser = users && users.data.find(user => user.id === userId);

      if (!selectedUser) {
        return;
      }

      if (isMultipleSelect) {
        setSelected([
          ...selected,
          {
            id: selectedUser.id,
            name: selectedUser.name,
            image: selectedUser.avatar_url,
          },
        ]);
      } else {
        setSelected([
          {
            id: selectedUser.id,
            name: selectedUser.name,
            image: selectedUser.avatar_url,
          },
        ]);
      }

      requestAnimationFrame(() => {
        if (selectedListRef.current) {
          selectedListRef.current.scrollTo({
            top:
              selectedListRef.current.scrollHeight -
              selectedListRef.current.clientHeight,
          });
        }
      });
    },
    [users, isMultipleSelect, setSelected, selected],
  );

  const unselectUser = React.useCallback(
    (unselectUserId: Moim.Id) => {
      setSelected(
        selected.filter(selectedData => selectedData.id !== unselectUserId),
      );
    },
    [selected, setSelected],
  );

  const handleClickNextButton = React.useCallback(() => {
    if (canNext) {
      onNext(selected.map(selectedData => selectedData.id));
    }
  }, [onNext, selected, canNext]);

  const handleClickUser = React.useCallback(
    (userId: Moim.Id) => {
      if (isSelected(userId)) {
        unselectUser(userId);
      } else {
        selectUser(userId);
      }
    },
    [isSelected, unselectUser, selectUser],
  );

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.currentTarget.value;
      onSearchUser(searchValue);
    },
    [onSearchUser],
  );

  const handleClickSelectedUser = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const handleClickSelectedUserRemoveButton = React.useCallback(
    (userId: Moim.Id) => {
      unselectUser(userId);
    },
    [unselectUser],
  );

  const handleResetData = React.useCallback(() => {
    setSelected([]);
    onSearchUser("");
  }, [setSelected, onSearchUser]);

  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      onGetMembers(paging);
    },
    [onGetMembers],
  );

  return {
    handleClickNextButton,
    handleClickUser,
    handleSearch,
    handleClickSelectedUser,
    handleClickSelectedUserRemoveButton,
    handleResetData,
    isSelected,
    handleGetMembers,
  };
}
