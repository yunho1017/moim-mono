import * as React from "react";

import AppBarModalLayout from "common/components/modalLayout/appbar";
import {
  NextButton,
  Wrapper,
  StickyWrapper,
  SearchInputWrapper,
  CloseButton,
  appBarStyle,
  Divider,
  memberItemStyle,
} from "./styled";
import { SelectableSearchInput } from "common/components/searchInput";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";
import MemberList from "common/components/memberList";
import { DefaultDivider } from "common/components/divider";
import Empty from "./empty";

import useSearchUsers from "common/hooks/useSearchUsers";
import useMoimMembers from "common/hooks/useMoimMembers";
import { useEffects, useHandlers, useProps } from "./hooks";

const INITIAL_USERS: Moim.IPaginatedListResponse<Moim.User.IUser> = {
  data: [],
  paging: {},
};
export interface IProps {
  open: boolean;
  title: string;
  placeholder: string;
  nextButtonText: string;
  isMultipleSelect: boolean;
  isLoading: boolean;
  users?: Moim.IPaginatedListResponse<Moim.User.IUser>;
  subTitleKeys?: ("bio" | "email")[];
  emptyTextId?: string;
  onNext(userIds: Moim.Id[]): void;
  onSearchUser(search: string): void;
  onClose(): void;
  onGetMembers(paging?: Moim.IPaging): void;
}

export default function UserSelectDialog(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  useEffects(hookProps, hookHandlers);

  const {
    open,
    title,
    placeholder,
    nextButtonText,
    users,
    subTitleKeys,
    isMultipleSelect,
    isLoading,
    selected,
    inputRef,
    selectedListRef,
    onClose,
    canNext,
    emptyTextId,
    showEmpty,
  } = hookProps;

  const {
    handleClickNextButton,
    handleSearch,
    handleGetMembers,
    handleClickUser,
    handleClickSelectedUser,
    handleClickSelectedUserRemoveButton,
    isSelected,
  } = hookHandlers;

  return (
    <FixedHeightBasicDialog open={open} onClose={onClose}>
      <AppBarModalLayout
        title={title}
        leftElement={<CloseButton onClick={onClose} />}
        actionButton={
          <NextButton
            onClick={handleClickNextButton}
            isActive={canNext}
            isLoading={isLoading}
          >
            {nextButtonText}
          </NextButton>
        }
        headerWrapperStyle={appBarStyle}
      >
        <Wrapper>
          <StickyWrapper>
            <SearchInputWrapper>
              <SelectableSearchInput
                ref={inputRef}
                selectedListRef={selectedListRef}
                type="text"
                selected={selected}
                placeholder={placeholder}
                onChange={handleSearch}
                onClickSelectedItem={handleClickSelectedUser}
                onClickSelectedItemRemoveButton={
                  handleClickSelectedUserRemoveButton
                }
              />
            </SearchInputWrapper>
            <DefaultDivider />
          </StickyWrapper>
          <Divider />
          {!showEmpty ? (
            <MemberList
              hover={false}
              hasTitle={false}
              members={users ?? INITIAL_USERS}
              isLoading={isLoading}
              subTitleKeys={subTitleKeys}
              onGetMembers={handleGetMembers}
              selectedProps={{
                isMultipleSelect,
                isSelected,
                onSelected: handleClickUser,
              }}
              memberItemStyle={memberItemStyle}
            />
          ) : (
            <Empty textId={emptyTextId} />
          )}
        </Wrapper>
      </AppBarModalLayout>
    </FixedHeightBasicDialog>
  );
}

export function UserSelectDialogWithSearchHooks({
  onClose,
  userFilter,
  onNext,
  isMultipleSelect,
  open,
  title,
  placeholder,
  nextButtonText,
  subTitleKeys,
  emptyTextId,
}: Omit<IProps, "isLoading" | "users" | "onGetMembers" | "onSearchUser"> & {
  userFilter?(user: Moim.User.IUser): void;
}) {
  const {
    users,
    search,
    isLoading,
    handleSearchUser,
    handleSearchChange,
    dispatchClearSearchedUsers,
  } = useSearchUsers();
  const {
    members: moimMembers,
    isLoading: moimMemberLoading,
    handleGetMembers: handleGetMoimMembers,
  } = useMoimMembers();
  const filteredDefaultUsers = React.useMemo(
    () =>
      userFilter
        ? { ...moimMembers, data: moimMembers.data.filter(userFilter) }
        : moimMembers,
    [moimMembers, userFilter],
  );

  const filteredSearchUsers = React.useMemo(
    () =>
      userFilter ? { ...users, data: users.data.filter(userFilter) } : users,
    [users, userFilter],
  );

  const visibleUsers = React.useMemo(
    () =>
      (search
        ? filteredSearchUsers
        : filteredDefaultUsers) as Moim.IPaginatedListResponse<Moim.User.IUser>,
    [search, filteredSearchUsers, filteredDefaultUsers],
  );

  const handleGetUserHandler = React.useMemo(
    () => (search ? handleSearchUser : handleGetMoimMembers),
    [search, handleSearchUser, handleGetMoimMembers],
  );

  const handleClose = React.useCallback(() => {
    dispatchClearSearchedUsers();
    onClose();
  }, [dispatchClearSearchedUsers, onClose]);

  React.useEffect(() => {
    if (!moimMemberLoading && open) {
      handleGetMoimMembers();
    }
  }, [open]);

  return (
    <UserSelectDialog
      onNext={onNext}
      isMultipleSelect={isMultipleSelect}
      open={open}
      title={title}
      placeholder={placeholder}
      nextButtonText={nextButtonText}
      subTitleKeys={subTitleKeys}
      emptyTextId={emptyTextId}
      onClose={handleClose}
      onSearchUser={handleSearchChange}
      users={visibleUsers}
      isLoading={search ? isLoading : moimMemberLoading}
      onGetMembers={handleGetUserHandler}
    />
  );
}
