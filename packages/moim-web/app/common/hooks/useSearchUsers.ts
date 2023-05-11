import * as React from "react";
import { useActions, useStoreState } from "app/store";
import useDebounceValue from "./useDebounceValue";
import useCancelToken from "./useCancelToken";

import { getSearchUsers, ActionCreators } from "app/actions/user";
import { searchedUsersSelector } from "app/selectors/search";

function useSearchUsers() {
  const [search, setSearch] = React.useState<string>("");
  const debouncedSearch = useDebounceValue<string>(search, 500);
  const { users, isLoading } = useStoreState(state => ({
    users: searchedUsersSelector(state),
    isLoading: state.search.searchUsersLoading,
  }));

  const { dispatchGetSearchUsers, dispatchClearSearchedUsers } = useActions({
    dispatchGetSearchUsers: getSearchUsers,
    dispatchClearSearchedUsers: ActionCreators.clearSearchedUsers,
  });
  const cancelToken = useCancelToken();

  const handleSearchChange = React.useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, []);
  const handleSearchUser = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetSearchUsers(
        { ...paging, query: debouncedSearch },
        cancelToken.current.token,
      );
    },
    [dispatchGetSearchUsers, debouncedSearch, cancelToken],
  );

  React.useEffect(() => {
    if (debouncedSearch) {
      handleSearchUser();
    }
  }, [debouncedSearch]);

  return {
    search,
    users,
    isLoading,
    handleSearchUser,
    handleSearchChange,
    dispatchClearSearchedUsers,
  };
}

export default useSearchUsers;
