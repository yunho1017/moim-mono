import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular, H8Bold } from "common/components/designSystem/typos";
import { GhostButton } from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  margin-top: ${px2rem(60)};
`;

export const Badge = styled.div`
  margin: ${px2rem(12)} 0 ${px2rem(8)};
  font-size: ${px2rem(68)};
  text-align: center;
`;

export const Title = styled(H8Bold)`
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Description = styled(B1Regular)`
  margin-top: ${px2rem(4)};
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const AppointButton = styled(GhostButton).attrs({ size: "m" })`
  display: block;
  margin: ${px2rem(22)} auto ${px2rem(80)};
`;
