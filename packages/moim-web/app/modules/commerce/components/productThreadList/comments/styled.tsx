import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { getThreadHighlightAnimation } from "../common/styled";

export const CommentItemWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

export const CommentContainer = styled.div<{ highlighted: boolean }>`
  width: 100%;
  height: fit-content;
  ${props =>
    props.highlighted &&
    css`
      animation: ${props =>
          getThreadHighlightAnimation(rgba(props.theme.colorV2.accent, 0.06))}
        2.5s;
    `}
`;

export const ReplyInputWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(16)};
`;

export const ReplyInputContainer = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
  display: ${props => (props.visible ? "flex" : "none")};
`;

export const ReplyItemContainer = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: ${px2rem(4)};
`;

export const ReviewItemChildrenContainer = styled.div`
  margin-left: ${px2rem(52)};
  > :last-child {
    padding-bottom: ${px2rem(4)};
  }
`;

export const UnsignedWrapperStyle = css`
  width: 100%;
`;
