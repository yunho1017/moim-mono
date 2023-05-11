import * as React from "react";
import ProductThumbnailImage from "./productThumbnailImage";
import { Wrapper, Body, Right, Title, Description } from "./styled";
import { Checkbox } from "common/components/designSystem/inputs";

interface IProps {
  isChecked: boolean;
  product: Moim.Commerce.IProduct;
  onSelectChange(productId: Moim.Id, checked: boolean): void;
}

const ProductItemRow: React.FC<IProps> = ({
  isChecked,
  product,
  onSelectChange,
}) => {
  const handleClick = React.useCallback(() => {
    onSelectChange(product.id, !isChecked);
  }, [onSelectChange, isChecked, product.id]);

  const handlePreventClick = React.useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  return (
    <Wrapper onClick={handleClick} selected={isChecked}>
      <ProductThumbnailImage images={product.images} />
      <Body>
        <Title>{product.name}</Title>
        {product.description && (
          <Description>{product.description}</Description>
        )}
      </Body>
      <Right>
        <Checkbox onClick={handlePreventClick} checked={isChecked} />
      </Right>
    </Wrapper>
  );
};

export default ProductItemRow;
