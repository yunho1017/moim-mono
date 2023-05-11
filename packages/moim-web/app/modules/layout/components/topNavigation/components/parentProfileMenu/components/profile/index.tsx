import * as React from "react";
import { FormattedMessage } from "react-intl";

import UserProfileImage from "common/components/userProfileImage";
import MenuItem from "app/modules/navigationPanel/components/moimConfigMenu/component/menuItem";

import useParentMoimUser from "common/hooks/useParentMoimUser";
import useCurrentGroup from "common/hooks/useCurrentGroup";

import { MoimURL } from "common/helpers/url";
import MoimAPI from "common/api";

export interface IProps {
  onClickButton: () => void;
}

function ProfileButton({ onClickButton }: IProps) {
  const currentGroup = useCurrentGroup();
  const parentUser = useParentMoimUser();

  const openProfileSecondaryPanel = React.useCallback(async () => {
    if (currentGroup?.parent) {
      const parent = (await MoimAPI.group.getGroupData(currentGroup.parent))
        .data;
      location.href = `${parent.url}${new MoimURL.ProfileShare({
        userId: parentUser?.id ?? "",
      }).toString()}`;
    }
  }, [currentGroup, parentUser]);

  const handleClickParentProfile = React.useCallback(() => {
    onClickButton();
    openProfileSecondaryPanel();
  }, [onClickButton, openProfileSecondaryPanel]);

  return (
    <MenuItem
      icon={<UserProfileImage src={parentUser?.avatar_url || ""} size="s" />}
      smallIcon={
        <UserProfileImage src={parentUser?.avatar_url || ""} size="xs" />
      }
      onClickButton={handleClickParentProfile}
    >
      <FormattedMessage id="menu_my_profile" />
    </MenuItem>
  );
}

export default ProfileButton;
