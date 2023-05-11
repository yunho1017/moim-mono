import { schema } from "normalizr";

export const coinDefinition = {};

export const coinEntity = new schema.Entity<Moim.Community.Coin.ICoin>(
  "community_coins",
  coinDefinition,
);

export const coinListEntity = new schema.Object<Moim.Community.Coin.ICoin>({
  data: new schema.Array(coinEntity),
});
