import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";
import DownArrowIconBase from "@icon/18-spread-arrow-g.svg";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(36)};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding-right: ${px2rem(6)};
`;

export const MoimFilterBox = styled(B4Regular)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const DownArrowIcon = styled(DownArrowIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const MenuWrapper = styled.ul`
  width: 100%;
  padding: ${px2rem(4)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(300)};
    max-height: ${px2rem(300)};
    ${useScrollStyle}
  }
`;
