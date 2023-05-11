import { normalize } from "normalizr";
import { communityEntity } from "./entity";

export const communityNormalizer = (community: Moim.Community.ICommunity) =>
  normalize<Moim.Community.ICommunity, Moim.Entity.INormalizedData, Moim.Id>(
    community,
    communityEntity,
  );
