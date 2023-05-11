import { schema } from "normalizr";

export const treasuryItemDefinition = {};

export const TreasuryItemEntity = new schema.Entity<Moim.Treasury.ITreasury>(
  "treasuryItems",
  treasuryItemDefinition,
);
