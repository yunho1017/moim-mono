import { normalize } from "normalizr";
import { coinEntity, coinListEntity } from "./entity";

export const coinNormalizer = (coin: Moim.Community.Coin.ICoin) =>
  normalize<Moim.Community.Coin.ICoin, Moim.Entity.INormalizedData, Moim.Id>(
    coin,
    coinEntity,
  );

export const coinListNormalizer = <
  T extends Moim.IListResponse<Moim.Community.Coin.ICoin>
>(
  data: T,
) =>
  normalize<
    Moim.Community.Coin.ICoin,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, coinListEntity);
