import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  B4Regular,
  B4RegularStyle,
  B2Regular,
  B3Regular,
  H4BoldStyle,
  H10BoldStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { FlatButton } from "../../buttons/styled";
import TimeIconBase from "@icon/18-time-g.svg";
import DropdownIconBase from "@icon/18-downarrow-g";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Title = styled.div`
  ${H10BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-bottom: ${px2rem(4)};
`;

export const DetailTitleButton = styled.div.attrs({ role: "button" })`
  display: flex;
  align-items: flex-start;
  user-select: none;
`;

export const DescriptionText = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${Title} + &{
    margin-bottom: ${px2rem(16)};
  }
`;

export const DetailRow = styled.div`
  height: ${px2rem(31)};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const DetailLabel = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const DetailValue = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const DetailWrapper = styled.div<{ opened: boolean }>`
  display: ${props => (props.opened ? "block" : "none")};
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: ${px2rem(14)} ${px2rem(16)};
`;

export const ProgressBar = styled.progress<{ isFull: boolean }>`
  appearance: none;
  width: 100%;
  height: ${px2rem(8)};
  margin: ${px2rem(18)} 0;
  &::-webkit-progress-bar {
    background: ${props => rgba(props.theme.colorV2.accent, 0.14)};
    border-radius: ${px2rem(4)};
  }
  &::-webkit-progress-value {
    background: ${props => props.theme.colorV2.accent};
    border-radius: ${props =>
      props.isFull ? `${px2rem(4)}` : `${px2rem(4)} 0 0 ${px2rem(4)}`};
  }
`;

export const TextRarity = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.accent};
`;

export const RarityCircularbarWrapper = styled.div`
  position: relative;
  width: ${px2rem(50)};
  height: ${px2rem(50)};
`;

export const RarityCircularPercent = styled.div`
  ${B4RegularStyle}
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: ${px2rem(50)};
  color: ${props => props.theme.colorV2.accent};
`;

export const PropertyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${px2rem(8)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-bottom: ${px2rem(16)};
  }
`;

export const PropertyItem = styled.div<{ columnCnt: number }>`
  width: ${props =>
    props.columnCnt > 1
      ? `calc(100% / ${props.columnCnt} - ${px2rem(4)})`
      : `100%`};
  height: ${px2rem(129)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: ${px2rem(12)};
`;

export const TraitType = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle};
  margin-bottom: ${px2rem(8)};
  ${useSingleLineStyle}
`;

export const TraitValue = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const RarityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  max-height: ${px2rem(60)};
  height: 100%;
`;

export const CollectionName = styled.div`
  ${H10BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(8)};
`;

export const ItemName = styled.div.attrs({ role: "button" })`
  ${H8BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(8)};
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${px2rem(12)};
`;

export const OwnerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${px2rem(4)};
  margin-bottom: ${px2rem(12)};
  ${Title} {
    margin-bottom: 0;
  }
`;

export const OwnerNameWrapper = styled.div`
  ${H10BoldStyle}
  cursor: pointer;
`;

export const CompactWrapper = styled.div`
  margin-bottom: ${px2rem(16)};
`;

export const PriceNumber = styled.div`
  ${H4BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-left: ${px2rem(12)};
`;

export const MintButton = styled(FlatButton).attrs({ size: "m" })<{
  disabled?: boolean;
}>`
  width: 100%;
  cursor: ${props => (props.disabled ? "default !important" : "pointer")};
`;

export const PeriodWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(20)};
  margin-top: ${px2rem(4)};
`;

export const PeriodText = styled(B4Regular)`
  margin-left: ${px2rem(6)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const TimeIcon = styled(TimeIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const DropdownIcon = styled(DropdownIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))<{ opened: boolean }>`
  margin-left: ${px2rem(4)};
  transform: ${props => (props.opened ? "rotate(180deg)" : "rotate(0deg)")};
`;
