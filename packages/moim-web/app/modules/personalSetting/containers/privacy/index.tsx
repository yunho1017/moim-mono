import * as React from "react";
import styled from "styled-components";
import BlockDmSettingCell from "./components/blockDmSettingCell";
import { useActions, useStoreState } from "app/store";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCancelToken from "common/hooks/useCancelToken";
import { updateMyProfile } from "app/actions/me";

export const Wrapper = styled.div``;

const PrivacyContainer: React.FC = () => {
  const currentUser = useCurrentUser();
  const cancelToken = useCancelToken();

  const isUpdateLoading = useStoreState(
    state => state.profileEditorPage.isUpdateLoading,
  );
  const { dispatchUpdateMyProfile } = useActions({
    dispatchUpdateMyProfile: updateMyProfile,
  });

  const handleChange = React.useCallback(
    (config: Partial<Moim.User.INotificationConfig>) => {
      if (!isUpdateLoading) {
        dispatchUpdateMyProfile(
          {
            config: {
              ...currentUser?.config,
              ...config,
            },
          },
          cancelToken.current.token,
        );
      }
    },
    [
      currentUser?.config,
      cancelToken,
      isUpdateLoading,
      dispatchUpdateMyProfile,
    ],
  );

  return (
    <Wrapper>
      <BlockDmSettingCell
        checked={Boolean(currentUser?.config.blockDm)}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default PrivacyContainer;
