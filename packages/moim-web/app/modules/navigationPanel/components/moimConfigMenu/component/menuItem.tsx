import * as React from "react";

import { BaseItemCell } from "common/components/itemCell";
import { MenuText, MenuItem as StyledMenuItem } from "../styled";
import { MarginSize } from "app/enums";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  icon: React.ReactNode;
  smallIcon: React.ReactNode;
  onClickButton: () => void;
}

function MenuItem(props: React.PropsWithChildren<IProps>) {
  const { children, icon, smallIcon, onClickButton } = props;
  const isMobile = useIsMobile();

  return (
    <StyledMenuItem onClick={onClickButton}>
      <BaseItemCell
        title={<MenuText>{children}</MenuText>}
        leftElement={{
          element: isMobile ? icon : smallIcon,
          props: {
            leftContentsSize: "s",
            margin: {
              left: MarginSize.SIXTEEN,
              right: MarginSize.TWELVE,
            },
          },
        }}
        size={isMobile ? "m" : "s"}
      />
    </StyledMenuItem>
  );
}

export default MenuItem;
