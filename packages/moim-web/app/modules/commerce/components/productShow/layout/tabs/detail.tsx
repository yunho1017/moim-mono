import * as React from "react";
import { useIntl } from "react-intl";
import { TabLoadingWrapper } from ".";

import ProductDetail from "../../components/productDetail";
import ProductDetailInformation from "../../components/productDetailInformation";

import { Section, SectionHead } from "../../styled";

interface IProps {
  productType: Moim.Commerce.PRODUCT_TYPE;
  content: Moim.Blockit.Blocks[];
  detailImages?: {
    web: Moim.Commerce.IImage[];
    mobile: Moim.Commerce.IImage[];
  };
  details?: Moim.Commerce.IProductDetail[];
}

const DetailTab: React.FC<IProps> = React.memo(
  ({ productType, content, detailImages, details }) => (
    <Section>
      <ProductDetail
        productType={productType}
        content={content}
        detailImages={detailImages}
      />
      <SectionHead>
        <ProductDetailInformation details={details} />
      </SectionHead>
    </Section>
  ),
);

export default function useDetailTab(
  isLoading: boolean | undefined,
  productType: Moim.Commerce.PRODUCT_TYPE = "normal",
  content: Moim.Blockit.Blocks[],
  detailImages?: {
    web: Moim.Commerce.IImage[];
    mobile: Moim.Commerce.IImage[];
  },
  details?: Moim.Commerce.IProductDetail[],
) {
  const intl = useIntl();
  const titleKey = React.useMemo(() => {
    switch (productType) {
      case "fund":
        return "funding_show/funding_detail_title";
      default:
      case "subscription":
      case "normal":
        return "product_show/tab_title_product_detail";
    }
  }, [productType]);

  return React.useMemo(
    () => ({
      id: "detail",
      title: intl.formatMessage({
        id: titleKey,
      }),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <DetailTab
            productType={productType}
            content={content}
            detailImages={detailImages}
            details={details}
          />
        </TabLoadingWrapper>
      ),
    }),
    [content, detailImages, details, intl, isLoading, productType, titleKey],
  );
}
