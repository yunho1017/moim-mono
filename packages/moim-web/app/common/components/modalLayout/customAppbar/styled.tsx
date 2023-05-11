import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { APP_BAR_HEIGHT } from "app/modules/postShow/components/bottom/components/groupInput/constants";
import { DefaultDivider } from "common/components/divider";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div<{ wrapperStyle?: FlattenInterpolation<any> }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: ${px2rem(8)};
  ${props => props.wrapperStyle}
`;

export const Header = styled.header<{
  headerStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  height: ${px2rem(APP_BAR_HEIGHT)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
  ${props => props.headerStyle}
`;

export const Content = styled.div<{
  contentStyle?: FlattenInterpolation<any>;
}>`
  flex: 1;
  overflow: auto;
  ${props => props.contentStyle}
`;

export const Border = styled(DefaultDivider)<{ withoutMargin?: boolean }>`
  ${props =>
    props.withoutMargin
      ? null
      : css`
          margin-top: ${px2rem(16)};
        `};
`;
