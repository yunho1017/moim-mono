import { B2Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import styled from "styled-components";

export const EmptyCase = styled(B2Regular)`
  padding: ${px2rem(54)} ${px2rem(16)};
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
