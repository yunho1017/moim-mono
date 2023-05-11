import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import ProductSetPreview from "./components/productSet";
import CategoryPreview from "./components/category";
import SellerPreview from "./components/seller";
import CampaignPreview from "./components/campaign";
import { Wrapper } from "./styled";
import { withPlacement } from "../../../hoc/withPlacement";

interface IProps
  extends Omit<Moim.Blockit.Commerce.IProductListPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const ProductListPreview: React.FC<IProps> = ({
  title,
  description,
  header,
  footer,
  resourceType,
  resourceId,
  itemLayout_web,
  listElement,
  maxDisplayedItemsCount,
  maxDisplayedItemsCount_web,
}) => {
  const inner = React.useMemo(() => {
    switch (resourceType) {
      case "productSet": {
        return (
          <ProductSetPreview
            title={title}
            description={description}
            header={header}
            footer={footer}
            resourceId={resourceId}
            itemLayout_web={itemLayout_web}
            listElement={listElement}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
          />
        );
      }

      case "category": {
        return (
          <CategoryPreview
            title={title}
            description={description}
            header={header}
            footer={footer}
            resourceId={resourceId}
            itemLayout_web={itemLayout_web}
            listElement={listElement}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
          />
        );
      }

      case "seller": {
        return (
          <SellerPreview
            title={title}
            description={description}
            header={header}
            footer={footer}
            resourceId={resourceId}
            itemLayout_web={itemLayout_web}
            listElement={listElement}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
          />
        );
      }

      case "campaign": {
        return (
          <CampaignPreview
            title={title}
            description={description}
            header={header}
            footer={footer}
            resourceId={resourceId}
            itemLayout_web={itemLayout_web}
            listElement={listElement}
            maxDisplayedItemsCount={maxDisplayedItemsCount}
            maxDisplayedItemsCount_web={maxDisplayedItemsCount_web}
          />
        );
      }
    }
  }, [
    resourceType,
    title,
    description,
    header,
    footer,
    maxDisplayedItemsCount,
    maxDisplayedItemsCount_web,
    resourceId,
    itemLayout_web,
    listElement,
  ]);

  return <Wrapper>{inner}</Wrapper>;
};

export default withPlacement(React.memo(ProductListPreview));
