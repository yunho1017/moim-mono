import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B4Regular,
  H10Bold,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import TimeIconBase from "@icon/18-time-g.svg";

export const NFTItemCellCollection = styled(B4Regular)`
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const NFTItemCellName = styled.div`
  ${H8BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  word-break: break-all;
`;

export const NFTItemCellPriceWrapper = styled.div<{ justifyContent: string }>`
  display: flex;
  align-items: flex-start;
  min-height: ${px2rem(20)};
  line-height: ${px2rem(20)};
  justify-content: ${props => props.justifyContent};
`;

export const NFTItemCellPrice = styled(H10Bold)`
  margin-left: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  word-break: break-all;
`;

export const NFTItemCellOwnerWrapper = styled.div<{ justifyContent: string }>`
  display: flex;
  width: 100%;
  height: ${px2rem(20)};
  justify-content: ${props => props.justifyContent};
  align-items: center;
`;

export const NFTItemCellOwner = styled(B4Regular)`
  margin-left: ${px2rem(4)};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const NFTItemCellPeriodWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: ${px2rem(20)};
  line-height: ${px2rem(20)};
  margin-top: ${px2rem(2)};
`;

export const NFTItemCellPeriod = styled(B4Regular)`
  margin-left: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const TimeIcon = styled(TimeIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
