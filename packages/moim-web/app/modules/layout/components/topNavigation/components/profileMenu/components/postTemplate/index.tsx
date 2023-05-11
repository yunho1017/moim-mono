import * as React from "react";
import { FormattedMessage } from "react-intl";

import MenuItem from "app/modules/navigationPanel/components/moimConfigMenu/component/menuItem";
import { DraftIcon, DraftSmallIcon } from "./styled";

import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";

export interface IProps {
  onClickButton: () => void;
}

function PostTemplateButton({ onClickButton }: IProps) {
  const redirect = useRedirect();

  const handleClickButton = React.useCallback(() => {
    onClickButton();
    redirect(new MoimURL.PostTemplate().toString());
  }, [onClickButton, redirect]);

  return (
    <MenuItem
      icon={<DraftIcon />}
      smallIcon={<DraftSmallIcon />}
      onClickButton={handleClickButton}
    >
      <FormattedMessage id="moim_settings/menu_post_template" />
    </MenuItem>
  );
}

export default PostTemplateButton;
