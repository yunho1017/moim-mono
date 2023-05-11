import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import isEqual from "lodash/isEqual";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import ProductOption from "./option";

export interface IProps {
  productId: Moim.Id;
  sellerId: Moim.Id;
  currency: string;
  productType: Moim.Commerce.PRODUCT_TYPE;
  options?: Moim.Commerce.IProductOption[];
  variants?: Moim.Commerce.IProductVariant[];
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<Moim.Commerce.IPurchaseReadyItem[]>
  >;
}

const ProductOptions: React.FC<IProps> = ({
  productId,
  sellerId,
  currency,
  productType,
  options,
  variants,
  setSelectedProduct,
}) => {
  const [selectedOptions, setSelectedOption] = React.useState<
    Record<string, string>
  >({});

  const { open: showToast } = useSnackbar({
    textElement: <FormattedMessage id="error_no_more_products" />,
  });

  const appendProduct = React.useCallback(
    (_selectedOptions: Record<string, string>) => {
      if (!variants) return;
      const targetVariant = variants.find(vari =>
        isEqual(vari.values, _selectedOptions),
      );

      if (targetVariant) {
        setSelectedProduct(state => {
          const targetProduct = state.find(
            i => i.variantId === targetVariant.id,
          );

          if (!targetProduct) {
            return state.concat({
              productId,
              sellerId,
              variantId: targetVariant.id,
              qty: 1,
            });
          }

          return state.map(i => {
            if (
              i.productId === targetProduct.productId &&
              i.variantId === targetProduct.variantId
            ) {
              if (targetProduct.qty + 1 > targetVariant.stockCount) {
                showToast();
                return i;
              } else {
                return {
                  ...targetProduct,
                  qty: targetProduct.qty + 1,
                };
              }
            }
            return i;
          });
        });
      }
    },
    [variants, setSelectedProduct, productId, sellerId, showToast],
  );

  const handleSelectOption = React.useCallback(
    (key: string, value: string) => {
      setSelectedOption(state => {
        const newState = {
          ...state,
          [key]: value,
        };

        if (
          options?.length &&
          options.length === Object.keys(newState).length
        ) {
          appendProduct(newState);

          return {};
        }

        return newState;
      });
    },
    [options, appendProduct],
  );

  return (
    <>
      {options?.map(opt => (
        <ProductOption
          key={opt.key}
          currency={currency}
          option={opt}
          productType={productType}
          optionCount={options.length}
          variants={variants}
          selectedOptions={selectedOptions}
          onSelectOption={handleSelectOption}
        />
      ))}
    </>
  );
};

export default React.memo(ProductOptions);
