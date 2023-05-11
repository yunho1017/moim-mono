import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: ${px2rem(68)};
  height: ${px2rem(72)};
  padding-top: ${px2rem(2)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: 50%;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin-top: ${px2rem(6)};
`;
