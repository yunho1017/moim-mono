import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import {
  FlatButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";
import {
  H8BoldStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";

import useHubSeller from "common/hooks/commerce/useHubSeller";
import { useSingleLineStyle } from "common/components/designSystem/styles";

const StyledAddCartButton = styled(GhostGeneralButton)`
  width: 100%;
`;

const StyledFlatAddCartButton = styled(FlatButton)`
  width: 100%;
  flex: 1;
  padding: 0;
  ${H8BoldStyle}
`;

export const AddCartButton: React.FC<{
  className?: string;
  buttonStyle?: "flat" | "ghost";
  buttonSize?: Moim.DesignSystem.Size;
  productType: Moim.Commerce.PRODUCT_TYPE;
  productStatus: Moim.Commerce.PRODUCT_STATUS;
  productStockCount?: number;
  onClick: React.MouseEventHandler<HTMLElement>;
}> = React.memo(
  ({
    className,
    buttonSize,
    buttonStyle = "ghost",
    productStatus,
    productType,
    productStockCount,
    onClick,
  }) => {
    const buttonDisableStatus = React.useMemo(
      () =>
        productStatus !== "onSale" ||
        (productStockCount !== undefined && productStockCount === 0),
      [productStatus, productStockCount],
    );

    const Button = React.useMemo(
      () =>
        buttonStyle === "flat" ? StyledFlatAddCartButton : StyledAddCartButton,
      [buttonStyle],
    );
    if (productType === "normal") {
      return (
        <Button
          className={className}
          size={buttonSize ?? "l"}
          disabled={buttonDisableStatus}
          onClick={onClick}
        >
          <FormattedMessage id="button_add_to_cart" />
        </Button>
      );
    }

    return null;
  },
);

export const useAddCartButtonVisible = () => {
  const hubSeller = useHubSeller();

  return Boolean(hubSeller === undefined || hubSeller?.config.cartEnabled);
};

export const useMobileProductShowAddCartButtonVisible = () => {
  const hubSeller = useHubSeller();
  return Boolean(
    hubSeller === undefined ||
      (hubSeller?.config.cartEnabled && hubSeller?.config.buyNowEnabled),
  );
};

export const ProductShowAddCartButton = styled(AddCartButton)`
  flex: 1;
  padding: 0;
  ${H8BoldStyle}
`;

export const ProductItemCellAddCartButton = styled(AddCartButton)`
  width: 100%;
  ${useSingleLineStyle}
  ${H10BoldStyle}
`;
