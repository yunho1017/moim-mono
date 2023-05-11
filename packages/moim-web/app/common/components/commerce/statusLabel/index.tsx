import { useIntl } from "react-intl";
import useGroupTexts from "common/hooks/useGroupTexts";

const useProductStatusLabel = (
  productType?: Moim.Commerce.PRODUCT_TYPE,
): {
  onSaleText: string;
  scheduledText: string;
  completedText: string;
  soldOutText: string;
} => {
  const intl = useIntl();
  const onSaleText = useGroupTexts("sale_status_for_sale");
  const scheduledText = useGroupTexts(
    productType === "fund"
      ? "funding_status_scheduled"
      : "sale_status_scheduled",
  );
  const completedText = useGroupTexts(
    productType === "fund"
      ? "funding_status_completed"
      : "sale_status_finished",
  );
  const soldOutText = useGroupTexts(
    productType === "fund" ? "funding_status_sold_out" : "sale_status_sold_out",
  );

  return {
    onSaleText: onSaleText
      ? onSaleText.singular
      : productType === "fund"
      ? ""
      : intl.formatMessage({
          id: "sale_status_for_sale",
        }),
    scheduledText: scheduledText
      ? scheduledText.singular
      : intl.formatMessage({
          id:
            productType === "fund"
              ? "funding_status_scheduled"
              : "sale_status_scheduled",
        }),
    completedText: completedText
      ? completedText.singular
      : intl.formatMessage({
          id:
            productType === "fund"
              ? "funding_status_finished"
              : "sale_status_finished",
        }),
    soldOutText: soldOutText
      ? soldOutText.singular
      : intl.formatMessage({
          id:
            productType === "fund"
              ? "funding_status_soldout"
              : "sale_status_soldout",
        }),
  };
};

export default useProductStatusLabel;
