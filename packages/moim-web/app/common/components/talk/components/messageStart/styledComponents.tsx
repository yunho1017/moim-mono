import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular, H4Bold } from "common/components/designSystem/typos";

export const Wrapper = styled.div``;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: ${px2rem(13)};
  padding: 0 ${px2rem(16)};
`;

export const DirectMessageHeader = styled(Header)`
  padding: 0 ${px2rem(16)} 0 0;
`;

export const Title = styled(H4Bold)`
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const DirectMessageTitle = styled(Title)`
  margin-left: ${px2rem(8)};
`;

export const Description = styled(B1Regular)`
  padding: ${px2rem(10)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const CreatorName = styled(B1Regular)`
  color: ${props => props.theme.colorV2.secondary.dark};
`;
