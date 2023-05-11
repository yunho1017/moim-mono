import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";
import SuccessIconBase from "@icon/48-positive.svg";
import FailureIconBase from "@icon/48-negative.svg";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H4Bold, B3Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 ${px2rem(24)};
`;

export const SubmitButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;

export const ResultContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: fit-content;
    margin-top: ${px2rem(130)};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: 100%;
  }
`;

export const ResultTitle = styled(H4Bold)`
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  text-align: center;
`;

export const ResultDescription = styled(B3Regular)`
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  white-space: pre-wrap;
  text-align: center;
`;

export const ResultButtonContainer = styled.div`
  width: 100%;
  padding: ${px2rem(16)};
  bottom: 0;
  left: 0;
  right: 0;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: absolute;
    padding-bottom: ${px2rem(24)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: fixed;
  }
`;

export const SuccessIcon = styled(SuccessIconBase).attrs({ size: "l" })``;
export const FailureIcon = styled(FailureIconBase).attrs({ size: "l" })``;
