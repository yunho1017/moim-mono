import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useStoreState, useActions } from "app/store";
import { getProductsSelector } from "app/selectors/commerce";
import { bufferedBatchProducts } from "app/actions/commerce";
// components
import ProductItemCell from "common/components/productItemCell";
import { withPlacement } from "../../hoc/withPlacement";
import { Wrapper, ItemContainer } from "./styled";
import { productItemLayoutSelector } from "app/selectors/componentLayout";
import useIsMobile from "common/hooks/useIsMobile";

// NOTE: this below config's will change soon.
// blockit will pass this configs

interface IProps extends Omit<Moim.Blockit.IEmbedProductListBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const EmbedProductList: React.FC<IProps> = ({ productIds }) => {
  const isMobile = useIsMobile();
  const products = useStoreState(
    state => getProductsSelector(state, productIds).data,
  );
  const productItemLayout = useStoreState(state =>
    isMobile
      ? productItemLayoutSelector(state, "embeddingProduct")
      : productItemLayoutSelector(state, "embeddingProduct_web"),
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
          <ProductItemCell productId={prd.id} block={productItemLayout} />
        </ItemContainer>
      ))}
    </Wrapper>
  );
};

export default withPlacement(React.memo(EmbedProductList));
