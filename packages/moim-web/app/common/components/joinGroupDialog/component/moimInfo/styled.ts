import styled from "styled-components";
import { H4Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: ${px2rem(16)} 0;
`;

export const MoimIconWrapper = styled.div`
  margin-right: ${px2rem(16)};
  border-radius: ${px2rem(6)};
  overflow: hidden;
`;

export const MoimNameWrapper = styled.div`
  flex: 1;
`;

export const MoimName = styled(H4Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
