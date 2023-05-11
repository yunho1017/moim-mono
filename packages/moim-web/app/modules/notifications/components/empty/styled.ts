import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular, H8Bold } from "common/components/designSystem/typos";
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Emoji = styled.div`
  width: ${px2rem(80)};
  height: ${px2rem(90)};
  font-size: ${px2rem(60)};
  line-height: 1.5;
  margin-bottom: ${px2rem(16)};
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  color: ${props => props.theme.font.bold};
  margin-bottom: ${px2rem(8)};
`;

export const Description = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
