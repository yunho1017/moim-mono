import styled, { css } from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { B1RegularStyle, H9Bold } from "common/components/designSystem/typos";
import { FlatButton } from "common/components/designSystem/buttons";
import {
  BoxInputRight,
  NumberInput,
} from "common/components/designSystem/boxInput/styled";
import { useScrollStyle } from "common/components/designSystem/styles";

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const Section = styled.div`
  padding: 0 ${px2rem(16)} ${px2rem(16)};
`;

export const SectionTitle = styled(H9Bold)`
  height: ${px2rem(38)};
  line-height: ${px2rem(38)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SectionContent = styled.div`
  padding: ${px2rem(4)} 0;
`;

export const TransferDialogWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1 1 0%;
    min-height: 0;
    min-width: 0;
  }
`;

export const TransferDialogBody = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex: 1 1 0%;
    width: 100%;
    height: 100%;
    min-height: 0px;
    display: flex;
    flex-direction: column;
    ${useScrollStyle}
  }
`;

export const TransferDialogFooter = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-top: ${px2rem(16)};
  }
`;

export const TransferAmountInputWrapper = styled.div`
  height: ${px2rem(42)};
  display: flex;
  flex-direction: column;
  ${NumberInput} {
    ${B1RegularStyle}
    text-align: left;
    padding: 0 ${px2rem(16)};
    border-radius: ${px2rem(4)};
    border: 1px solid ${props => props.theme.colorV2.colorSet.grey200};
    background: none;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    &::placeholder {
      color: ${props => props.theme.colorV2.colorSet.grey800};
    }
  }
`;

export const SelectionStyle = css`
  padding: 0 !important;
`;

export const transferDialogMemberSelectionWrapperStyle = css`
  padding: ${px2rem(4)} 0;
`;
export const transterDialogWrapperStyle = css`
  padding: 0 ${px2rem(16)};
`;

export const DescriptionBoxStyle = css`
  position: relative;
  height: ${px2rem(102)};
  margin: 0;
  ${BoxInputRight} {
    position: absolute;
    bottom: ${px2rem(14)};
    right: ${px2rem(16)};
  }
`;

export const TransferButton = styled(FlatButton).attrs({ size: "l" })<{
  disabled?: boolean;
}>`
  width: 100%;
  cursor: ${props => (props.disabled ? "default !important" : "pointer")};
`;
