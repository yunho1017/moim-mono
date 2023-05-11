import styled, { css } from "styled-components";
import {
  H9Bold,
  B4Regular,
  H4Bold,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import {
  GhostGeneralButton,
  FlatButton,
} from "common/components/designSystem/buttons";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  max-width: ${px2rem(720)};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
export const Inner = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(16)};
  flex: 1;
  min-height: 0;
  ${useScrollStyle}
`;
export const Footer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;

  column-gap: ${px2rem(12)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    justify-content: space-between;
    padding: ${px2rem(8)} ${px2rem(16)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    justify-content: flex-end;
    padding: ${px2rem(24)} ${px2rem(16)} ${px2rem(8)};
  }
`;

export const DialogTitle = styled(H4Bold)`
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Title = styled(H9Bold)`
  padding: ${px2rem(6)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Description = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const CancelButton = styled(GhostGeneralButton).attrs({ size: "m" })`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    flex: 1;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: fit-content;
  }
`;

export const SubmitButton = styled(FlatButton).attrs({ size: "m" })`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    flex: 1;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: fit-content;
  }
`;

export const SelectionStyle = css`
  padding: ${px2rem(4)} 0;
`;

export const TokenInputWrapper = css<{ disabled?: boolean }>`
  background-color: ${props =>
    props.disabled ? props.theme.colorV2.colorSet.grey50 : "transparent"};
`;

export const SuffixLabel = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
