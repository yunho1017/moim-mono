import styled from "styled-components";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
import { H9Bold, B4Regular } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";

export const Title = styled(H9Bold)`
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const ErrorMessage = styled(B4Regular)`
  padding: ${px2rem(8)} 0 0;
  color: ${props => props.theme.color.red700};
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: ${px2rem(4)};
`;

export const SendCodeButton = styled(FlatGeneralButton).attrs({ size: "s" })``;
export const VerifyCodeButton = styled(FlatGeneralButton).attrs({
  size: "s",
})``;

export const SendInputWrapper = styled.div``;
export const VerifyInputWrapper = styled.div``;

export const Wrapper = styled.div`
  margin-bottom: ${px2rem(24)};

  ${SendInputWrapper} {
    margin-top: ${px2rem(8)};
  }

  ${SendInputWrapper} + ${VerifyInputWrapper} {
    margin-top: ${px2rem(20)};
  }
`;
