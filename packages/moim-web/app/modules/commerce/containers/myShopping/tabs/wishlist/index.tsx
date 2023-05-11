import * as React from "react";
import styled from "styled-components";

import { PermissionDeniedFallbackType } from "app/enums";
import InfiniteScroller from "common/components/infiniteScroller";
import UnsignedChecker from "common/components/unsiginedChecker";
import ProductList from "./components/productList";
import Skeleton from "./components/productList/skeleton";

import { getVotedProductList } from "app/actions/commerce";
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useIntlShort } from "common/hooks/useIntlShort";
import { mergeArrayUniq } from "common/helpers/mergeWithArrayConcatUniq";
import { pB2RegularStyle } from "common/components/designSystem/typos";
import useGroupTexts from "common/hooks/useGroupTexts";

const Wrapper = styled.div``;

const Empty = styled.div`
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
  min-height: 50vh;

  span {
    display: inline-block;
    align-self: center;
    color: ${props => props.theme.colorV2.colorSet.grey400};
    ${pB2RegularStyle};
  }
`;

const Wishlist: React.FC = () => {
  const intl = useIntlShort();
  const cancelToken = useCancelToken();
  const wishlistText = useGroupTexts("my_shopping_wishlist_menu_title");
  const [wishlist, setWishlist] = React.useState<
    Moim.IPaginatedListResponse<Moim.Commerce.IProduct>
  >();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const currentGroup = useCurrentGroup();

  const { dispatchGetVotedProductList } = useActions({
    dispatchGetVotedProductList: getVotedProductList,
  });

  const handleDeleteProduct = React.useCallback((productId: string) => {
    setWishlist(base =>
      base
        ? {
            ...base,
            data: base.data.filter(product => product.id !== productId),
          }
        : undefined,
    );
  }, []);
  const getWishlist = React.useCallback(
    async (pagingKey?: keyof Moim.IPaging) => {
      setIsLoading(true);
      const result = await dispatchGetVotedProductList(
        pagingKey ? { [pagingKey]: wishlist?.paging[pagingKey] } : {},
      );
      if (result) {
        setWishlist(base => {
          switch (pagingKey) {
            case "after":
              return {
                data:
                  mergeArrayUniq<Moim.Commerce.IProduct>(
                    base?.data ?? [],
                    result.data,
                  ) ?? [],
                paging: {
                  ...base?.paging,
                  [pagingKey]: result.paging[pagingKey],
                },
              };

            case "before":
              return {
                data:
                  mergeArrayUniq<Moim.Commerce.IProduct>(
                    result.data,
                    base?.data ?? [],
                  ) ?? [],
                paging: {
                  ...base?.paging,
                  [pagingKey]: result.paging[pagingKey],
                },
              };

            default:
              return result;
          }
        });
      }
      setIsLoading(false);
    },
    [currentGroup, wishlist?.paging, cancelToken],
  );

  React.useEffect(() => {
    getWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrapper>
        {wishlist !== undefined ? (
          wishlist.data.length > 0 ? (
            <InfiniteScroller
              itemLength={wishlist?.data.length}
              isLoading={isLoading}
              loadMore={getWishlist}
              paging={wishlist?.paging}
            >
              <ProductList
                products={wishlist?.data}
                onDeleteProduct={handleDeleteProduct}
              />
            </InfiniteScroller>
          ) : (
            <Empty>
              <span>
                {intl("my_shopping_activity_wishlist_empty", {
                  wishlist_title: wishlistText?.singular ?? "",
                })}
              </span>
            </Empty>
          )
        ) : (
          <Skeleton />
        )}
      </Wrapper>
    </>
  );
};

export default React.memo(props => (
  <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
    <Wishlist {...props} />
  </UnsignedChecker>
));
