import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px2rem(52)};
  padding: ${px2rem(8)} ${px2rem(16)};
  gap: ${px2rem(6)}
  overflow: hidden;
  position: relative;
`;

export const MoreCount = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
