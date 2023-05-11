import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { FlatButton } from "common/components/designSystem/buttons";
import {
  H8BoldStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import useGroupTexts from "common/hooks/useGroupTexts";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import { useSingleLineStyle } from "common/components/designSystem/styles";

const BuyButton = styled(FlatButton)`
  width: 100%;
  flex: 1;
  padding: 0;
  ${H8BoldStyle}
`;

export const BuyNowButton: React.FC<{
  className?: string;
  buttonSize?: Moim.DesignSystem.Size;
  productType: Moim.Commerce.PRODUCT_TYPE;
  productStatus: Moim.Commerce.PRODUCT_STATUS;
  productStockCount?: number;
  onClick: React.MouseEventHandler<HTMLElement>;
}> = React.memo(
  ({
    className,
    buttonSize,
    productType,
    productStatus,
    productStockCount,
    onClick,
  }) => {
    const buyNowText = useGroupTexts(
      productType === "fund" ? "back_this_project" : "button_buy_now",
    );

    const buyNowTextElement = React.useMemo(
      () =>
        buyNowText ? (
          buyNowText.singular
        ) : (
          <FormattedMessage id="button_buy_now" />
        ),
      [buyNowText],
    );

    const buttonDisableStatus = React.useMemo(
      () =>
        productStatus !== "onSale" ||
        (productStockCount !== undefined && productStockCount === 0),
      [productStatus, productStockCount],
    );
    return (
      <BuyButton
        className={className}
        size={buttonSize ?? "l"}
        disabled={buttonDisableStatus}
        onClick={onClick}
      >
        {buyNowTextElement}
      </BuyButton>
    );
  },
);

export const useBuyNowButtonVisible = () => {
  const hubSeller = useHubSeller();

  return Boolean(
    hubSeller === undefined ||
      hubSeller?.config.buyNowEnabled ||
      !hubSeller?.config.cartEnabled,
  );
};

export const ProductShowBuyNowButton = styled(BuyNowButton)`
  flex: 1;
  padding: 0;
  ${H8BoldStyle}
`;

export const ProductItemCellBuyNowButton = styled(BuyNowButton)`
  width: 100%;
  ${useSingleLineStyle}
  ${H10BoldStyle}
`;
