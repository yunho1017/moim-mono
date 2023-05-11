import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { getFlexAlignStyle } from "../wrapper/styled";

export const SellerContainer = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  width: 100%;
  display: flex;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${props =>
    props.horizontalAlign &&
    getFlexAlignStyle({
      direction: "row",
      horizontalAlign: props.horizontalAlign,
    })}
`;

export const Wrapper = styled.div`
  padding: ${px2rem(4)} 0;
`;
