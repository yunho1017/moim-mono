import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import {
  H4BoldStyle,
  H8BoldStyle,
  B3RegularStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import LoadingIconBase from "common/components/loading/icon";

export const DEFAULT_GAP = 12;

export const RootWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InnerContentWrapper = styled.div`
  width: ${px2rem(1200)};
  height: 100%;
  max-width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: inherit;
  }
`;

export const Header = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  margin: ${px2rem(40)} 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(16)} 0 ${px2rem(16)};
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  padding: 0 ${px2rem(16)};
`;

export const Title = styled.div`
  position: relative;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(4)} 0;
  ${useSingleLineStyle};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;

export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(4)} 0;
  ${B3RegularStyle}
  ${useSingleLineStyle};
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(LoadingIconBase)``;

export const QuestContainer = styled.div`
  width: 100%;
`;

export const InnerWrapper = styled.div<{
  gapSize?: number;
  columnCount?: number;
  minWidth?: number;
}>`
  --item-min-width: ${props =>
    props.minWidth ? px2rem(props.minWidth) : undefined};
  width: 100%;
  display: grid;
  place-content: center;
  gap: ${props => px2rem(props.gapSize ?? DEFAULT_GAP)};
  ${props => {
    if (props.minWidth) {
      return css`
        grid-template-columns: repeat(
          auto-fill,
          minmax(
            max(var(--item-min-width), 100% / ${props.columnCount ?? 1}),
            1fr
          )
        );
      `;
    }
    return css`
      grid-template-columns: ${`repeat(${props.columnCount ??
        1}, minmax(0, 1fr))`};
    `;
  }}

  img {
    height: 100%;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    --item-min-width: 100%;
  }
`;

export const DesktopList = styled.div`
  display: grid;
  grid-template-columns: ${`repeat(auto-fill, ${px2rem(
    341,
  )})`}; // NOTE: adjustable maximum preview width
  grid-gap: ${px2rem(16)};
  justify-content: center;
  padding-bottom: ${px2rem(64)};
`;

export const MobileList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(12)};
`;
