import styled, { css } from "styled-components";
import {
  H9Bold,
  B3Regular,
  H4Bold,
  B4Regular,
} from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 ${px2rem(16)};
`;

export const Inner = styled.div``;

export const Footer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(16)} 0 ${px2rem(26)};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(24)} 0;
  }
`;

export const Description = styled(B3Regular)`
  padding: ${px2rem(16)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SectionTitle = styled(H9Bold)`
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SelectionOverrideStyle = css`
  padding: ${px2rem(4)} 0;
`;

export const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${px2rem(5)} 0;

  .box {
    width: 100%;
    height: fit-content;
    padding: ${px2rem(8)} 0 ${px2rem(8)};
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
    border-radius: ${px2rem(4)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      padding: ${px2rem(12)} 0;
    }
  }
`;

export const AmountLabel = styled(B4Regular)`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const AmountValue = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const TokenValue = styled(B4Regular)`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SubmitButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;
