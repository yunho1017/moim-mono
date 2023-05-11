import * as React from "react";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";
import { useStoreState } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { getSellerSelector } from "app/selectors/commerce";
import { DefaultLoader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller/new";
import AlertDialog from "common/components/alertDialog";
import CurrencyFormatter from "common/components/currencyFormatter";
import CreditHistory from "../creditHistoryItem";
import {
  TotalAmountDashBoard,
  TotalAmountHead,
  HeadGuideContainer,
  InfoIcon,
  Wrapper,
  EmptyWrapper,
  TotalAmountBody,
  YearMonthLabel,
  ToBeExpiredCreditDivider,
  CreditContent,
  ToBeExpiredCredit,
  RightArrowIcon,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import { MoimURL } from "common/helpers/url";

interface IProps {
  isLoading: boolean;
  totalAmount: number;
  histories: Moim.IPaginatedListResponse<Moim.Commerce.ICreditHistoryItem>;
  toBeExpiredCreditAmount?: number;
  emptyTextKey?: string;
  onLoadMore(): void;
}

const CreditHistories: React.FC<IProps> = ({
  isLoading,
  totalAmount,
  histories,
  toBeExpiredCreditAmount,
  emptyTextKey,
  onLoadMore,
}) => {
  const currentGroup = useCurrentGroup();
  const { hubSeller } = useStoreState(state => ({
    hubSeller: getSellerSelector(state, currentGroup?.seller_id ?? ""),
  }));
  const {
    isOpen: isOpenCreditPolicy,
    open: openCreditPolicy,
    close: closeCreditPolicy,
  } = useOpenState();
  const intl = useIntl();

  const groupingHistories = React.useMemo(
    () =>
      histories.data.reduce<Record<string, Moim.Commerce.ICreditHistoryItem[]>>(
        (heap, item) => {
          const yearMonthKey = moment(item.createdAt).format("YYYY. MM");
          if (heap[yearMonthKey]) {
            heap[yearMonthKey].push(item);
          } else {
            heap[yearMonthKey] = [item];
          }

          return heap;
        },
        {},
      ),
    [histories.data],
  );

  const creditItemElements = React.useMemo(
    () =>
      Object.entries(groupingHistories).map(([yearMonthKey, items], idx) => {
        return (
          <>
            <YearMonthLabel>{yearMonthKey}</YearMonthLabel>
            {items
              .sort((x, y) => y.createdAt - x.createdAt)
              .map(item => (
                <CreditHistory key={`credit_history_${item.id}`} {...item} />
              ))}
            {idx < Object.entries(groupingHistories).length - 1 && (
              <>
                <Spacer value={8} />
                <DefaultDivider />
              </>
            )}
          </>
        );
      }),
    [groupingHistories],
  );

  return (
    <>
      <Wrapper>
        <TotalAmountDashBoard>
          <TotalAmountHead>
            <HeadGuideContainer>
              <span>
                <FormattedMessage id="my_shopping/credit_history/total_credit" />
              </span>

              <InfoIcon role="button" onClick={openCreditPolicy} />
            </HeadGuideContainer>
            {/* HERE: 날짜 선택  Component*/}
          </TotalAmountHead>
          <TotalAmountBody>
            <CurrencyFormatter
              currency={hubSeller?.currency ?? "KRW"}
              value={totalAmount}
            />
          </TotalAmountBody>

          {toBeExpiredCreditAmount !== undefined && (
            <>
              <Spacer value={8} />
              <ToBeExpiredCreditDivider />
              <Spacer value={8} />

              <ToBeExpiredCredit
                to={
                  hubSeller
                    ? new MoimURL.CoinShow({ coinId: hubSeller?.id }).toString()
                    : ""
                }
              >
                <span className="left">
                  <FormattedMessage id="my_shopping_credit_history_credits_to_be_expired" />
                </span>
                <span className="right">
                  <CurrencyFormatter
                    currency={hubSeller?.currency ?? "KRW"}
                    value={toBeExpiredCreditAmount}
                  />
                  <RightArrowIcon />
                </span>
              </ToBeExpiredCredit>
            </>
          )}
        </TotalAmountDashBoard>

        {histories.data.length === 0 ? (
          <EmptyWrapper>
            <FormattedMessage
              id={emptyTextKey ?? "my_shopping/benefit/credit/empty_credit"}
            />
          </EmptyWrapper>
        ) : (
          <InfiniteScroller
            itemLength={histories.data.length}
            isLoading={isLoading}
            loader={<DefaultLoader />}
            paging={histories.paging}
            threshold={400}
            loadMore={onLoadMore}
          >
            {creditItemElements}
          </InfiniteScroller>
        )}
      </Wrapper>

      <AlertDialog
        open={isOpenCreditPolicy}
        content={<CreditContent>{hubSeller?.creditPolicy ?? ""}</CreditContent>}
        rightButtons={[
          {
            text: intl.formatMessage({ id: "ok_button" }),
            onClick: closeCreditPolicy,
          },
        ]}
        onClose={closeCreditPolicy}
      />
    </>
  );
};

export default React.memo(CreditHistories);
