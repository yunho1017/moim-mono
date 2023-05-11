import * as React from "react";

import { Inner, Header, TitleWrapper, Title, Description } from "../styled";
import ProductList from "./list";

import { useStoreState, arrayEqual } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { selectCampaignProject } from "app/selectors/campaign";
import { productItemLayoutSelector } from "app/selectors/componentLayout";

const CampaignPreview: React.FC<Pick<
  Moim.Blockit.Commerce.IProductListPreviewBlock,
  | "title"
  | "description"
  | "maxDisplayedItemsCount"
  | "maxDisplayedItemsCount_web"
  | "resourceId"
  | "direction_web"
  | "itemLayout_web"
>> = ({
  title,
  description,
  direction_web,
  maxDisplayedItemsCount,
  maxDisplayedItemsCount_web,
  resourceId,
  itemLayout_web,
}) => {
  const isMobile = useIsMobile();

  const productItemLayout = useStoreState(
    state => itemLayout_web ?? productItemLayoutSelector(state, "listPreview"),
  );

  const products = useStoreState(
    state =>
      resourceId
        ? selectCampaignProject(state, resourceId)?.products ?? []
        : [],
    arrayEqual,
  );

  const responsiveMaxDisplayCount = React.useMemo(
    () =>
      !isMobile && maxDisplayedItemsCount_web !== undefined
        ? maxDisplayedItemsCount_web
        : maxDisplayedItemsCount,
    [isMobile, maxDisplayedItemsCount_web, maxDisplayedItemsCount],
  );

  const splicedProducts = React.useMemo(
    () => products.slice(0, responsiveMaxDisplayCount),
    [responsiveMaxDisplayCount, products],
  );
  return (
    <Inner>
      <Header>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        {description && <Description>{description}</Description>}
      </Header>
      <ProductList
        direction={!isMobile && direction_web ? direction_web : "horizontal"}
        column={isMobile ? 1 : responsiveMaxDisplayCount}
        maxDisplayCount={responsiveMaxDisplayCount}
        isLoading={false}
        products={splicedProducts}
        productItemLayout={productItemLayout}
      />
    </Inner>
  );
};

export default React.memo(CampaignPreview);
