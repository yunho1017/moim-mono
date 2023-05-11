import styled, { css } from "styled-components";
import {
  pB2RegularStyle,
  pB3RegularStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div<{ editMode: boolean }>`
  display: flex;
  align-items: center;
  ${props =>
    props.editMode &&
    css`
      width: 100%;
    `}
`;

export const Contents = styled.div<{ isReply?: boolean }>`
  width: 100%;
  .ql-container {
    ${props => (props.isReply ? pB3RegularStyle : pB2RegularStyle)};
    color: ${props => props.theme.colorV2.colorSet.grey800};
    word-break: break-all;

    p:first-child {
      padding-top: ${px2rem(4)};
    }

    p:last-child {
      padding-bottom: ${px2rem(4)};
    }
  }
`;

interface IBubbleStatus {
  isSimpleMode: boolean;
  editMode: boolean;
  reverse?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export const Bubble = styled.div<IBubbleStatus>`
  display: inline-block;
  padding: 0 ${px2rem(12)};
  border-radius: ${px2rem(16)};
  overflow: hidden;
  background-color: ${props =>
    props.reverse
      ? props.theme.colorV2.colorSet.grey100
      : props.theme.colorV2.colorSet.grey50};
  ${props =>
    !props.isSimpleMode &&
    (props.reverse
      ? css`
          border-top-right-radius: 0;
        `
      : css`
          border-top-left-radius: 0;
        `)};
  ${props =>
    (props.isLoading || props.isError) &&
    css`
      ${Contents} {
        opacity: 0.4;
      }
    `}
  ${props =>
    props.editMode &&
    css`
      width: 100%;
      padding: 0;
      border-radius: 0;
      background-color: transparent;
    `}
`;
