import * as React from "react";
import debounce from "lodash/debounce";
import { FormattedMessage, useIntl } from "react-intl";
import { getProductDataWithoutView, paymentCalc } from "app/actions/commerce";

import { PriceInfoSection, PriceInfoTitle, TotalCost } from "../styled";
import AlertDialog from "common/components/alertDialog";
import {
  AdditionalFeeWithLargePreview,
  PriceWithAdditionalFees,
} from "../../../layout/productSummary/components/right/price/additionalFee";

import { useActions, useStoreState } from "app/store";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import { errorParseData } from "common/helpers/APIErrorParser";

const DEBOUNCED_TIME = 300;

interface IProps {
  productId: Moim.Id;
  selectedProduct: Moim.Commerce.IPurchaseReadyItem[];
}

const PriceInfo: React.FC<IProps> = ({ productId, selectedProduct }) => {
  const [calcResponse, setCalcResponse] = React.useState<
    Moim.Commerce.IPaymentCalcResponse | undefined
  >(undefined);

  const [invalidAlertMessage, setInvalidAlertMessage] = React.useState<
    string | undefined
  >(undefined);

  const intl = useIntl();
  const currentGroup = useCurrentGroup();
  const product = useStoreState(
    state =>
      state.entities.commerce_product[productId] as
        | Moim.Commerce.IProduct
        | undefined,
  );
  const { dispatchPaymentCalc } = useActions({
    dispatchFetchProductData: getProductDataWithoutView,
    dispatchPaymentCalc: paymentCalc,
  });

  const totalPrice = React.useMemo(
    () =>
      selectedProduct.length
        ? calcResponse?.items.reduce((acc, value) => acc + value.totalPrice, 0)
        : undefined,
    [selectedProduct.length, calcResponse],
  );

  const calculate = React.useCallback(
    debounce(async (_selectedProduct: Moim.Commerce.IPurchaseReadyItem[]) => {
      if (currentGroup?.seller_id && _selectedProduct.length && product) {
        dispatchPaymentCalc(currentGroup.seller_id, {
          items: [
            {
              sellerId: product.sellerId,
              groupedItems: [
                {
                  id: product?.deliveryGroupId || undefined,
                  items: _selectedProduct.map(selected => ({
                    productId,
                    productVariantId: selected.variantId,
                    deliveryGroupId: product?.deliveryGroupId,
                    quantity: selected.qty,
                    checked: true,
                    disabled: false,
                  })),
                },
              ],
            },
          ],
        })
          .then(res => {
            setCalcResponse(res);
          })
          .catch(err => {
            const error = errorParseData(err);
            if (error?.code === "INVALID_HOLDER") {
              setInvalidAlertMessage(
                intl.formatMessage({
                  id: "dialog_funding_purchase_no_rights_body",
                }),
              );
            }

            if (error?.code === "INVALID_LIMITATION") {
              setInvalidAlertMessage(
                intl.formatMessage({
                  id: "dialog_funding_number_of_purchase_limited_body",
                }),
              );
            }
            setCalcResponse(undefined);
            return;
          });
      }
    }, DEBOUNCED_TIME),
    [currentGroup?.seller_id, product],
  );

  React.useEffect(() => {
    calculate(selectedProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  return (
    <>
      <PriceInfoSection>
        <div className="left">
          <PriceInfoTitle>
            <FormattedMessage
              id={
                product?.type === "fund"
                  ? "price_total_funding_amount"
                  : "product_show_total_selected_price"
              }
            />
          </PriceInfoTitle>
        </div>
        <div className="right">
          <TotalCost isFund={product?.type === "fund"}>
            <PriceWithAdditionalFees
              currency={product?.currency}
              price={totalPrice ?? 0}
              additionalFees={calcResponse?.totalAdditionalFees}
              AdditionalFeeComponent={AdditionalFeeWithLargePreview}
            />
          </TotalCost>
        </div>
      </PriceInfoSection>

      <AlertDialog
        open={Boolean(invalidAlertMessage)}
        content={invalidAlertMessage}
        rightButtons={[
          {
            text: intl.formatMessage({ id: "ok_button" }),
            onClick: () => setInvalidAlertMessage(undefined),
          },
        ]}
        onClose={() => setInvalidAlertMessage(undefined)}
      />
    </>
  );
};

export default React.memo(PriceInfo);
