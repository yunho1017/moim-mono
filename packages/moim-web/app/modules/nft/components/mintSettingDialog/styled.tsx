import styled from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";
import { H8Bold } from "common/components/designSystem/typos";
import InfoIconBase from "@icon/18-info-g.svg";

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const DialogWrapper = styled.div`
  height: 100%;
  padding: ${px2rem(12)} ${px2rem(24)} ${px2rem(24)};
`;

export const MintSettingBottmSheetContainer = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const MintSettingBottmSheetWrapper = styled.div``;

export const Title = styled.div`
  margin-left: ${px2rem(9)};
`;

export const MintButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;

export const MintSettingPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${px2rem(36)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;

export const MintSettingPrice = styled(H8Bold)`
  font-weight: ${props => props.theme.font.bold};
`;

export const GasFeeInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  gap: ${px2rem(4)};
`;

export const InfoIcon = styled(InfoIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
