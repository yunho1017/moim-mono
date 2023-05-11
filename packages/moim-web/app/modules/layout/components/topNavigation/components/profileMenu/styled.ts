import styled from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const MenuSubTitle = styled(B4Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
