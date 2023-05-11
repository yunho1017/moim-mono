import styled, { css } from "styled-components";
import { DiscountPercentage, OriginPrice } from "./components/discountPrice";
import { ImageContainer } from "./components/image/styled";
import { PriceWrapper } from "./components/price";

export const Wrapper = styled.div<{
  status?: Moim.Commerce.PRODUCT_STATUS;
}>`
  position: relative;
  width: 100%;
  height: 100%;

  display: inline-flex;

  ${props => {
    if (props.status === "soldOut" || props.status === "completed") {
      return css`
      ${DiscountPercentage},
      ${OriginPrice},
      ${PriceWrapper} {
        opacity: 0.4;
      }
      `;
    }
  }};

  :hover {
    ${ImageContainer} img {
      transform: scale(1.1);
    }
  }
`;
