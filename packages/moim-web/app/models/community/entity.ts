import { schema } from "normalizr";

export const communityDefinition = {};

export const communityEntity = new schema.Entity<Moim.Community.ICommunity>(
  "community_communities",
  communityDefinition,
);
