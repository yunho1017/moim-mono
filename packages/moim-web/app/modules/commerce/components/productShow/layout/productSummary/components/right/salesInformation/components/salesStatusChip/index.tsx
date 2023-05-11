import React from "react";
import { css } from "styled-components";

import { SalesStatus } from "./styled";
import useProductStatusLabel from "common/components/commerce/statusLabel";

interface IProps {
  productType: Moim.Commerce.PRODUCT_TYPE;
  productStatus: Moim.Commerce.PRODUCT_STATUS;
}
export default function SalesStatusChip({
  productType,
  productStatus,
}: IProps) {
  const {
    onSaleText,
    scheduledText,
    completedText,
    soldOutText,
  } = useProductStatusLabel(productType);

  switch (productStatus) {
    case "onSale": {
      return (
        <SalesStatus
          overrideStyle={css`
            color: ${props => props.theme.color.cobalt800};
            background-color: ${props => props.theme.color.cobalt200};
          `}
        >
          {onSaleText}
        </SalesStatus>
      );
    }

    case "scheduled": {
      return (
        <SalesStatus
          overrideStyle={css`
            color: ${props => props.theme.colorV2.colorSet.grey800};
            background-color: ${props => props.theme.colorV2.colorSet.grey50};
          `}
        >
          {scheduledText}
        </SalesStatus>
      );
    }

    case "completed": {
      return (
        <SalesStatus
          overrideStyle={css`
            color: ${props => props.theme.color.cobalt800};
            background-color: ${props => props.theme.color.cobalt200};
          `}
        >
          {completedText}
        </SalesStatus>
      );
    }

    case "soldOut": {
      return (
        <SalesStatus
          overrideStyle={css`
            color: ${props => props.theme.color.red700};
            background-color: ${props => props.theme.color.red200};
          `}
        >
          {soldOutText}
        </SalesStatus>
      );
    }
  }
}
