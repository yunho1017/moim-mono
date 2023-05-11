import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { B3Regular, H10Bold } from "common/components/designSystem/typos";

const GAP_MARGIN = 16;

export const Wrapper = styled.div`
  display: flex;
  margin: 0 ${px2rem(GAP_MARGIN)};
  width: calc(100% - ${px2rem(GAP_MARGIN * 2)});
  height: ${px2rem(32)};
  border-radius: ${px2rem(4)};
  overflow: hidden;
  color: ${props => props.theme.colorV2.colorSet.white1000};
  background-color: ${props => props.theme.colorV2.accent};
`;

export const Message = styled(B3Regular).attrs({ role: "button" })`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 ${px2rem(GAP_MARGIN)};
`;

export const Close = styled(H10Bold).attrs({ role: "button" })`
  padding: 0 ${px2rem(GAP_MARGIN)};
  position: relative;
  display: flex;
  align-items: center;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    &::before {
      display: block;
      content: "";
      position: absolute;
      background-color: ${props =>
        rgba(props.theme.colorV2.colorSet.grey50, 0.5)};
      left: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      height: ${px2rem(24)};
      width: 1px;
    }
  }
`;
