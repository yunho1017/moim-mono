import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import ProductSetPreview from "./components/productSet";
import CategoryPreview from "./components/category";
import SellerPreview from "./components/seller";
import CampaignPreview from "./components/campaign";
import { Wrapper, DividerWrapper, Divider } from "./styled";
import useIsMobile from "common/hooks/useIsMobile";
import { withPlacement } from "../../../hoc/withPlacement";

interface IProps
  extends Omit<Moim.Blockit.Commerce.IProductListPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const ProductListPreview: React.FC<IProps> = ({
  direction_web,
  title,
  description,
  maxDisplayedItemsCount,
  maxDisplayedItemsCount_web,
  resourceType,
  resourceId,
  itemLayout_web,
}) => {
  const isMobile = useIsMobile();
  const inner = React.useMemo(() => {
    switch (resourceType) {
      case "productSet": {
        return (
          <ProductSetPreview
            title={title}
            description={description}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
            resourceId={resourceId}
            direction_web={direction_web}
            itemLayout_web={itemLayout_web}
          />
        );
      }

      case "category": {
        return (
          <CategoryPreview
            title={title}
            description={description}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
            resourceId={resourceId}
            direction_web={direction_web}
            itemLayout_web={itemLayout_web}
          />
        );
      }

      case "seller": {
        return (
          <SellerPreview
            title={title}
            description={description}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
            resourceId={resourceId}
            direction_web={direction_web}
            itemLayout_web={itemLayout_web}
          />
        );
      }

      case "campaign": {
        return (
          <CampaignPreview
            title={title}
            description={description}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
            resourceId={resourceId}
            direction_web={direction_web}
            itemLayout_web={itemLayout_web}
          />
        );
      }
    }
  }, [
    title,
    description,
    maxDisplayedItemsCount,
    maxDisplayedItemsCount_web,
    resourceId,
    direction_web,
    resourceType,
  ]);

  return (
    <Wrapper>
      {isMobile && (
        <DividerWrapper>
          <Divider />
        </DividerWrapper>
      )}
      {inner}
    </Wrapper>
  );
};

export default withPlacement(React.memo(ProductListPreview));
