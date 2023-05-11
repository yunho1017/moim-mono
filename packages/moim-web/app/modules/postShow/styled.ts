import styled, { css } from "styled-components";
import DividerBase from "common/components/divider";
import { px2rem } from "common/helpers/rem";
import { POST_SHOW_MAX_CONTENT_WIDTH } from "./constants";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Divider = styled(DividerBase).attrs(props => ({
  height: px2rem(4),
  color: props.theme.colorV2.colorSet.grey10,
}))``;

export const MaxWidthWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${css`
      width: 100%;
      max-width: ${px2rem(POST_SHOW_MAX_CONTENT_WIDTH)};
      margin: 0 auto;
    `}
  }
`;

export const PostShowWrapper = styled(MaxWidthWrapper)`
  display: flex;
  flex-direction: column;
  padding: 0 ${px2rem(16)};
`;

export const PostShowBottomWrapper = styled(MaxWidthWrapper)<{}>`
  flex: 1;
  min-width: 0;
  display: flex;
`;

export const ForumContainer = styled.div<{ isModalShow: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: inherit;
`;
