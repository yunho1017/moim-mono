import * as React from "react";
import { isEqual } from "lodash";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";

import { PermissionDeniedFallbackType } from "app/enums";
import InfiniteScroller from "common/components/infiniteScroller";
import Payment from "./components/payment";
import UnsignedChecker from "common/components/unsiginedChecker";
import { Spacer } from "common/components/designSystem/spacer";
import CancelPaymentDialog from "../../../paymentCancelDialog";
import ReviewCreateDialog from "../../../reviewCreateDialog";
import { Wrapper, EmptyWrapper, DateFilterBox } from "./styled";

import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCancelToken from "common/hooks/useCancelToken";
import { paymentListSelector } from "app/selectors/commerce";
import { getPayments as getPaymentsAction } from "app/actions/commerce";
import { mergeArrayUniq } from "common/helpers/mergeWithArrayConcatUniq";
import useGroupTexts from "common/hooks/useGroupTexts";
import { DefaultBoldDivider } from "common/components/divider";

const Payments: React.FC = () => {
  const { key } = useLocation();
  const cancelToken = useCancelToken();
  const [initialFetched, setInitialFetched] = React.useState(false);
  const emptyTexts = useGroupTexts("my_shopping_orders_empty_title");

  const currentGroup = useCurrentGroup();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [paymentIds, setPaymentIds] = React.useState<
    Moim.IPaginatedListResponse<Moim.Id>
  >({ data: [], paging: {} });

  const payments = useStoreState<
    Moim.IPaginatedListResponse<Moim.Commerce.IPayment> | undefined
  >(state => paymentListSelector(state, paymentIds), isEqual);

  const { dispatchGetPayments } = useActions({
    dispatchGetPayments: getPaymentsAction,
  });

  const getPayments = React.useCallback(
    async (pagingKey?: keyof Moim.IPaging) => {
      if (!currentGroup?.seller_id) {
        return;
      }

      setIsLoading(true);
      const result = await dispatchGetPayments(
        currentGroup.seller_id,
        pagingKey ? { [pagingKey]: paymentIds.paging[pagingKey] } : {},
        cancelToken.current.token,
      );
      if (result) {
        const newPaymentIds = result;
        if (pagingKey) {
          switch (pagingKey) {
            case "after":
              newPaymentIds.data =
                mergeArrayUniq<Moim.Id>(paymentIds.data, result.data) ?? [];
              break;
            case "before":
              newPaymentIds.data =
                mergeArrayUniq<Moim.Id>(result.data, paymentIds.data) ?? [];
              break;
          }
        }

        setPaymentIds(newPaymentIds);
      }
      setIsLoading(false);
    },
    [
      currentGroup,
      dispatchGetPayments,
      paymentIds.paging,
      paymentIds.data,
      cancelToken,
    ],
  );

  const inner = React.useMemo(
    () =>
      payments?.data?.map((payment, index) => (
        <>
          {index > 0 && <DefaultBoldDivider key={`spacer_${payment.id}`} />}
          <Payment key={`payment_${payment.id}`} payment={payment} />
        </>
      )),
    [payments],
  );

  React.useEffect(() => {
    getPayments().then(() => {
      setInitialFetched(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (initialFetched) {
      getPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFetched, key]);

  if (paymentIds.data.length === 0 && isLoading) {
    return (
      <Wrapper>
        <Payment key={`payment_skeleton`} />
      </Wrapper>
    );
  }
  if (paymentIds.data.length === 0) {
    return (
      <EmptyWrapper>
        <span>
          {emptyTexts ? (
            emptyTexts.singular
          ) : (
            <FormattedMessage id="my_shopping/purchase_list/empty" />
          )}
        </span>
      </EmptyWrapper>
    );
  }

  return (
    <>
      <Wrapper>
        {false && <DateFilterBox />}
        <InfiniteScroller
          itemLength={paymentIds.data.length}
          isLoading={isLoading}
          loader={
            <>
              <Spacer value={8} />
              <Payment key={`payment_skeleton`} />
            </>
          }
          loadMore={getPayments}
          paging={paymentIds.paging}
        >
          {inner}
        </InfiniteScroller>
      </Wrapper>

      <ReviewCreateDialog />
      <CancelPaymentDialog />
    </>
  );
};

export default React.memo(props => (
  <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
    <Payments {...props} />
  </UnsignedChecker>
));
