import styled, { css } from "styled-components";
import LeftIconBase from "@icon/18-larrow.svg";
import RightIconBase from "@icon/18-rarrow.svg";
import { px2rem } from "common/helpers/rem";

export const ArrowBox = styled.div<{ disabled?: boolean; marginLeft?: number }>`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  margin-left: ${props =>
    props.marginLeft ? px2rem(props.marginLeft) : undefined};

  :hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `}
`;

export const InnerArrowContainer = styled.div`
  position: relative;
`;

export const InnerLeftIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: ${`calc(50% + ${px2rem(9)})`};
  transform: translate(0%, -50%);
  z-index: ${props => props.theme.zIndexes.default};
`;

export const InnerRightIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: ${`calc(50% + ${px2rem(9)})`};
  transform: translate(0%, -50%);
  z-index: ${props => props.theme.zIndexes.default};
`;

export const LeftDim = styled.div<{ dimWidth?: number; dimHeight?: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${props => (props.dimWidth ? px2rem(props.dimWidth / 2) : 0)};
  height: ${props => px2rem(props.dimHeight ?? 0)};
  background-image: ${props =>
    `linear-gradient(to left, rgba(255, 255, 255, 0) 0%, ${props.theme.colorV2.colorSet.white1000} 45%, ${props.theme.colorV2.colorSet.white1000} 100%)`};

  z-index: ${props => props.theme.zIndexes.default};
`;

export const RightDim = styled.div<{ dimWidth?: number; dimHeight?: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${props => (props.dimWidth ? px2rem(props.dimWidth / 2) : 0)};
  height: ${props => px2rem(props.dimHeight ?? 0)};
  background-image: ${props =>
    `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, ${props.theme.colorV2.colorSet.white1000} 45%, ${props.theme.colorV2.colorSet.white1000} 100%)`};

  z-index: ${props => props.theme.zIndexes.default};
`;

export const PortalArrowContainer = styled.div``;

export const LeftIconResource = styled(LeftIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const RightIconResource = styled(RightIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
