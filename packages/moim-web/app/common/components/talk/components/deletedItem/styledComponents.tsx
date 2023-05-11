import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  display: flex;
  padding: ${px2rem(8)} ${px2rem(16)} ${px2rem(4)};
  align-items: center;
`;

export const IconWrapper = styled.div`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  margin-right: ${px2rem(8)};
`;

export const Description = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
