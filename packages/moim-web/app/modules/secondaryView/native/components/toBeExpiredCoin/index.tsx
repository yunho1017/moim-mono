import * as React from "react";

import { FormattedMessage } from "react-intl";
import { DefaultLayout } from "app/modules/secondaryView/native/layout";
import ToBeDeletedCreditsComponent from "./component";

import UnsignedChecker from "common/components/unsiginedChecker";
import { PermissionDeniedFallbackType } from "app/enums";

import {
  AppBarTitleWrapper,
  AppBarStickyWrapperStyle,
  LeftButtonWrapper,
  BackIcon,
} from "./styled";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useIsMobile from "common/hooks/useIsMobile";
import { MoimURL } from "common/helpers/url";
import { useActions, useStoreState } from "app/store";
import { getCoin } from "app/actions/community/coin";

interface IProps {
  coinId: string;
}

const ToBeExpiredCoin: React.FC<IProps> = ({ coinId }) => {
  const isMobile = useIsMobile();
  const { redirect } = useNativeSecondaryView();

  const coin = useStoreState(
    state => state.entities.community_coins[coinId] ?? undefined,
  );

  const { dispatchGetCoin } = useActions({
    dispatchGetCoin: getCoin,
  });

  const handleBackButtonClick = React.useCallback(() => {
    if (coinId) {
      redirect(new MoimURL.CoinShow({ coinId }).toString());
    }
  }, [coinId, redirect]);

  const renderBackButton = React.useCallback(
    () => (
      <LeftButtonWrapper onClick={handleBackButtonClick}>
        <BackIcon />
      </LeftButtonWrapper>
    ),
    [handleBackButtonClick],
  );

  const handleGetCoinData = React.useCallback(() => {
    dispatchGetCoin(coinId);
  }, [coinId, dispatchGetCoin]);

  React.useEffect(() => {
    handleGetCoinData();
  }, []);

  return (
    <DefaultLayout
      appBar={{
        wrapperStickyStyle: AppBarStickyWrapperStyle,
        titleElement: (
          <AppBarTitleWrapper>
            <FormattedMessage
              id="candy_history_candy_to_be_expired_title"
              values={{ candy_name: coin?.name ?? "" }}
            />
          </AppBarTitleWrapper>
        ),
        titleAlignment: "Center",
        enableScrollParallax: true,
        alwaysShowAppBarTitle: true,
      }}
      renderCloseButton={isMobile ? renderBackButton : undefined}
    >
      <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
        <ToBeDeletedCreditsComponent coin={coin} />
      </UnsignedChecker>
    </DefaultLayout>
  );
};

export default React.memo(ToBeExpiredCoin);
