import styled from "styled-components";

// icons
import { MenuItem as MenuItemBase } from "common/components/responsiveMenu/components/menu";

export const MenuItem = styled(MenuItemBase)`
  > * {
    display: inline-block;
    width: 100%;
  }
`;

export const MoreMenuWrapper = styled.div`
  display: inline-block;
`;
