import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import ChipBase from "common/components/chips";
import { rgba } from "polished";

export const TimeSaleChip = styled(ChipBase).attrs({
  shape: "rectangle",
  size: "small",
})<{ badgeColor?: string }>`
  width: fit-content;
  max-width: 100%;
  height: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  background-color: ${props =>
    props.badgeColor ?? props.theme.colorV2.colorSet.white1000};
`;

export const CoinChip = styled(TimeSaleChip)<{
  badgeColor?: string;
  scale?: Moim.Enums.ThemeColorScaleType;
}>`
  color: ${props => props.theme.themeMode.lightPalette.colorSet.grey900};

  position: relative;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  overflow: hidden;
  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background-color: ${props =>
      props.badgeColor ? rgba(props.badgeColor, 0.2) : undefined};
  }
`;

export const CoinImage = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: ${px2rem(14)};
    height: ${px2rem(14)};
    object-fit: cover;
  }
`;

export const TimeSaleChipContainer = styled.div`
  position: absolute;
  top: ${px2rem(10)};
  left: ${px2rem(10)};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${px2rem(4)};
  width: calc(100% - ${px2rem(20)});
  z-index: ${props => props.theme.zIndexes.default};
`;
