// vendor
import * as React from "react";
import useCurrentGroup from "common/hooks/useCurrentGroup";
// component
import SearchInput from "common/components/searchInput/inactive";
import MemberList from "common/components/memberList";
import { Wrapper } from "./styled";
// hooks
import useSearchUsers from "common/hooks/useSearchUsers";
import useMoimMembers from "common/hooks/useMoimMembers";

const MoimMemberContainer: React.FC = () => {
  const {
    users,
    search,
    isLoading,
    handleSearchUser,
    handleSearchChange: onSearchChange,
  } = useSearchUsers();
  const {
    orderedMembers: moimMembers,
    isLoading: moimMemberLoading,
    handleGetMembers: handleGetMoimMembers,
  } = useMoimMembers();
  const currentGroup = useCurrentGroup();

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange],
  );
  const memberListProps = React.useMemo(
    () => ({
      members: (search ? users : moimMembers) as Moim.IPaginatedListResponse<
        Moim.User.IUser
      >,
      isLoading: search ? isLoading : moimMemberLoading,
      totalMembers: currentGroup?.users_count,
      onGetMembers: search ? handleSearchUser : handleGetMoimMembers,
    }),
    [
      currentGroup,
      handleGetMoimMembers,
      handleSearchUser,
      isLoading,
      moimMemberLoading,
      moimMembers,
      search,
      users,
    ],
  );

  React.useEffect(() => {
    if (!moimMembers.data.length && !moimMemberLoading) {
      handleGetMoimMembers();
    }
  }, []);

  return (
    <Wrapper>
      <SearchInput value={search} onChange={handleSearchChange} />
      <MemberList
        {...memberListProps}
        subTitleKeys={["email", "phoneNumber"]}
        subTitleShaveLine={1}
      />
    </Wrapper>
  );
};

export default MoimMemberContainer;
