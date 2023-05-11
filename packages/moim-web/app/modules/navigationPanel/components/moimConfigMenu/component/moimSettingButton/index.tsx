import * as React from "react";
import { useIntl } from "react-intl";
import useModalRedirect from "common/hooks/useModalRedirect";
import { MoimURL } from "common/helpers/url";
import MenuItem from "../menuItem";
import { AdminSettingSmallIcon, AdminSettingIcon } from "../../styled";
import { IMoimConfigMenuButtonProp } from "../../types";

type IProps = IMoimConfigMenuButtonProp;

function MoimSettingButton({ onClickButton }: IProps) {
  const intl = useIntl();
  const redirect = useModalRedirect();
  const handleClickMoimSettingButton = React.useCallback(() => {
    onClickButton();
    redirect(new MoimURL.SettingMoim().toString());
  }, [onClickButton, redirect]);

  return (
    <MenuItem
      icon={<AdminSettingIcon />}
      smallIcon={<AdminSettingSmallIcon />}
      onClickButton={handleClickMoimSettingButton}
    >
      {intl.formatMessage({
        id: "moim_settings/menu_moim_settings",
      })}
    </MenuItem>
  );
}

export default MoimSettingButton;
