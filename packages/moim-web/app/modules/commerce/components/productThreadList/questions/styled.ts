import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { useHoverStyle } from "common/components/designSystem/styles";
import { getThreadHighlightAnimation } from "../common/styled";

export const WrapperStyle = css`
  padding: ${px2rem(16)} ${px2rem(16)} 0;
`;

export const QuestionWrapper = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(2)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};

  & + & {
    margin-top: ${px2rem(16)};
  }
`;

export const QuestionContainer = styled.div<{ highlighted: boolean }>`
  padding-top: ${px2rem(4)};
  width: 100%;
  height: fit-content;
  ${useHoverStyle}
  ${props =>
    props.highlighted &&
    css`
      animation: ${getThreadHighlightAnimation(
          rgba(props.theme.colorV2.accent, 0.06),
        )}
        2.5s;
    `}
`;

export const ReplyInputContainer = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  display: ${props => (props.visible ? "block" : "none")};
`;

export const QuestionItemChildrenContainer = styled.div`
  > :last-child {
    padding-bottom: ${px2rem(4)};
  }
`;

export const UnsignedWrapperStyle = css`
  width: 100%;
`;
