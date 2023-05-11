import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Layer = styled.div`
  ${useScrollStyle};
  overflow-y: auto;
  max-height: ${px2rem(280)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-radius: ${px2rem(2)};
  box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0
    ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.2)};
  z-index: ${props => props.theme.zIndexes.popover};
`;

export const List = styled.ul``;
