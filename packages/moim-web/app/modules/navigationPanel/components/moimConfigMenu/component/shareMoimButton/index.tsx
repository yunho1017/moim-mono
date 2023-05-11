import * as React from "react";
import { FormattedMessage } from "react-intl";
import MenuItem from "../menuItem";
import { ShareMoimIcon, ShareMoimSmallIcon } from "../../styled";
import { Share } from "common/components/snsShareDialog/utils";

import { IMoimConfigMenuButtonProp } from "../../types";

type IProps = IMoimConfigMenuButtonProp;

function ShareMoimButton({ onClickButton }: IProps) {
  return (
    <Share shareUrl={window.location.origin} onClick={onClickButton}>
      {handler => (
        <MenuItem
          icon={<ShareMoimIcon />}
          smallIcon={<ShareMoimSmallIcon />}
          onClickButton={handler ?? onClickButton}
        >
          <FormattedMessage id="menu_share_moim" />
        </MenuItem>
      )}
    </Share>
  );
}

export default ShareMoimButton;
