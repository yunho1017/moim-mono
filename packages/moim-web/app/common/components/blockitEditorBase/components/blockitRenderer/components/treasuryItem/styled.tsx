import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { DefaultDivider } from "common/components/divider";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";

export const TreasuryItemWrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  ${SectionMarginTopBottom}
`;

export const TreasuryDivider = styled(DefaultDivider)`
  margin: ${px2rem(8)} 0;
`;

export const TreasurySkeletonBox = styled.div<{
  height?: string;
  width?: string;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${px2rem(4)};
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  ${props => props.overrideStyle};
`;

export const TreasurySkeletonFlexBox = styled(TreasurySkeletonBox)`
  width: ${props => props.width};
  height: ${props => props.height};
  padding-top: ${px2rem(11)};
  padding-left: ${px2rem(11)};
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: ${px2rem(9)};
  overflow: hidden;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const TreasurySkeletonContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(8)};
  border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50};
  box-sizing: border-box;
`;

export const TreasurySkeletonWrapper = styled.div`
  padding: ${px2rem(16)};
  item-align: center;
`;

export const roundSkeletonStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  border-radius: 100%;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TotalStatementWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
