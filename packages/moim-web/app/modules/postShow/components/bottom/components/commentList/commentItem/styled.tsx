import styled from "styled-components";
import MoreIconResource from "@icon/18-more-g";
import { px2rem } from "common/helpers/rem";
import { LabelStyle } from "common/components/designSystem/typos";
import { MenuItem as MenuItemBase } from "common/components/responsiveMenu/components/menu";
import { MEDIA_QUERY } from "common/constants/responsive";

export const MoreIcon = styled(MoreIconResource).attrs({
  size: "xs",
  touch: 30,
  role: "button",
})``;

export const ResponsiveMenuWrapper = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    max-width: ${px2rem(300)};
  }
`;

export const MoreMenuItem = styled(MenuItemBase)`
  width: 100%;
  height: ${px2rem(30)};
  ${LabelStyle};
`;
