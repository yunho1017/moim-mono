import * as React from "react";
import { FormattedMessage } from "react-intl";
import useModalRedirect from "common/hooks/useModalRedirect";
import { MoimURL } from "common/helpers/url";
import MenuItem from "../menuItem";
import { SettingIcon, SettingSmallIcon } from "../../styled";
import { IMoimConfigMenuButtonProp } from "../../types";

type IProps = IMoimConfigMenuButtonProp;

function PersonalSettingButton({ onClickButton }: IProps) {
  const redirect = useModalRedirect();
  const handleClickMoimSettingButton = React.useCallback(() => {
    onClickButton();
    redirect(new MoimURL.PersonalSettingMoim().toString());
  }, [onClickButton, redirect]);

  return (
    <MenuItem
      icon={<SettingIcon />}
      smallIcon={<SettingSmallIcon />}
      onClickButton={handleClickMoimSettingButton}
    >
      <FormattedMessage id="moim_settings/menu_personal_settings" />
    </MenuItem>
  );
}

export default PersonalSettingButton;
