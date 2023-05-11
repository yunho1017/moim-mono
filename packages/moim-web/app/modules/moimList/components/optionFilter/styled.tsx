import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import ChipBase from "common/components/chips";
import { MEDIA_QUERY } from "common/constants/responsive";
// icons
import ArrowIconBase from "@icon/24-spread-arrow-g.svg";

export const Wrapper = styled.div`
  width: 100%;
`;

export const ArrowIcon = styled(ArrowIconBase).attrs<{ iconSize?: number }>(
  props => ({
    size: "s",
    touch: props.iconSize || 24,
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;

export const ArrowButton = styled.button<{ open: boolean }>`
  display: inline-flex;
  align-items: center;
  ${ArrowIcon} {
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

const ChipStyle = css`
  height: ${px2rem(30)};
  max-width: 100%;
  padding-right: ${px2rem(10)};

  &[data-selected="true"] {
    color: ${props => props.theme.colorV2.colorSet.white1000};
    background-color: transparent;
  }
  &[data-selected="false"] {
    color: ${props => props.theme.colorV2.colorSet.grey300};
    background-color: transparent;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover {
      opacity: 0.6;
    }
  }
`;

export const Chip = styled(ChipBase).attrs({
  shape: "round",
  size: "large",
  overrideStyle: ChipStyle,
})``;

export const ChipInner = styled.div`
  display: flex;
  align-items: center;
`;
export const OptionLabel = styled.label`
  display: inline-block;
  user-select: none;
  flex: 1;
  min-width: 0;
`;
