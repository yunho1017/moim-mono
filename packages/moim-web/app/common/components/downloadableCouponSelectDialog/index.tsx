import * as React from "react";
import debounce from "lodash/debounce";
import { searchDownloadCoupons as searchDownloadCouponsAction } from "app/actions/commerce";
import { useActions } from "app/store";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";

import Inner from "./inner";

const MAX_PRODUCT_FETCH_LIMIT = 20;

interface IProps {
  open: boolean;
  initialChecked?: Moim.Id[];
  onSaveClick(selected: Moim.Id[]): void;
  onCancelClick(): void;
}
const DownloadableCouponSelectDialog: React.FC<IProps> = ({
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
    Moim.IPaginatedListResponse<Moim.Commerce.ICoupons>
  >({ data: [], paging: {} });
  const hubSeller = useHubSeller();

  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();

  const { searchDownloadCoupons } = useActions({
    searchDownloadCoupons: searchDownloadCouponsAction,
  });

  const debouncedSearch = React.useCallback(
    debounce((keyword: string) => {
      if (!isLoading && hubSeller) {
        setLoading(true);
        searchDownloadCoupons(
          hubSeller.id,
          {
            query: keyword === "" ? undefined : keyword,
            limit: MAX_PRODUCT_FETCH_LIMIT,
          },
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
    [hubSeller?.id, isLoading, searchDownloadCoupons],
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
      if (!isLoading && hubSeller) {
        setLoading(true);
        searchDownloadCoupons(
          hubSeller.id,
          {
            query: keyword === "" ? undefined : keyword,
            after: result?.paging.after,
            limit: MAX_PRODUCT_FETCH_LIMIT,
          },
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
    [hubSeller?.id, isLoading, result?.paging.after, cancelTokenSource.current],
  );

  const handleCancelClick = React.useCallback(() => {
    onCancelClick();
  }, []);

  React.useEffect(() => {
    if (open && isLoading === undefined && !result.data.length) {
      setLoading(true);
      const promises: Promise<any>[] = [];

      if (hubSeller?.id) {
        promises.push(
          searchDownloadCoupons(
            hubSeller.id,
            {
              limit: MAX_PRODUCT_FETCH_LIMIT,
            },
            cancelTokenSource.current.token,
          ),
        );
      }
      Promise.all(promises)
        .then(([searchedProducts]) => {
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
        coupons={result.data}
        paging={result.paging}
        onSaveClick={onSaveClick}
        onCloseClick={handleCancelClick}
        onSearch={handleSearch}
        onLoadMore={handleLoadMore}
      />
    </FixedHeightBasicDialog>
  );
};

export default React.memo(DownloadableCouponSelectDialog);
