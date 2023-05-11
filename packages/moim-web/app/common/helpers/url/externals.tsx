import createURLDefinition from "./createDefinition";

export const EXUserShow = createURLDefinition<{
  communityId: string;
  userId: string;
}>("/:communityId/user/:userId");
export const EXUserNFTList = createURLDefinition<{
  communityId: string;
  userId: string;
}>("/:communityId/user/:userId/nfts");
export const EXNFTUserMinting = createURLDefinition<{
  communityId: string;
  userId: string;
}>("/:communityId/user/:userId/minting");
export const EXNFTShow = createURLDefinition<{
  communityId: string;
  id: string;
}>("/:communityId/nft/:id");
export const EXCoinShow = createURLDefinition<{
  communityId: string;
  coinId: string;
}>("/:communityId/coins/:coinId");
