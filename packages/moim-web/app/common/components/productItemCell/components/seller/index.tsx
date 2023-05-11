import * as React from "react";
import { Link } from "react-router-dom";

import { Wrapper, SellerContainer } from "./styled";

import { useStoreState } from "app/store";

import { MoimURL } from "common/helpers/url";
import ShavedText from "common/components/shavedText/v2";
import { getTextComponent } from "common/components/designSystem/typos";

interface IProps {
  className?: string;
  sellerId: string;
  block: Moim.Component.ProductItem.ISeller;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
  onSelect?(): void;
}

const Seller = ({
  className,
  sellerId,
  block,
  horizontalAlign,
  onSelect,
}: IProps) => {
  const seller = useStoreState(
    state => state.entities.commerce_seller[sellerId],
  );

  if (!seller) {
    return null;
  }

  const Text = getTextComponent(block.textStyle ?? "h7");
  return (
    <Wrapper className={className}>
      <Link
        to={new MoimURL.CommerceSellers({
          id: sellerId,
          section: "products",
        }).toString()}
        onClick={onSelect}
      >
        <SellerContainer horizontalAlign={horizontalAlign}>
          <Text>
            <ShavedText line={1}>{seller.name}</ShavedText>
          </Text>
        </SellerContainer>
      </Link>
    </Wrapper>
  );
};

export default React.memo(Seller);
