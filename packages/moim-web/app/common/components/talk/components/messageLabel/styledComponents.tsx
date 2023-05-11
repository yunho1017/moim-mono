import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular, H10Bold } from "common/components/designSystem/typos";

export const Title = styled(B4Regular)`
  padding: ${px2rem(1)} ${px2rem(6)};
  border-radius: ${px2rem(10)};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const Status = styled(H10Bold)`
  padding: ${px2rem(1)} ${px2rem(6)};
  border-radius: ${px2rem(10)};

  background-color: ${props => props.theme.colorV2.accent};
  color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${px2rem(60)};

  & > ${Title} + ${Status} {
    margin-left: ${px2rem(8)};
  }
`;
