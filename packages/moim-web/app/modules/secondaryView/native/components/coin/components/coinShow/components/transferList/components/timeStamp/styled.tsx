import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H10Bold } from "common/components/designSystem/typos";

export const TimeStampTitle = styled(H10Bold)`
  height: ${px2rem(60)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(12)} ${px2rem(16)};
`;
