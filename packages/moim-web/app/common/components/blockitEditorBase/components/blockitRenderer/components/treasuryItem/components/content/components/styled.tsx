import styled, { css, keyframes } from "styled-components";
import { px2rem } from "common/helpers/rem";
import RetryIconBase from "@icon/18-retry-g.svg";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import {
  B1Regular,
  B1RegularStyle,
  B4Regular,
  B4RegularStyle,
  H8Bold,
  H10Bold,
  H4BoldStyle,
} from "common/components/designSystem/typos";

export const CaptionWrapper = styled.div`
${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const MainBalanceWrapper = styled.div`
  ${H4BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: ${px2rem(6)} 0;
  align-items: center;
  gap: ${px2rem(5)};
`;

export const SubBalanceWrapper = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey600};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: ${px2rem(2)} 0;
`;

export const DescriptionWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(10)} ${px2rem(8)} ${px2rem(16)};
`;

export const DescriptionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DescriptionTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  margin: ${px2rem(6)} 0;
  ${useSingleLineStyle};
`;

export const Description = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin: 0;
`;

const loadingAnimationKeyframe = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
  touch: 30,
  role: "button",
}))<{ isRefreshing: boolean }>`
  ${props =>
    props.isRefreshing &&
    css`
      animation: ${loadingAnimationKeyframe} 1s 1 ease-out;
    `}
`;

export const RetryIconWrapper = styled.div`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

export const StatementTotalIncomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: ${px2rem(16)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 50%;
  }
`;

export const StatementCaptionWrapper = styled.div`
${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const StatementMainBalanceWrapper = styled.div`
  ${B1RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: ${px2rem(6)} 0;
  ${useSingleLineStyle}
`;

export const StatementSubBalanceWrapper = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey600};
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: ${px2rem(2)} 0;
`;

export const WalletsWrapper = styled.div`
  margin: ${px2rem(12)} 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    grid-template-columns: 1fr;
  }
`;

export const WalletWrapper = styled.div`
  margin: ${px2rem(6)} 0;
  padding: 0 ${px2rem(16)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${px2rem(60)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:nth-child(odd) {
      border-right: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
    }
  }
`;

export const WalletCurrencyIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  padding: ${px2rem(6)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: 100%;
  justify-content: center;
  align-items: center;
`;

export const WalletCurrencyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${px2rem(12)};
`;

export const WalletBalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const WalletStyledBodyOne = styled(B1Regular)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const WalletStyledHeadingSeven = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(4)};
`;

export const WalletStyledCaption = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
