import { schema } from "normalizr";
import { userEntity } from "../user";

export const nftContractDefinition = { creator: userEntity };

export const nftContractEntity = new schema.Entity<Moim.NFT.IContract>(
  "nftContracts",
  nftContractDefinition,
  {
    processStrategy(value) {
      return {
        ...value,
        creator: value.createdBy?.userId,
      };
    },
  },
);

export const nftScheduleDefinition = {
  contractId: nftContractEntity,
};

export const nftScheduleEntity = new schema.Entity<Moim.NFT.ISchedule>(
  "nftSchedules",
  nftScheduleDefinition,
);

export const nftItemDefinition = {
  contractId: nftContractEntity,
  scheduleId: nftScheduleEntity,
};

export const nftItemEntity = new schema.Entity<Moim.NFT.INftDetail>(
  "nftItems",
  nftItemDefinition,
);

export const nftItemListEntity = new schema.Object<Moim.NFT.INftDetail>({
  data: new schema.Array(nftItemEntity),
});

export const nftContractListEntity = new schema.Object<Moim.NFT.IContract>({
  data: new schema.Array(nftContractEntity),
});

export const nftScheduleListEntity = new schema.Object<Moim.NFT.ISchedule>({
  data: new schema.Array(nftScheduleEntity),
});
