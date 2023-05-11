import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle } from "common/components/designSystem/typos";

export const Item = styled.li``;

export const ItemButton = styled.button`
  display: block;
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
  ${B1RegularStyle}

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;
