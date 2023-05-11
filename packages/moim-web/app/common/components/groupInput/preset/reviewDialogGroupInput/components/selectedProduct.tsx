import React from "react";
import styled from "styled-components";
import FallbackImageBase from "common/components/fallbackImage";
import { B3Regular, B4Regular } from "common/components/designSystem/typos";

import { useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useIsMobile from "common/hooks/useIsMobile";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";
import { MoimURL } from "common/helpers/url";

const Wrapper = styled.div`
  border-radius: ${px2rem(4)};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
  display: flex;
  align-items: center;
  gap: ${px2rem(8)};
  padding: ${px2rem(8)} ${px2rem(16)};
`;

const Right = styled.div`
  flex: 1;
  min-width: 0;
`;
const SellerName = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${useSingleLineStyle}
`;
const ProductName = styled(B3Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
`;

const FallbackImage = styled(FallbackImageBase)`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
`;

const Image = styled.img`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  object-fit: cover;
  border-radius: ${px2rem(6)};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
`;

const SelectedProduct: React.FC<{
  productId: string;
  productName: string;
  image?: string;
}> = ({ image, productId, productName }) => {
  const isMobile = useIsMobile();
  const redirect = useRedirect();
  const { close } = useNativeSecondaryView();
  const sellerName = useStoreState(state => {
    const sellerId = state.entities.commerce_product[productId]?.sellerId;
    return state.entities.commerce_seller[sellerId]?.name;
  });

  const redirectToProductShow = React.useCallback(() => {
    const url = new MoimURL.CommerceProductShow({ id: productId }).toString();
    if (isMobile) {
      close();
    }
    redirect(url);
  }, [close, redirect, isMobile, productId]);

  return (
    <Wrapper>
      {image ? (
        <Image role="button" src={image} onClick={redirectToProductShow} />
      ) : (
        <FallbackImage />
      )}
      <Right>
        {sellerName && (
          <SellerName role="button" onClick={redirectToProductShow}>
            {sellerName}
          </SellerName>
        )}
        <ProductName role="button" onClick={redirectToProductShow}>
          {productName}
        </ProductName>
      </Right>
    </Wrapper>
  );
};

export default React.memo(SelectedProduct);
