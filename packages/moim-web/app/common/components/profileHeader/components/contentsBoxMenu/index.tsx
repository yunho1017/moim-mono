// vendor
import * as React from "react";
// component
import { MenuWrapper } from "./styled";
import Menus from "./menus";
import ResponsiveMenu from "common/components/responsiveMenu";

interface IProps extends React.ComponentProps<typeof ResponsiveMenu> {
  userId: Moim.Id;
}

function ContentsBoxMenuComponent(props: IProps) {
  const { anchorElement, open, onCloseRequest, userId } = props;

  return (
    <ResponsiveMenu
      anchorElement={anchorElement}
      open={open}
      onCloseRequest={onCloseRequest}
    >
      <MenuWrapper>
        <Menus userId={userId} requestClose={onCloseRequest} />
      </MenuWrapper>
    </ResponsiveMenu>
  );
}

export default ContentsBoxMenuComponent;
