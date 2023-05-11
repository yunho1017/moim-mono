import styled from "styled-components";
import { H4Bold, B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding-bottom: ${px2rem(16)};
  ${props =>
    `border-bottom: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50}`};
`;

export const HeaderTitle = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const HeaderDescription = styled(B1Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
`;
