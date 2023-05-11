import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";

export const AgreementWrapper = styled.div`
  margin-top: ${px2rem(24)};
`;

export const CheckBoxTouchArea = styled.div`
  width: ${px2rem(42)};
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${px2rem(4)};
`;

export const CheckBoxInputTitle = styled(B3Regular)<{
  hasRequiredMark?: boolean;
}>`
  margin-left: ${px2rem(6)};
  position: relative;
  ${props =>
    props.hasRequiredMark &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: ${px2rem(6)};
        right: ${px2rem(-12)};
        width: ${px2rem(4)};
        height: ${px2rem(4)};
        border-radius: 50%;
        background-color: ${props => props.theme.color.red700};
      }
    `}
`;

export const AgreementAll = styled.div<{ required: boolean }>`
  display: flex;
  align-items: center;
  height: ${px2rem(42)};
  ${CheckBoxInputTitle} {
    color: ${props => props.theme.colorV2.colorSet.grey800};

    ${props =>
      props.required &&
      css`
        &::after {
          content: "";
          position: absolute;
          top: ${px2rem(6)};
          right: ${px2rem(-12)};
          width: ${px2rem(4)};
          height: ${px2rem(4)};
          border-radius: 50%;
          background-color: ${props => props.theme.color.red700};
        }
      `}
  }
`;

export const AgreementDetailWrapper = styled.div`
  display: flex;
  height: ${px2rem(42)};
  padding: 0 ${px2rem(16)};
`;

export const AgreementDetailItem = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;

  ${CheckBoxInputTitle} {
    color: ${props => props.theme.colorV2.colorSet.grey500};
  }
`;
