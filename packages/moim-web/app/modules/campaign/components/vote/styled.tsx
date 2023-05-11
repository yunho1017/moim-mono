import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H9Bold } from "common/components/designSystem/typos";
import {
  FlatGeneralButton,
  FlatButton,
} from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0 ${px2rem(32)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export const Inner = styled.div`
  width: 100%;
  height: fit-content;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-top: ${px2rem(16)};
  }
`;

export const Title = styled(H9Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(8)} 0;
`;

export const Footer = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${px2rem(8)} 0;
  display: flex;
  justify-content: space-between;
  column-gap: ${px2rem(12)};
  margin-bottom: ${px2rem(45)};
`;

export const DenyVoteButton = styled(FlatGeneralButton).attrs({ size: "l" })`
  width: 100%;
  flex: 1;
`;

export const AgreeVoteButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
  flex: 1;
`;
