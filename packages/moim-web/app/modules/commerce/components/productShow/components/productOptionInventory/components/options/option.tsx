import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  OptionSuffixContainer,
  ProductStatusLabel,
  SelectionWrapperStyled,
} from "../../styled";
import { StaticSelection } from "common/components/designSystem/selection";
import {
  AdditionalFeeWithPreview,
  PriceWithAdditionalFees,
} from "../../../../layout/productSummary/components/right/price/additionalFee";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";
import useProductStatusLabel from "common/components/commerce/statusLabel";

interface IProps {
  currency: string;
  option: Moim.Commerce.IProductOption;
  productType: Moim.Commerce.PRODUCT_TYPE;
  optionCount: number;
  variants?: Moim.Commerce.IProductVariant[];
  selectedOptions: Record<string, string>;
  onSelectOption(key: string, value: string): void;
}

const ProductOption: React.FC<IProps> = ({
  currency,
  productType,
  optionCount,
  option,
  variants,
  selectedOptions,
  onSelectOption,
}) => {
  const locale = useCurrentUserLocale();
  const {
    onSaleText,
    scheduledText,
    completedText,
    soldOutText,
  } = useProductStatusLabel(productType);
  const optionStatusLabel = React.useCallback(
    (status: Moim.Commerce.PRODUCT_STATUS) => {
      switch (status) {
        case "onSale": {
          return onSaleText;
        }

        case "scheduled": {
          return scheduledText;
        }

        case "completed": {
          return completedText;
        }

        case "soldOut": {
          return soldOutText;
        }
      }
    },
    [completedText, onSaleText, scheduledText, soldOutText],
  );

  const handleSelectOption = React.useCallback(
    (op: string) => {
      onSelectOption(option.key, op);
    },
    [onSelectOption, option.key],
  );

  const selectOptions = React.useMemo(() => {
    const reasonableVariantSuggest: Moim.Commerce.IProductVariant[] = [];
    if (variants) {
      if (optionCount === 1) {
        reasonableVariantSuggest.push(...variants);
      } else if (Object.keys(selectedOptions).length === optionCount - 1) {
        variants.forEach(variant => {
          const isImplied = Object.entries(selectedOptions).reduce(
            (flag, [key, val]) => flag && variant.values[key] === val,
            true,
          );

          if (isImplied) {
            reasonableVariantSuggest.push(variant);
          }
        });
      }
    }
    return option.items.map(i => {
      const matchVariant = reasonableVariantSuggest.find(variant => {
        const variantCombiOption = variant.values[option.key];
        return Boolean(variantCombiOption) && variantCombiOption === i.value;
      });

      const status = (() => {
        if (matchVariant) {
          if (matchVariant.stockCount === 0) {
            return "soldOut";
          } else {
            return matchVariant.status;
          }
        }
        return "onSale";
      })();

      return {
        isDisabled: matchVariant
          ? status !== "onSale" ||
            (matchVariant.stockCount !== undefined &&
              matchVariant.stockCount === 0)
          : false,
        label: i.title[locale] ?? i.title[Object.keys(i.title)[0]],
        value: i.value,
        prefix: i.imageUrl
          ? {
              touch: 42,
              leftMargin: 7,
              rightMargin: 3,
              element: <img src={i.imageUrl} width="30px" height="30px" />,
            }
          : undefined,
        suffix:
          matchVariant && !selectedOptions[option.key] ? (
            <OptionSuffixContainer>
              <PriceWithAdditionalFees
                currency={currency}
                price={matchVariant.price}
                additionalFees={matchVariant.additionalFees}
                AdditionalFeeComponent={AdditionalFeeWithPreview}
              />

              <ProductStatusLabel status={status}>
                {status === "onSale" ? (
                  matchVariant.stockCount === undefined ? (
                    ""
                  ) : (
                    <>
                      (
                      <FormattedMessage
                        id="status_option_left_stock_count"
                        values={{
                          count: matchVariant.stockCount,
                        }}
                      />
                      )
                    </>
                  )
                ) : (
                  <> · {optionStatusLabel(status)}</>
                )}
              </ProductStatusLabel>
            </OptionSuffixContainer>
          ) : (
            undefined
          ),
      };
    });
  }, [optionCount, option, selectedOptions, variants]);

  return (
    <StaticSelection
      key={option.key}
      size="l"
      state="normal"
      selected={selectedOptions[option.key]}
      options={selectOptions}
      placeholder={
        option.label[locale] ?? option.label[Object.keys(option.label)[0]]
      }
      isMultiple={false}
      onChange={handleSelectOption}
      overrideStyle={SelectionWrapperStyled}
      menuPortalTarget={document.body}
    />
  );
};

export default React.memo(ProductOption);
