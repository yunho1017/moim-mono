import styled, { css } from "styled-components";
import { B4Regular, H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import BackIconBase from "@icon/24-back-b";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: ${px2rem(4)};
  justify-content: space-between;
  align-items: flex-start;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled(H8Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const PaymentNumber = styled(B4Regular)`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const PaymentCancelButton = styled(GhostGeneralButton).attrs({
  size: "s",
})`
  width: fit-content;
  margin-right: ${px2rem(16)};
`;

export const InformationContainer = styled.div`
  width: 100%;
  padding: ${px2rem(16)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const PurchaseListContainer = styled.div`
  width: 100%;
  padding-bottom: ${px2rem(12)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const AppBarTitleWrapper = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const AppBarStickyWrapperStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const LeftButtonWrapper = styled.div``;

export const BackIcon = styled(BackIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;
