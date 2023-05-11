import * as React from "react";
import styled from "styled-components";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import { px2rem } from "common/helpers/rem";
import { currentGroupStatSelector } from "app/selectors/stat";
import { MenuIcon } from "../../styled";
import { useStoreState } from "app/store";

const Wrapper = styled.div<{ isUnread: boolean }>`
  position: relative;
  width: ${px2rem(42)};
  height: ${px2rem(42)};

  ::before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    background-color: ${props =>
      props.theme.getAlertElementPalette("alertBadge").color ??
      props.theme.color.red700};
    height: ${px2rem(4)};
    width: ${px2rem(4)};
    top: ${px2rem(8)};
    right: ${px2rem(8)};
    transition: all 300ms;
    opacity: ${props => (props.isUnread ? 1 : 0)};
    transform: scale(${props => (props.isUnread ? 1 : 0)});
  }
`;

const MenuButton: React.FC = () => {
  const { toggleSideNavigation } = useSideNavigationPanel();
  currentGroupStatSelector;
  const groupStat = useStoreState(state => currentGroupStatSelector(state));

  return (
    <Wrapper isUnread={Boolean(groupStat?.count)}>
      <MenuIcon onClick={toggleSideNavigation} />
    </Wrapper>
  );
};

export default MenuButton;
