import * as React from "react";
// hooks
import { useStoreState, useActions } from "app/store";
import { useCancelTokenWithCancelHandler } from "app/common/hooks/useCancelToken";
// selector
import {
  userToOption,
  selectMoimMemberOptions,
  selectDefaultOption,
} from "./selector";
// action
import {
  ActionCreators,
  getUsers,
  getSearchUsersHasResult as getSearchUsersHasResultAction,
  getBatchUsersWithDirectAPI as getBatchUsersWithDirectAPIAction,
} from "app/actions/user";
// components
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { IProps as IRootProps } from "../..";
import { AsyncSelectBase, SearchOptions } from "../base";
import { Wrapper, InputContainer, H6, NoSidePaddingStyle } from "../styled";

interface IProps extends Omit<IRootProps, "element"> {
  element: Moim.Blockit.IInputUserSelectBlock;
}

const UserSelect: React.FC<IProps> = ({
  name,
  label,
  element,
  wrapperStyle,
  margin,
  onChange,
}) => {
  const { placeholder, required, initialValue, valueType } = element;
  const [getMemberCalled, setGetMemberCallStatus] = React.useState(false);
  const [defaultOptionId, setDefaultOptionId] = React.useState<Moim.Id>("");
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const { memberOptions, defaultOption, memberOptionsLoading } = useStoreState(
    state => ({
      memberOptions: selectMoimMemberOptions(state),
      defaultOption: selectDefaultOption(state, defaultOptionId),
      memberOptionsLoading: state.group.getMembersLoading,
    }),
  );

  const {
    dispatchGetUsers,
    getSearchUsersHasResult,
    getBatchUsersWithDirectAPI,
    clearSearchedUsers,
  } = useActions({
    dispatchGetUsers: getUsers,
    getSearchUsersHasResult: getSearchUsersHasResultAction,
    getBatchUsersWithDirectAPI: getBatchUsersWithDirectAPIAction,
    clearSearchedUsers: ActionCreators.clearSearchedUsers,
  });

  const handleChange: Moim.Blockit.IInputBlockChangeEvent = React.useCallback(
    (value, validate, e) => {
      // Note: rewrap for hasError check
      onChange?.(value, validate, e);
    },
    [onChange],
  );

  const handleSearchOptions: SearchOptions = React.useCallback(
    async (newValue, callback) => {
      handleCancel();

      const response = (await getSearchUsersHasResult(
        {
          query: newValue.trim(),
          limit: 100,
        },
        cancelTokenSource.current.token,
      )) ?? { data: [], paging: {} };
      callback(response.data.map(userToOption));
    },
    [cancelTokenSource, getSearchUsersHasResult, handleCancel],
  );

  React.useEffect(() => {
    if (!memberOptions.length && !memberOptionsLoading && !getMemberCalled) {
      dispatchGetUsers({});
      setGetMemberCallStatus(true);
    }
  }, [memberOptions, memberOptionsLoading, dispatchGetUsers, getMemberCalled]);

  React.useEffect(
    () => () => {
      handleCancel();
      clearSearchedUsers();
    },
    [handleCancel, clearSearchedUsers],
  );
  React.useEffect(() => {
    if (initialValue) {
      const request: Moim.User.IUserBatchRequest = {};

      switch (valueType) {
        case "id": {
          request.users = [initialValue.toString()];
          break;
        }

        case "canUsername": {
          request.canUsernames = [initialValue.toString()];
          break;
        }

        case "canId": {
          request.canIds = [initialValue.toString()];
          break;
        }
      }

      getBatchUsersWithDirectAPI(request, cancelTokenSource.current.token).then(
        result => {
          if (result?.data[0]) {
            setDefaultOptionId(result.data[0]);
          }
        },
      );
    }
  }, [
    handleCancel,
    clearSearchedUsers,
    initialValue,
    valueType,
    getBatchUsersWithDirectAPI,
    cancelTokenSource,
  ]);

  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      <H6>
        <NativeEmojiSafeText value={label} />
      </H6>
      <InputContainer>
        <AsyncSelectBase
          hasError={false}
          indicator="user"
          required={required}
          id={name}
          name={name}
          placeholder={placeholder}
          defaultOption={defaultOption}
          defaultOptions={memberOptions}
          wrapperStyle={NoSidePaddingStyle}
          onChange={handleChange}
          onSearchOptions={handleSearchOptions}
        />
      </InputContainer>
    </Wrapper>
  );
};

export default UserSelect;
