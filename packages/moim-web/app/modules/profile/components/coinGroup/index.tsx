import * as React from "react";

import { SectionTitle } from "../profileComponent/styledComponent";
import { H8Bold } from "common/components/designSystem/typos";
import { Wrapper } from "./styled";
import { SkeletonBox } from "common/components/skeleton";
import CoinItemList from "./components/list";

import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import {
  getCoinGroup,
  getCoinGroupBalance,
  getCoinGroupCoinList,
} from "app/actions/community/coin";

import { px2rem } from "common/helpers/rem";

interface IProps {
  id: string;
}
const CoinGroup: React.FC<IProps> = ({ id }) => {
  const cancelToken = useCancelToken();
  const [coinGroup, setCoinGroup] = React.useState<
    Moim.Community.Coin.ICoinGroup | undefined
  >();
  const [coinGroupBalance, setCoinGroupBalance] = React.useState<
    Moim.Community.Coin.ICoinGroupBalance | undefined
  >();
  const [coins, setCoins] = React.useState<
    Moim.Community.Coin.ICoin[] | undefined | null
  >();

  const {
    dispatchGetCoinGroup,
    dispatchGetCoinGroupCoinList,
    dispatchGetCoinGroupBalance,
  } = useActions({
    dispatchGetCoinGroup: getCoinGroup,
    dispatchGetCoinGroupCoinList: getCoinGroupCoinList,
    dispatchGetCoinGroupBalance: getCoinGroupBalance,
  });

  React.useEffect(() => {
    dispatchGetCoinGroup(id, cancelToken.current.token).then(result =>
      setCoinGroup(result),
    );
    dispatchGetCoinGroupCoinList(id, cancelToken.current.token).then(result =>
      setCoins(result?.data ?? null),
    );
    dispatchGetCoinGroupBalance(id, cancelToken.current.token).then(result =>
      setCoinGroupBalance(result),
    );
  }, [id]);

  return (
    <>
      <SectionTitle>
        {coinGroup?.name ? (
          <H8Bold>{coinGroup?.name}</H8Bold>
        ) : (
          <SkeletonBox width="30%" height={px2rem(21)} />
        )}
      </SectionTitle>
      <Wrapper>
        <CoinItemList coins={coins} coinGroupBalance={coinGroupBalance} />
      </Wrapper>
    </>
  );
};

export default CoinGroup;
