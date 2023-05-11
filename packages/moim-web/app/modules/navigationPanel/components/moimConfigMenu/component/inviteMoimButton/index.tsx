import * as React from "react";
import { FormattedMessage } from "react-intl";
import MenuItem from "../menuItem";
import { AppointMembersIcon, AppointMembersSmallIcon } from "../../styled";
import { IMoimConfigMenuButtonProp } from "../../types";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useOpenMyReferralDialog } from "common/components/myReferralDialog/hooks";

type IProps = IMoimConfigMenuButtonProp;

function InviteMoimButton({ onClickButton }: IProps) {
  const currentGroup = useCurrentGroup();
  const openMyReferralDialog = useOpenMyReferralDialog();

  const handleClick = React.useCallback(() => {
    onClickButton();
    openMyReferralDialog();
  }, [currentGroup, openMyReferralDialog, onClickButton]);

  if (!currentGroup?.active_referral_promotions?.signUp) {
    return null;
  }

  return (
    <MenuItem
      icon={<AppointMembersIcon />}
      smallIcon={<AppointMembersSmallIcon />}
      onClickButton={handleClick}
    >
      <FormattedMessage id="menu_my_referral" />
    </MenuItem>
  );
}

export default InviteMoimButton;
