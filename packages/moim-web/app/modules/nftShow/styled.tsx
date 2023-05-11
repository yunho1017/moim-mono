import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";
import { FlatButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  ${useScrollStyle}
`;

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex-direction: column-reverse;
  }
`;

export const ContentsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    display: block;
  }
`;

export const NFTShowContainer = styled.div`
  width: 100%;
`;

export const MintButton = styled(FlatButton).attrs({ size: "l" })<{
  disabled?: boolean;
}>`
  width: 100%;
`;
