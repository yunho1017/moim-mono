import styled from "styled-components";

import { B2Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

// TODO: theme typing 체크
export const EditButton = styled(B2Regular).attrs({ role: "button" })`
  color: ${props => props.theme.colorV2.colorSet.white1000};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${props => (props.theme.zIndexes.gnbSticky as number) + 1};
  padding: ${px2rem(5)} ${px2rem(12)};
  background-color: ${props => props.theme.colorV2.colorSet.grey100};
`;
