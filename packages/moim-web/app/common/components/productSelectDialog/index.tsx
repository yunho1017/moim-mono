import * as React from "react";
import debounce from "lodash/debounce";
import {
  simpleSearchSellerProducts,
  getPurchasedProductList,
} from "app/actions/commerce";
import { useActions, useStoreState } from "app/store";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { getProductsSelector } from "app/selectors/commerce";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";

import Inner from "./inner";

const MAX_PRODUCT_FETCH_LIMIT = 20;

interface IProps {
  open: boolean;
  initialChecked?: Moim.Id[];
  onSaveClick(selected: Moim.Id[]): void;
  onCancelClick(): void;
}

const ProductSelectDialog: React.FC<IProps> = ({
  open,
  initialChecked = [],
  onSaveClick,
  onCancelClick,
}) => {
  const refKeyword = React.useRef<string | undefined>("");
  const [isLoading, setLoading] = React.useState<boolean | undefined>(
    undefined,
  );
  const [result, setResult] = React.useState<
    Moim.IPaginatedListResponse<Moim.Id> | undefined
  >(undefined);
  const hubSeller = useHubSeller();

  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();

  const regularProducts = useStoreState(
    state => getProductsSelector(state, result?.data ?? []).data,
  );
  const myPurchasedProducts = useStoreState(
    state =>
      getProductsSelector(state, state.commerce.purchasedProducts.data).data,
  );

  const { searchProduct, getMyPurchasedProducts } = useActions({
    searchProduct: simpleSearchSellerProducts,
    getMyPurchasedProducts: getPurchasedProductList,
  });

  const debouncedSearch = React.useCallback(
    debounce((keyword: string) => {
      if (!isLoading && hubSeller && Boolean(keyword)) {
        setLoading(true);
        searchProduct(
          hubSeller.id,
          {
            query: keyword,
            limit: MAX_PRODUCT_FETCH_LIMIT,
          },
          true,
          cancelTokenSource.current.token,
        )
          .then(response => {
            setResult(response);
          })
          .finally(() => {
            setLoading(false);
          });
        refKeyword.current = keyword;
      }
    }, 300),
    [hubSeller?.id, isLoading, searchProduct],
  );

  const handleSearch = React.useCallback(
    (keyword: string) => {
      handleCancel();
      debouncedSearch(keyword);
    },
    [debouncedSearch, handleCancel],
  );

  const handleLoadMore = React.useCallback(
    (keyword?: string) => {
      if (!isLoading && hubSeller && Boolean(keyword)) {
        setLoading(true);
        searchProduct(
          hubSeller.id,
          {
            query: keyword,
            after: result?.paging.after,
            limit: MAX_PRODUCT_FETCH_LIMIT,
          },
          true,
          cancelTokenSource.current.token,
        )
          .then(response => {
            setResult(state => ({
              data: state ? state.data.concat(response.data) : response.data,
              paging: response.paging,
            }));
          })
          .finally(() => {
            setLoading(false);
          });
        refKeyword.current = keyword;
      }
    },
    [
      hubSeller?.id,
      isLoading,
      result?.paging.after,
      searchProduct,
      cancelTokenSource.current,
    ],
  );

  const handleCancelClick = React.useCallback(() => {
    onCancelClick();
  }, []);

  React.useEffect(() => {
    if (
      open &&
      isLoading === undefined &&
      !result &&
      !myPurchasedProducts.length
    ) {
      setLoading(true);
      const promises: Promise<any>[] = [
        getMyPurchasedProducts(cancelTokenSource.current.token),
      ];

      if (hubSeller?.id) {
        promises.push(
          searchProduct(
            hubSeller.id,
            {
              limit: MAX_PRODUCT_FETCH_LIMIT,
            },
            true,
            cancelTokenSource.current.token,
          ),
        );
      }
      Promise.all(promises)
        .then(([, searchedProducts]) => {
          if (searchedProducts) {
            setResult(searchedProducts);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open]);

  React.useEffect(
    () => () => {
      handleCancel();
    },
    [],
  );

  return (
    <FixedHeightBasicDialog open={open} onClose={handleCancelClick}>
      <Inner
        isLoading={Boolean(isLoading)}
        initialChecked={initialChecked}
        regularProducts={regularProducts}
        myPurchasedProducts={myPurchasedProducts}
        paging={result?.paging ?? {}}
        onSaveClick={onSaveClick}
        onCloseClick={handleCancelClick}
        onSearch={handleSearch}
        onLoadMore={handleLoadMore}
      />
    </FixedHeightBasicDialog>
  );
};

export default React.memo(ProductSelectDialog);
