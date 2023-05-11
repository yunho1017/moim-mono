import * as React from "react";
import { useIntl } from "react-intl";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";
import MenuItem from "../menuItem";
import { PluginsSmallIcon, PluginsIcon } from "../../styled";
import { IMoimConfigMenuButtonProp } from "../../types";

type IProps = IMoimConfigMenuButtonProp;

function PluginsButton({ onClickButton }: IProps) {
  const intl = useIntl();
  const redirect = useRedirect();
  const handleClick = React.useCallback(() => {
    onClickButton();
    redirect(new MoimURL.Plugins().toString());
  }, [onClickButton, redirect]);

  return (
    <MenuItem
      icon={<PluginsIcon />}
      smallIcon={<PluginsSmallIcon />}
      onClickButton={handleClick}
    >
      {intl.formatMessage({
        id: "moim_settings_menu_plugin",
      })}
    </MenuItem>
  );
}

export default PluginsButton;
