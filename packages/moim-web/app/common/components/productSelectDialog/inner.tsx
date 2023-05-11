import * as React from "react";
import produce from "immer";
import debounce from "lodash/debounce";
import { useIntl, FormattedMessage } from "react-intl";
import { DefaultLoader as Loader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller/new";
import ProductItemRow from "./components/productItemRow";
import AppBarModalLayout from "common/components/modalLayout/appbar";
import { CloseButton } from "common/components/basicResponsiveDialog/styled";
import { InactiveSearchInput } from "common/components/searchInput";
import {
  Wrapper,
  Body,
  Head,
  InputWrapper,
  EmptyWrapper,
  SaveButton,
  headerWrapperStyle,
  CloseButtonWrapper,
} from "./styled";
import AlertDialog from "common/components/alertDialog";
import useOpenState from "common/hooks/useOpenState";

interface IProps {
  isLoading: boolean;
  initialChecked: Moim.Id[];
  regularProducts: Moim.Commerce.IProduct[];
  myPurchasedProducts: Moim.Commerce.IProduct[];
  paging: Moim.IPaging;
  maxSelectItem?: number;

  onSaveClick(selected: Moim.Id[]): void;
  onCloseClick(): void;
  onSearch(keyword: string): void;
  onLoadMore(keyword?: string): void;
}

const ProductSelectInnerComponent: React.FC<IProps> = ({
  isLoading,
  initialChecked,
  paging,
  regularProducts,
  myPurchasedProducts,
  maxSelectItem = 1,
  onSaveClick,
  onCloseClick,
  onSearch,
  onLoadMore,
}) => {
  const refSaveButtonClick = React.useRef(false);
  const intl = useIntl();
  const [targetDataSource, setTargetDataSource] = React.useState<
    "regular" | "purchased"
  >("purchased");
  const [keyword, setKeyword] = React.useState("");
  const [selected, setSelected] = React.useState<Record<Moim.Id, boolean>>(
    initialChecked.reduce<Record<Moim.Id, boolean>>((acc, id) => {
      acc[id] = true;
      return acc;
    }, {}),
  );
  const {
    isOpen: isOpenMaximumSelectAlert,
    open: handleOpenMaximumSelectAlert,
    close: handleCloseMaximumSelectAlert,
  } = useOpenState(false);

  const selectedProducts = React.useMemo(() => {
    if (keyword === "" && Boolean(myPurchasedProducts.length)) {
      setTargetDataSource("purchased");
      return myPurchasedProducts;
    }
    setTargetDataSource("regular");
    return regularProducts;
  }, [keyword, myPurchasedProducts, regularProducts]);

  const handleSelectChange = React.useCallback(
    (productId: Moim.Id, checked: boolean) => {
      setSelected(state =>
        produce(state, draft => {
          let checkedCount = Object.entries(draft).reduce<number>(
            (acc, [, status]) => {
              if (status) {
                acc += 1;
              }

              return acc;
            },
            0,
          );
          if (checked) {
            checkedCount += 1;
          } else {
            checkedCount -= 1;
          }
          if (checkedCount <= maxSelectItem) {
            draft[productId] = checked;
          } else {
            handleOpenMaximumSelectAlert();
          }
        }),
      );
    },
    [maxSelectItem],
  );

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const val = e.currentTarget.value;
      setKeyword(val);
      onSearch(val);
    },
    [onSearch],
  );

  const handleLoadMore = React.useCallback(() => {
    onLoadMore(keyword);
  }, [keyword, onLoadMore]);

  const handleSaveClick = React.useCallback(() => {
    if (!refSaveButtonClick.current) {
      refSaveButtonClick.current = true;
      onSaveClick(
        Object.entries(selected).reduce<Moim.Id[]>((acc, [id, flag]) => {
          if (flag) {
            acc.push(id);
          }
          return acc;
        }, []),
      );
      refSaveButtonClick.current = false;
    }
  }, [onSaveClick, selected]);

  const debouncedSaveClick = React.useCallback(
    debounce(() => {
      handleSaveClick();
    }, 300),
    [handleSaveClick],
  );

  const hasSelected = React.useMemo(
    () => Object.entries(selected).find(([, val]) => val),
    [selected],
  );

  return (
    <AppBarModalLayout
      title={<FormattedMessage id="product_select_dialog_title" />}
      leftElement={
        <CloseButtonWrapper>
          <CloseButton onClick={onCloseClick} />
        </CloseButtonWrapper>
      }
      actionButton={
        <SaveButton onClick={debouncedSaveClick} disabled={!hasSelected}>
          <FormattedMessage id="save_button" />
        </SaveButton>
      }
      headerWrapperStyle={headerWrapperStyle}
    >
      <Wrapper>
        <Head>
          <InputWrapper>
            <InactiveSearchInput
              value={keyword}
              placeholder={intl.formatMessage({
                id: "product_select_dialog_input_placeholder",
              })}
              onChange={handleSearchInputChange}
            />
          </InputWrapper>
        </Head>
        <Body>
          {selectedProducts.length === 0 ? (
            <EmptyWrapper>
              {intl.formatMessage({
                id: "product_select_dialog_search_results_empty",
              })}
            </EmptyWrapper>
          ) : (
            <InfiniteScroller
              loadMore={handleLoadMore}
              isLoading={targetDataSource === "purchased" ? false : isLoading}
              loader={<Loader />}
              paging={targetDataSource === "purchased" ? undefined : paging}
              itemLength={selectedProducts.length}
            >
              {selectedProducts.map(product => (
                <ProductItemRow
                  key={`product_item_row_${product.id}`}
                  isChecked={Boolean(selected[product.id])}
                  product={product}
                  onSelectChange={handleSelectChange}
                />
              ))}
            </InfiniteScroller>
          )}
        </Body>
        <AlertDialog
          open={isOpenMaximumSelectAlert}
          onClose={handleCloseMaximumSelectAlert}
          content={<FormattedMessage id="product_select_dialog_max_alert" />}
          rightButtons={[
            {
              text: <FormattedMessage id="close_button" />,
              onClick: handleCloseMaximumSelectAlert,
            },
          ]}
        />
      </Wrapper>
    </AppBarModalLayout>
  );
};

export default React.memo(ProductSelectInnerComponent);
