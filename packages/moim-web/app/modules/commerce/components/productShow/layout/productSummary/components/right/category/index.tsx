import React from "react";

import { CategoryContainer, CategoryLabel, CategorySep } from "./styled";

import { MoimURL } from "common/helpers/url";
import { useStoreState } from "app/store";

interface IProps {
  productType: Moim.Commerce.PRODUCT_TYPE;
  categoryIds?: string[];
  block: Moim.Component.ProductShow.ICategory;
}
function Category({ productType, categoryIds, block }: IProps) {
  const category = useStoreState(state =>
    categoryIds?.map(id => state.entities.commerce_category[id]),
  );
  const elems = React.useMemo(
    () =>
      category
        ?.filter(i => Boolean(i))
        .map(ctg => (
          <>
            <CategoryLabel
              to={new MoimURL.CommerceCategories({
                id: ctg.id,
                section: "products",
              }).toString()}
              isFundType={productType === "fund"}
            >
              {ctg.name}
            </CategoryLabel>
            <CategorySep>・</CategorySep>
          </>
        )),
    [productType, category],
  );

  if (productType === "fund") {
    return null;
  }

  return elems && Boolean(elems.length) ? (
    <CategoryContainer
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
    >
      {elems}
    </CategoryContainer>
  ) : null;
}

export default React.memo(Category);
