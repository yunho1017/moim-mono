import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import { useCurrency } from "app/modules/treasury/hook/useCurrency";
import TreasuryItemContent from "./components/content";
import TreasuryItemDescription from "./components/description";
import { TreasuryItemContentWrapper } from "./styled";
import { TreasuryDivider } from "../../styled";

interface IProps {
  item: Moim.Treasury.ITreasury;
  showConfig?: Moim.Treasury.ITreasuryShowConfig;
  onRetry?: () => Promise<void>;
  onClickViewMore?: () => void;
}

export const TreasuryItemBody: React.FC<IProps> = ({
  item,
  showConfig,
  onRetry,
  onClickViewMore,
}) => {
  const isMobile = useIsMobile();
  const currencyData = useCurrency();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRetry = React.useCallback(async () => {
    currencyData.refreshCurrency();
    await onRetry?.();
  }, [currencyData, onRetry]);

  const handleClickRetry: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
      setIsRefreshing(true);
      handleRetry();
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    },
    [handleRetry],
  );

  return (
    <TreasuryItemContentWrapper
      onClick={onClickViewMore}
      role={onClickViewMore ? "button" : undefined}
    >
      <TreasuryItemDescription
        title={item.name}
        description={item.description}
        isRefreshing={isRefreshing}
        showItemDescription={showConfig?.showItemDescription ?? true}
        onRetryClick={handleClickRetry}
      />
      <TreasuryDivider />
      <TreasuryItemContent
        showConfig={showConfig}
        item={item}
        exchangeRates={currencyData.exchangeRates}
        isMobile={isMobile}
      />
    </TreasuryItemContentWrapper>
  );
};

export default React.memo(TreasuryItemBody);
