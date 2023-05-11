import * as React from "react";
import styled from "styled-components";
// icons
import WhiteMoreIcon from "@icon/24-more-w.svg";
import BlackMoreIcon from "@icon/24-more-b.svg";
import GreyMoreIcon from "@icon/24-more-g.svg";
// helpers
import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";

interface IProps {
  onClickMoreMenu: VoidFunction;
  enableSmartShorten?: boolean;
  moreIconColor?: "white" | "black" | "grey";
}

const IconSelector = (color: "white" | "black" | "grey") => {
  switch (color) {
    case "white":
      return WhiteMoreIcon;
    case "black":
      return BlackMoreIcon;
    case "grey":
      return GreyMoreIcon;
  }
};

const MenuWrapper: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  onClickMoreMenu,
  enableSmartShorten,
  moreIconColor = "black",
}) => {
  const isMobile = useIsMobile();
  const MoreIcon = IconSelector(moreIconColor);

  if (enableSmartShorten && isMobile) {
    return (
      <MoreButton onClick={onClickMoreMenu}>
        <MoreIcon size="s" touch={44} />
      </MoreButton>
    );
  } else {
    return <>{children}</>;
  }
};

const MoreButton = styled.button`
  width: ${px2rem(44)};
  height: ${px2rem(44)};
`;

export default MenuWrapper;
