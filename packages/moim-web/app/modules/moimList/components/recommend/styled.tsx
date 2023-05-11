import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H8Bold } from "common/components/designSystem/typos";
import {
  noScrollBarStyle,
  useXScrollStyle,
} from "common/components/designSystem/styles";
// icons
import ArrowIcon from "@icon/24-nextbutton-g.svg";

export const CARD_GAP: number = 16;

export const ArrowIconBase = styled(ArrowIcon).attrs({
  size: "s",
  role: "button",
  touch: "24",
})`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    :hover {
      circle {
        fill: ${props => props.theme.colorV2.colorSet.grey50};
      }
    }
  }
`;

export const PrevButton = styled(ArrowIconBase)``;
export const NextButton = styled(ArrowIconBase)`
  transform: rotate(180deg);
`;

export const ButtonWrapper = styled.div`
  & + & {
    margin-left: ${px2rem(8)};
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: ${px2rem(24)} ${px2rem(16)} 0;
`;

export const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  min-width: 0;
`;

export const PagingContainer = styled.div<{ visible: boolean }>`
  display: flex;
  visibility: ${props => !props.visible && "hidden"};
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: inline-flex;
  padding: ${px2rem(16)} 0 ${px2rem(32)};

  ${useXScrollStyle};
  ${noScrollBarStyle};
`;

export const CardWrapper = styled.div`
  & + & {
    margin-left: ${px2rem(16)};
  }
`;
