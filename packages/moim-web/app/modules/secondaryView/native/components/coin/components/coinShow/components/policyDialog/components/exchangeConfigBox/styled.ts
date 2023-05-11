import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { B4Regular, pB1BoldStyle } from "common/components/designSystem/typos";
import EqualIconBase from "@icon/48-equal.svg";

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(40)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;
export const EqualIcon = styled(EqualIconBase).attrs(props => ({
  size: "l",
  iconColor: props.theme.colorV2.colorSet.grey600,
}))``;
export const Box = styled.div`
  width: 100%;
  height: ${px2rem(50)};
  border-radius: ${px2rem(4)};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const RatioItem = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${px2rem(6)};
`;

export const Ratio = styled.div`
  ${pB1BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const Currency = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(3)};
`;
