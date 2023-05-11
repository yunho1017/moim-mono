import * as React from "react";
import { FormattedMessage } from "react-intl";
import { MoimURL } from "common/helpers/url";
import MenuItem from "app/modules/navigationPanel/components/moimConfigMenu/component/menuItem";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useGroupTexts from "common/hooks/useGroupTexts";

import { MyShoppingIcon, MyShoppingSmallIcon } from "./styled";

export interface IProps {
  onClickButton: () => void;
}

function MyShoppingButton({ onClickButton }: IProps) {
  const { redirect } = useNativeSecondaryView();
  const myShoppingText = useGroupTexts("my_shopping_menu_title");

  const openProfileSecondaryPanel = React.useCallback(() => {
    redirect(
      new MoimURL.CommerceMyShopping({
        tab: "payments",
      }).toString(),
    );
  }, [redirect]);

  const handleClickCurrentUser = React.useCallback(() => {
    onClickButton();
    openProfileSecondaryPanel();
  }, [onClickButton, openProfileSecondaryPanel]);

  return (
    <MenuItem
      icon={<MyShoppingIcon />}
      smallIcon={<MyShoppingSmallIcon />}
      onClickButton={handleClickCurrentUser}
    >
      {myShoppingText ? (
        myShoppingText.singular
      ) : (
        <FormattedMessage id={"my_shopping"} />
      )}
    </MenuItem>
  );
}

export default MyShoppingButton;
