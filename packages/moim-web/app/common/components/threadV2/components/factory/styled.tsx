import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { THREAD_V2_TYPE } from ".";
import { sizeMap } from "./size";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Left = styled.div`
  width: fit-content;
  height: fit-content;
`;

export const Right = styled.div`
  flex: 1;
  width: 100%;
  height: fit-content;
  min-width: 0;
`;

export const Row = styled.div<{ reverse?: boolean; marginBottom?: number }>`
  ${props =>
    props.reverse &&
    css`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    `};
  margin-bottom: ${props => px2rem(props.marginBottom ?? 4)};

  :last-of-type {
    margin-bottom: 0;
  }
`;

export interface IWrapperProps {
  type: THREAD_V2_TYPE;
  size?: Moim.DesignSystem.Size;
  reverse?: boolean;
  isAnonymous?: boolean;
  isFullWidth?: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  display: flex;
  padding: ${px2rem(2)} ${px2rem(16)} ;
  margin-right: auto;
  width:100%;

  ${props =>
    props.isAnonymous &&
    css`
      cursor: initial;
    `}

  ${Left} + ${Right} {
    margin-left: ${px2rem(16)};
  }

  ${props =>
    props.type === "message"
      ? !props.isFullWidth && props.reverse
        ? css`
            max-width: 70%;
          `
        : css`
            max-width: 85%;
          `
      : null};

  ${props =>
    props.reverse &&
    css`
      margin-left: auto;
      margin-right: 0;
      /* flex-direction: row-reverse; */
      ${Left} + ${Right} {
        margin-right: ${px2rem(16)};
      }
  `};

  ${Left} {
     ${props =>
       props.size &&
       css`
         width: ${px2rem(sizeMap.get(props.size)!)};
       `};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${props =>
      props.type === "message"
        ? !props.isFullWidth && props.reverse
          ? css`
              max-width: 75%;
            `
          : css`
              max-width: 90%;
            `
        : null};
  }

`;

export const HoverMenu = styled.div<{ hover?: boolean }>`
  height: ${px2rem(30)};
  border-radius: ${px2rem(2)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.95)};

  position: absolute;
  top: -${px2rem(22)};
  right: ${px2rem(8)};
  flex-direction: column;
  align-items: center;

  z-index: ${props => (props.theme.zIndexes.gnbSticky as number) + 1};
  ${props =>
    !props.hover &&
    css`
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
    `};
`;

export const HoverMenuItem = styled.div`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
`;
