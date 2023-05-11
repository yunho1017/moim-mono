import { B4RegularStyle } from "common/components/designSystem/typos";
import styled from "styled-components";

const ProductOptionStatus = styled.div<{
  status: Moim.Commerce.PRODUCT_STATUS;
}>`
  text-transform: uppercase;
  color: ${props => {
    switch (props.status) {
      case "onSale":
      case "scheduled": {
        return props.theme.colorV2.colorSet.grey500;
      }
      case "completed":
      case "soldOut": {
        return props.theme.color.red700;
      }
    }
  }};
  ${B4RegularStyle};
`;

export default ProductOptionStatus;
