import * as React from "react";
import { FormattedMessage } from "react-intl";

import UserProfileImage from "common/components/userProfileImage";
import MenuItem from "app/modules/navigationPanel/components/moimConfigMenu/component/menuItem";

import useCurrentUser from "common/hooks/useCurrentUser";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";

import { MoimURL } from "common/helpers/url";

export interface IProps {
  onClickButton: () => void;
}

function ProfileButton({ onClickButton }: IProps) {
  const currentUser = useCurrentUser();
  const { redirect } = useNativeSecondaryView();

  const openProfileSecondaryPanel = React.useCallback(() => {
    if (currentUser) {
      redirect(new MoimURL.Members({ userId: currentUser.id }).toString());
    }
  }, [currentUser, redirect]);

  const handleClickCurrentUser = React.useCallback(() => {
    onClickButton();
    openProfileSecondaryPanel();
  }, [onClickButton, openProfileSecondaryPanel]);

  return (
    <MenuItem
      icon={<UserProfileImage src={currentUser?.avatar_url || ""} size="s" />}
      smallIcon={
        <UserProfileImage src={currentUser?.avatar_url || ""} size="xs" />
      }
      onClickButton={handleClickCurrentUser}
    >
      <FormattedMessage id="menu_my_profile" />
    </MenuItem>
  );
}

export default ProfileButton;
