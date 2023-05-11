import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";
import { MediaWrapper } from "./components/media";
import { BGLevel1 } from "common/components/designSystem/BGLevel";

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  ${SectionMarginTopBottom}
`;

export const Inner = styled(BGLevel1)`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(8)};
  padding: ${px2rem(16)};
  box-sizing: border-box;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: flex;
    gap: ${px2rem(16)};
    flex-direction: row;
    flex-wrap: nowrap;
  }
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    ${MediaWrapper} img {
      transform: scale(1);
      will-change: transform;
      transition: transform 120ms ease-in-out 0ms;
    }
    &:hover ${MediaWrapper} img {
      transform: scale(1.1);
    }
  }
`;

export const Left = styled.div`
  width: calc(100% / 5 * 2);
`;

export const Right = styled.div`
  width: calc(100% / 5 * 3);
`;
