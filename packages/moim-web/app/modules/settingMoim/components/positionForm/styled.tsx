import styled from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled(B4Regular)`
  color: ${props => props.theme.color.red700};
`;

export const ColorInputWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(16)} 0;
  }
`;

export const FormWrapper = styled.div`
  height: 100%;
  padding: 0 ${px2rem(24)};
  ${useScrollStyle}
`;

export const SubmitButtonWrapper = styled.div`
  padding: ${px2rem(16)} ${px2rem(16)} ${px2rem(24)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const SubmitButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;
