import * as React from "react";
import UserSelectDialog from "app/modules/userSelectDialog";
import useSearchUsers from "common/hooks/useSearchUsers";

interface IProps
  extends Omit<
    React.ComponentProps<typeof UserSelectDialog>,
    "isLoading" | "users" | "onGetMembers" | "onSearchUser"
  > {
  positionId: string;
  isPositionLoading: boolean;
  positionMembers?: Moim.IPaginatedListResponse<Moim.User.IUser>;
  handleGetPositionMembers(paging: Moim.IPaging): void;
}

export default function PositionDismissDialog({
  onClose,
  positionMembers,
  isPositionLoading,
  handleGetPositionMembers,
  onNext,
  isMultipleSelect,
  open,
  title,
  placeholder,
  nextButtonText,
  subTitleKeys,
  emptyTextId,
}: IProps) {
  const {
    users,
    search,
    isLoading,
    handleSearchUser,
    handleSearchChange,
    dispatchClearSearchedUsers,
  } = useSearchUsers();

  const filteredUsers = React.useMemo(
    () => ({
      ...users,
      data: users.data.filter(user =>
        Boolean(positionMembers?.data.find(member => member.id === user.id)),
      ),
    }),
    [users, positionMembers],
  );

  const visibleUsers = React.useMemo(
    () =>
      (search ? filteredUsers : positionMembers) as Moim.IPaginatedListResponse<
        Moim.User.IUser
      >,
    [search, filteredUsers, positionMembers],
  );

  const handleGetUserHandler = React.useMemo(
    () => (search ? handleSearchUser : handleGetPositionMembers),
    [search, handleSearchUser, handleGetPositionMembers],
  );

  const handleClose = React.useCallback(() => {
    dispatchClearSearchedUsers();
    onClose();
  }, [dispatchClearSearchedUsers, onClose]);

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
      isLoading={search ? isLoading : isPositionLoading}
      onGetMembers={handleGetUserHandler}
    />
  );
}
