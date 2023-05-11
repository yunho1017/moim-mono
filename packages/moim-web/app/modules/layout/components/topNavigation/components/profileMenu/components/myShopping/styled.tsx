// vendor
import styled from "styled-components";
// component

import MyShoppingSmallIconBase from "@icon/18-myshopping-1.svg";
import MyShoppingIconBase from "@icon/24-myshopping-1.svg";

export const MyShoppingSmallIcon = styled(MyShoppingSmallIconBase).attrs(
  props => ({
    size: "xs",
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;

export const MyShoppingIcon = styled(MyShoppingIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
