import styled from "styled-components";
import ChipBase from "common/components/chips";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";

export const TimeSaleChip = styled(ChipBase).attrs({
  shape: "rectangle",
  size: "medium",
})<{ badgeColor?: string }>`
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.white1000};
  background-color: ${props =>
    props.badgeColor ?? props.theme.colorV2.colorSet.white1000};
`;

export const TimeSaleChipContainer = styled.div`
  position: absolute;
  display: flex;
  width: calc(100% - ${px2rem(32)});
  top: ${px2rem(16)};
  left: ${px2rem(16)};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${px2rem(4)};
  z-index: ${props => props.theme.zIndexes.default};
`;

export const CoinChip = styled(TimeSaleChip)<{
  badgeColor?: string;
  scale?: Moim.Enums.ThemeColorScaleType;
}>`
  color: ${props => props.theme.themeMode.lightPalette.colorSet.grey900};

  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
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
