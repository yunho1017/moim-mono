import * as React from "react";
import styled from "styled-components";
import ProductItemCell from "common/components/productItemCell";
import ProductItemCellSkeleton from "common/components/productItemCell/skeleton";
import { px2rem } from "common/helpers/rem";

const GridLayout = styled.div<{
  columnGapSize?: number;
  rowGapSize?: number;
  columnCount?: number;
  rowCount?: number;
}>`
  width: 100%;
  display: grid;

  column-gap: ${props => px2rem(props.columnGapSize ?? 12)};
  row-gap: ${props => px2rem(props.rowGapSize ?? 24)};

  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};
  grid-template-rows: ${props =>
    `repeat(${props.rowCount ?? 1}, minmax(0, 1fr))`};
  place-content: center;
`;

interface IProps {
  direction: "vertical" | "horizontal";
  column?: number;
  maxDisplayCount: number;
  isLoading?: boolean;
  products: Moim.Commerce.IProduct[];
  productItemLayout?: Moim.Component.ProductItem.IWrapper;
}

const ProductList: React.FC<IProps> = ({
  direction,
  column,
  maxDisplayCount,
  isLoading,
  products,
  productItemLayout,
}) => {
  const element = React.useMemo(() => {
    const isUndefinedArray = products.some(pd => pd?.id === undefined);
    if (isLoading || isUndefinedArray) {
      return new Array(maxDisplayCount)
        .fill(0)
        .map((_, idx) => (
          <ProductItemCellSkeleton
            key={`plp_skeleton_${idx}`}
            direction={productItemLayout?.direction}
          />
        ));
    }

    if (!isUndefinedArray) {
      return products
        .filter(pd => Boolean(pd) && Boolean(pd.isDisplayed))
        .map(product => (
          <ProductItemCell
            key={`${product.id}`}
            productId={product.id}
            block={productItemLayout}
          />
        ));
    }

    return null;
  }, [products, isLoading, productItemLayout, maxDisplayCount]);

  if (direction === "vertical") {
    return <GridLayout rowCount={maxDisplayCount}>{element}</GridLayout>;
  }
  return (
    <GridLayout columnCount={column ?? maxDisplayCount}>{element}</GridLayout>
  );
};

export default React.memo(ProductList);
