import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import ExpandIconBase from "@icon/24-spread-arrow-g.svg";
import { B3RegularStyle } from "../designSystem/typos";

const HEADER_HEIGHT = 52;
const DEFAULT_ICON_SIZE = 48;

export const BoxWrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  z-index: ${props => props.theme.zIndexes.default};
  ${props => props.overrideStyle};

  .bodyAnim-enter-active {
    animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s 1 expand;
  }

  .bodyAnim-exit-active {
    animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s 1 reverse expand;
  }

  @keyframes expand {
    0% {
      opacity: 0;
      height: 0;
    }

    100% {
      opacity: 1;
      height: auto;
    }
  }
`;

export const HeaderContainer = styled.div<{
  disableHeadClick?: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${props => {
    if (!props.disableHeadClick) {
      return `cursor: pointer;`;
    }
  }}

  ${props => props.overrideStyle};
`;

export const TitleHeaderContainer = styled.div`
  width: 100%;
  height: ${px2rem(HEADER_HEIGHT)};
  display: flex;
  align-items: center;
`;
export const SubTitleHeaderContainer = styled.div`
  width: 100%;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  user-select: none;
`;
export const BodyContainer = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  ${props => props.overrideStyle};
`;

export const ArrowIcon = styled(ExpandIconBase).attrs<{ iconSize?: number }>(
  props => ({
    size: "s",
    touch: props.iconSize || DEFAULT_ICON_SIZE,
    iconColor: "#AEB8BD",
  }),
)``;

export const CollapseIconButton = styled.button<{
  open: boolean;
  iconSize?: number;
}>`
  width: ${props => px2rem(props.iconSize || DEFAULT_ICON_SIZE)};
  height: ${props => px2rem(props.iconSize || DEFAULT_ICON_SIZE)};

  & > * {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    ${props =>
      props.open
        ? css`
            transform: rotate(180deg);
          `
        : css`
            transform: rotate(0deg);
          `}
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionLabel = styled.span`
  ${B3RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
