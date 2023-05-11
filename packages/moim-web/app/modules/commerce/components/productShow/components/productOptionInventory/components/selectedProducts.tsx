import * as React from "react";

import PurchaseReadyItem from "../../../../purchaseReadyItem";
import { ItemWrapper } from "../styled";

interface IProps {
  showRemoveButton: boolean;
  selectedProduct: Moim.Commerce.IPurchaseReadyItem[];
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<Moim.Commerce.IPurchaseReadyItem[]>
  >;
}

const SelectedProducts: React.FC<IProps> = ({
  showRemoveButton,
  selectedProduct,
  setSelectedProduct,
}) => {
  const handleChangeProductOptionChange = React.useCallback(
    (item: Moim.Commerce.IPurchaseReadyItem) => {
      setSelectedProduct(state =>
        state.map(i => {
          if (i.variantId === item.variantId) {
            return item;
          }
          return i;
        }),
      );
    },
    [],
  );
  const handleRemoveProduct = React.useCallback(
    (item: Moim.Commerce.IPurchaseReadyItem) => {
      setSelectedProduct(state =>
        state.filter(i => i.variantId !== item.variantId),
      );
    },
    [],
  );

  return (
    <>
      {selectedProduct.map(item => (
        <ItemWrapper key={`${item.productId}_${item.variantId}`}>
          <PurchaseReadyItem
            productId={item.productId}
            sellerId={item.sellerId}
            variantId={item.variantId}
            qty={item.qty}
            showRemoveButton={showRemoveButton}
            onChangeProperty={handleChangeProductOptionChange}
            onClickRemove={handleRemoveProduct}
          />
        </ItemWrapper>
      ))}
    </>
  );
};

export default React.memo(SelectedProducts);
