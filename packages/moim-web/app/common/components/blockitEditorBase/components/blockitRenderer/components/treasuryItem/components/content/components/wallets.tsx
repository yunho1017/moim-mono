import * as React from "react";
import CurrencyIcon from "common/components/currencyIcon";
import { DEFAULT_MAX_PRICE_DECIMALS_LIMIT } from "common/constants/default";
import { WalletBalanceType } from "./content";
import {
  WalletCurrencyWrapper,
  WalletStyledBodyOne,
  WalletBalanceWrapper,
  WalletStyledHeadingSeven,
  WalletStyledCaption,
  WalletsWrapper,
  WalletCurrencyIconWrapper,
  WalletWrapper,
} from "./styled";
import _ from "lodash";

interface IProps {
  wallets?: WalletBalanceType[];
  showSubBalance?: boolean;
  treasury: Moim.Treasury.ITreasury;
}

const TreasuryItemWallets: React.FC<IProps> = ({
  wallets,
  showSubBalance,
  treasury,
}) => {
  const getWallet = React.useCallback(
    (config: Moim.Treasury.IActivationConfig) =>
      _.find(
        wallets,
        wallet =>
          config.symbol === wallet.currency &&
          config.network === wallet.network,
      ),
    [],
  );

  return (
    <WalletsWrapper>
      {treasury.activationConfig?.map(config => {
        const selectedWallet = getWallet(config);
        return (
          selectedWallet && (
            <WalletWrapper>
              <WalletCurrencyWrapper>
                <WalletCurrencyIconWrapper>
                  <CurrencyIcon
                    currency={
                      selectedWallet.currency as Moim.Community.BlockchainCommunityCurrency
                    }
                    size="s"
                  />
                </WalletCurrencyIconWrapper>
                <WalletStyledBodyOne>{`${selectedWallet?.currency} - ${selectedWallet.network}`}</WalletStyledBodyOne>
              </WalletCurrencyWrapper>
              <WalletBalanceWrapper>
                <WalletStyledHeadingSeven>{`${Number(
                  selectedWallet?.balance?.toLocaleString("fullwide", {
                    useGrouping: true,
                    maximumSignificantDigits: DEFAULT_MAX_PRICE_DECIMALS_LIMIT,
                  }),
                )} ${selectedWallet.currency}`}</WalletStyledHeadingSeven>
                {showSubBalance && (
                  <WalletStyledCaption>{`${selectedWallet?.price?.toFixed(
                    2,
                  )} USD`}</WalletStyledCaption>
                )}
              </WalletBalanceWrapper>
            </WalletWrapper>
          )
        );
      })}
    </WalletsWrapper>
  );
};

export default React.memo(TreasuryItemWallets);
