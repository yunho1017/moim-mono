import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Section, SectionTitle, InputWrapper } from "../styled";
import ProfileImageChanger from "app/modules/profileEditor/components/profileImageChanger";
import { Spacer } from "common/components/designSystem/spacer";

import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

import { updateMyProfileWithHandlingResult } from "../../actions";

const ProfileImageSection: React.FC = () => {
  const cancelToken = useCancelToken();
  const currentUser = useCurrentUser();
  const { isAvatarUploading } = useStoreState(state => ({
    isAvatarUploading: state.profileEditorPage.isAvatarUploading,
  }));
  const { dispatchProfileEdit } = useActions({
    dispatchProfileEdit: updateMyProfileWithHandlingResult,
  });

  const handleChangeAvatar = React.useCallback(
    async (avatar: Moim.Id) => {
      dispatchProfileEdit(
        {
          avatar_id: avatar,
        },
        cancelToken.current.token,
      );
    },
    [dispatchProfileEdit],
  );

  return (
    <Section>
      <SectionTitle>
        <FormattedMessage id="edit_profile_show/profile_image_title" />
      </SectionTitle>
      <Spacer value={16} />
      <InputWrapper>
        <ProfileImageChanger
          src={currentUser?.avatar_url ?? ""}
          isAvatarUpdating={isAvatarUploading}
          onChange={handleChangeAvatar}
        />
      </InputWrapper>
      <Spacer value={16} />
    </Section>
  );
};

export default React.memo(ProfileImageSection);
