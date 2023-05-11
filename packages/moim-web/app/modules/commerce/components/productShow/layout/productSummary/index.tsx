import * as React from "react";

import ImagePreview from "../../components/imagePreview";
import MobileShareButton from "./components/left/mobileShareButton";
import TimeSaleChips from "./components/left/chips";
import { HeaderWrapper, Left, Right } from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import ProductSummaryRenderer from "./renderer";

import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import useIsMobile from "common/hooks/useIsMobile";

import { ProductShowHeaderContext } from "../../context";

const ProductSummary: React.FC<{
  block: Moim.Component.ProductShow.IProductSummary;
}> = ({ block }) => {
  const isMobile = useIsMobile();

  const { product } = React.useContext(ProductShowHeaderContext);

  const productSets = React.useMemo(
    () =>
      product?.productSets ? [...product.productSets].reverse() : undefined,
    [product?.productSets],
  );

  const productImages = product?.images;

  const openShareDialog = useOpenSNSShareDialog(location.href);

  return (
    <HeaderWrapper ratio={block.ratio ?? "1:1"}>
      <Left>
        {productImages && (
          <ImagePreview
            imageUrls={productImages.mobile}
            imageUrls_web={productImages.web}
          />
        )}
        <TimeSaleChips productSets={productSets} productId={product.id} />
        <MobileShareButton onShareClick={openShareDialog} />
      </Left>

      <Right>
        {isMobile && <Spacer value={12} />}
        {block.children.map(block => (
          <ProductSummaryRenderer key={block.type} block={block} />
        ))}
      </Right>
    </HeaderWrapper>
  );
};

export default React.memo(ProductSummary);
