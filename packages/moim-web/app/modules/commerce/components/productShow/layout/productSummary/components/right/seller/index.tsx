import React from "react";
import { Link } from "react-router-dom";

import { useStoreState } from "app/store";

import { Wrapper } from "./styled";
import { MoimURL } from "common/helpers/url";
import UserProfileImage from "common/components/userProfileImage";

interface IProps {
  block: Moim.Component.ProductShow.ISeller;
  sellerId: Moim.Id;
}
export default function Seller({ sellerId, block }: IProps) {
  const seller = useStoreState(
    state => state.entities.commerce_seller[sellerId],
  );

  if (!seller) {
    return null;
  }

  return (
    <Link
      to={new MoimURL.CommerceSellers({
        id: sellerId,
        section: "products",
      }).toString()}
    >
      <Wrapper
        hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
      >
        <UserProfileImage size="s" src={seller.imageUrl} shape="round" />
        <span className="name">{seller.name}</span>
      </Wrapper>
    </Link>
  );
}
