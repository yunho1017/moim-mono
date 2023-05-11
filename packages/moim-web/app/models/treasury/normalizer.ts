import { normalize } from "normalizr";
import { TreasuryItemEntity } from "./entity";

export const TreasuryItemNormalizer = (treasuryItem: Moim.Treasury.ITreasury) =>
  normalize<Moim.Treasury.ITreasury, Moim.Entity.INormalizedData, Moim.Id>(
    treasuryItem,
    TreasuryItemEntity,
  );
