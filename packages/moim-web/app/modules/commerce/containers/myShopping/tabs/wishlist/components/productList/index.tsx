import React from "react";
import styled from "styled-components";
import ProductItem from "../productItem";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import { px2rem } from "common/helpers/rem";

const Divider = () => (
  <>
    <Spacer value={8} />
    <DefaultDivider />
    <Spacer value={8} />
  </>
);

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;
`;

const ProductList: React.FC<{
  products: Moim.Commerce.IProduct[];
  onDeleteProduct(productId: string): void;
}> = ({ products, onDeleteProduct }) => {
  return (
    <Wrapper>
      {products.map((product, index) => (
        <>
          {index > 0 ? <Divider key={`${product.id}_divider`} /> : null}
          <ProductItem
            key={product.id}
            product={product}
            onDelete={onDeleteProduct}
          />
        </>
      ))}
    </Wrapper>
  );
};

export default ProductList;
