import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
// component
import { B1Regular } from "common/components/designSystem/typos";
import { MenuItem as MenuItemBase } from "common/components/responsiveMenu/components/menu";

export const MenuWrapper = styled.ul`
  width: 100%;
  padding: ${px2rem(4)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    max-width: ${px2rem(300)};
  }
`;

export const MenuText = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const MenuItem = styled(MenuItemBase)`
  padding: ${px2rem(8)} ${px2rem(16)};
`;
