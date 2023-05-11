import CurrencyFormatter from "common/components/currencyFormatter";
import * as React from "react";
import { Wrapper, CoinIcon, CoinName, CoinAmount } from "./styled";

interface IProps {
  coin: Moim.Community.Coin.ICoin;
  totalAmount: number | undefined;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
const CoinItem: React.FC<IProps> = ({ coin, totalAmount, onClick }) => {
  return (
    <Wrapper
      data-coin-id={coin.id}
      role="button"
      coinColor={coin.preview?.hexCode}
      onClick={onClick}
    >
      <CoinIcon src={coin.preview?.S} />
      <CoinName>{coin.name}</CoinName>
      <CoinAmount>
        {totalAmount !== undefined ? (
          <CurrencyFormatter currency={coin.symbol ?? ""} value={totalAmount} />
        ) : null}
      </CoinAmount>
    </Wrapper>
  );
};

export default CoinItem;
