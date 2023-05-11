import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useStoreState, useActions } from "app/store";
import { getProductsSelector } from "app/selectors/commerce";
import { bufferedBatchProducts } from "app/actions/commerce";
// components
import ProductItemCell from "common/components/productItemCell";
import { withPlacement } from "../../hoc/withPlacement";
import { Wrapper, ItemContainer } from "./styled";

// NOTE: this below config's will change soon.
// blockit will pass this configs
const MOCK_DATA: Moim.Component.ProductItem.IWrapper = {
  type: "wrapper",
  direction: "row",
  children: [
    { type: "image" },
    {
      type: "wrapper",
      direction: "column",
      children: [
        { type: "product-name" },
        { type: "discount-price" },
        { type: "price" },
      ],
    },
  ],
};

interface IProps extends Omit<Moim.Blockit.IEmbedProductListBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const EmbedProductList: React.FC<IProps> = ({ productIds }) => {
  const products = useStoreState(
    state => getProductsSelector(state, productIds).data,
  );
  const { productBatch } = useActions({
    productBatch: bufferedBatchProducts,
  });

  React.useEffect(() => {
    if (
      !products ||
      products.length === 0 ||
      productIds.length !== products.length
    ) {
      const diffIds = productIds.filter(
        prdId => !products.find(prd => prd.id === prdId),
      );

      productBatch(diffIds);
    }
  }, [products]);

  return (
    <Wrapper>
      {products.map(prd => (
        // NOTE: ItemContainer re-styling to productItemCell
        <ItemContainer key={`embed-product-list-${prd.id}`}>
          <ProductItemCell productId={prd.id} block={MOCK_DATA} />
        </ItemContainer>
      ))}
    </Wrapper>
  );
};

export default withPlacement(React.memo(EmbedProductList));
