import * as React from "react";

import { SectionTitle } from "app/modules/profile/components/profileComponent/styledComponent";
import { H8Bold } from "common/components/designSystem/typos";
import { Wrapper } from "app/modules/profile/components/coinGroup/styled";
import { SkeletonBox } from "common/components/skeleton";
import CoinItemList from "./components/list";

import { px2rem } from "common/helpers/rem";

import {
  getCoinGroupsOfCommunity,
  getCoinsOfCoinGroup,
  getCoinGroupBalance,
} from "app/externalPreview/api/coin";

interface IProps {
  communityId: string;
}
const CoinGroup: React.FC<IProps> = ({ communityId }) => {
  const [coinGroup, setCoinGroup] = React.useState<
    Moim.Community.Coin.ICoinGroup | undefined
  >();
  const [coinGroupBalance, setCoinGroupBalance] = React.useState<
    Moim.Community.Coin.ICoinGroupBalance | undefined
  >();
  const [coins, setCoins] = React.useState<
    Moim.Community.Coin.ICoin[] | undefined | null
  >();

  const handleGetData = React.useCallback(() => {
    getCoinGroupsOfCommunity().then(result => {
      if (result && result?.data?.[0]) {
        setCoinGroup(result.data[0]);
        getCoinsOfCoinGroup(result.data[0].id).then(coinsResult => {
          setCoins(
            coinsResult?.data?.filter(item => Boolean(item.contractAddress)),
          );
        });
        getCoinGroupBalance(result.data[0].id).then(balancesResult => {
          setCoinGroupBalance(balancesResult);
        });
      }
    });
  }, []);

  React.useEffect(() => {
    handleGetData();
  }, [communityId]);

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
        <CoinItemList
          coins={coins}
          coinGroupBalance={coinGroupBalance}
          communityId={communityId}
        />
      </Wrapper>
    </>
  );
};

export default CoinGroup;
