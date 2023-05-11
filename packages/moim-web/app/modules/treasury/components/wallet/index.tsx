import * as React from "react";
import moment from "moment";

import useIsMobile from "common/hooks/useIsMobile";
import { useCurrency } from "../../hook/useCurrency";

import TreasuryItemContent from "common/components/blockitEditorBase/components/blockitRenderer/components/treasuryItem/components/content/components/content";
import InfiniteScroller from "common/components/infiniteScroller";
import ShavedText from "common/components/shavedText";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultLoader } from "common/components/loading";

import HistoryList from "./components/historyList";

import {
  Description,
  HeaderWrapper,
  Inner,
  ItemContentWrapper,
  RetryIcon,
  Title,
  TitleWrapper,
  Wrapper,
} from "./styled";

interface IProps {
  isLoading: boolean;
  paging: Moim.IPaging;
  histories: Moim.Treasury.ITransaction[];
  treasuryItem: Moim.Treasury.ITreasury;
  onRetry: () => Promise<void>;
  onLoadMore: (pagingKey: keyof Moim.IPaging) => Promise<void>;
}

const DEFAULT_SHOW_CONFIG = {
  showItemDescription: true,
  showValue: true,
  showTotalIncome: true,
  showTotalExpense: true,
  showWallets: true,
};

const WalletComponent: React.FC<IProps> = ({
  isLoading,
  paging,
  histories,
  treasuryItem,
  onRetry,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const currencyData = useCurrency();
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const monthlyGroupingHistories = React.useMemo(() => {
    const dateGroup: Record<string, Moim.Treasury.ITransaction[]> = {};
    histories.forEach(history => {
      const dateKey = moment(history.createdAt).format("YYYY-MM");
      if (dateGroup[dateKey]) {
        dateGroup[dateKey].push(history);
      } else {
        dateGroup[dateKey] = [history];
      }
    });
    return dateGroup;
  }, [histories]);

  const handleRetry = React.useCallback(async () => {
    await onRetry?.();
  }, [onRetry]);

  const handleClickRetry: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
      setIsRefreshing(true);
      currencyData.refreshCurrency();
      handleRetry();
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    },
    [handleRetry, currencyData],
  );

  return (
    <Wrapper>
      <Inner>
        <HeaderWrapper>
          <TitleWrapper>
            <Title>{treasuryItem.name}</Title>
            <RetryIcon onClick={handleClickRetry} isRefreshing={isRefreshing} />
          </TitleWrapper>
          <Description>
            <ShavedText value={treasuryItem.description} />
          </Description>
          <Spacer value={16} />
        </HeaderWrapper>
        <ItemContentWrapper>
          <TreasuryItemContent
            showConfig={DEFAULT_SHOW_CONFIG}
            item={treasuryItem}
            exchangeRates={currencyData.exchangeRates}
            isMobile={isMobile}
          />
        </ItemContentWrapper>
        <InfiniteScroller
          isLoading={isLoading}
          paging={paging}
          itemLength={histories.length}
          loader={
            <>
              <Spacer value={24} />
              <DefaultLoader />
            </>
          }
          loadMore={onLoadMore}
        >
          {Object.entries(monthlyGroupingHistories).map(([key, items]) => (
            <HistoryList
              dateTimeLabel={key}
              items={items}
              exchangeRates={currencyData.exchangeRates}
              treasuryAddress={treasuryItem.address}
            />
          ))}
        </InfiniteScroller>
        <Spacer value={isMobile ? 24 : 120} />
      </Inner>
    </Wrapper>
  );
};

export default WalletComponent;
