import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H4BoldStyle } from "common/components/designSystem/typos";

export const SchedulePriceWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(58)};
`;

export const SchedulePriceText = styled.div`
  ${H4BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-left: ${px2rem(12)};
`;
