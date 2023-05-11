import * as React from "react";
import { FormattedMessage } from "react-intl";
import { MoimURL } from "common/helpers/url";
// hooks
import useOpenState from "common/hooks/useOpenState";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
// components
import { B4Regular } from "common/components/designSystem/typos";
import CoinTransferDialog from "../../../transferDialog";
import CurrencyFormatter from "common/components/currencyFormatter";
// styled
import {
  HeaderButtonWrapper,
  MoreIcon,
  PointButtonWrapper,
  SendButton,
  SendButtonWrapper,
  PointRightContainer,
  ExpirableWrapperDivider,
} from "./styled";

interface IProps {
  coin?: Moim.Community.Coin.ICoin;
  balance?: number;
}

const CoinHeaderButton: React.FC<IProps> = ({ coin, balance }) => {
  const { isOpen, open, close } = useOpenState(false);
  const { redirect } = useNativeSecondaryView();

  const handleClick = React.useCallback(() => {
    if (coin?.id) {
      redirect(new MoimURL.CoinToBeExpired({ coinId: coin.id }).toString());
    }
  }, [coin?.id, redirect]);

  return (
    <>
      <HeaderButtonWrapper hexCode={coin?.preview?.hexCode}>
        {coin?.transferrable && (
          <SendButtonWrapper>
            <SendButton hexCode={coin?.preview?.hexCode} onClick={open}>
              <FormattedMessage id="send_button" />
            </SendButton>
          </SendButtonWrapper>
        )}
        {coin?.expirable && (
          <>
            <ExpirableWrapperDivider />
            <PointButtonWrapper onClick={handleClick}>
              <B4Regular>
                <FormattedMessage
                  id="candy_history_candy_to_be_expired_total"
                  values={{ candy_name: coin?.name ?? "" }}
                />
              </B4Regular>
              <PointRightContainer>
                <B4Regular>
                  {balance !== undefined ? (
                    <CurrencyFormatter
                      currency={coin?.symbol ?? ""}
                      value={balance}
                    />
                  ) : null}
                </B4Regular>
                <MoreIcon />
              </PointRightContainer>
            </PointButtonWrapper>
          </>
        )}
      </HeaderButtonWrapper>
      {coin?.transferrable && (
        <CoinTransferDialog
          coinId={coin?.id}
          disableCoinSelectField={true}
          isOpen={isOpen}
          onClose={close}
        />
      )}
    </>
  );
};

export default React.memo(CoinHeaderButton);
