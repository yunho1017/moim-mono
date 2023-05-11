import * as React from "react";
import { useIntl } from "react-intl";
import MenuItem from "../menuItem";
import { MemberIcon, MemberSmallIcon } from "../../styled";

import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { IMoimConfigMenuButtonProp } from "../../types";
import useGroupTexts from "common/hooks/useGroupTexts";

type IProps = IMoimConfigMenuButtonProp;

function MemberButton({ onClickButton }: IProps) {
  const intl = useIntl();
  const { redirect } = useNativeSecondaryView();
  const memberTexts = useGroupTexts("member");
  const handleClickMemberButton = React.useCallback(() => {
    onClickButton();
    redirect(new MoimURL.MoimMembers().toString());
  }, [onClickButton, redirect]);

  return (
    <MenuItem
      icon={<MemberIcon />}
      smallIcon={<MemberSmallIcon />}
      onClickButton={handleClickMemberButton}
    >
      {intl.formatMessage(
        { id: "moim_settings/menu_moim_member" },
        { ref_member: memberTexts?.plural ?? "" },
      )}
    </MenuItem>
  );
}

export default MemberButton;
