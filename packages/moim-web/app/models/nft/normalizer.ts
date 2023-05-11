import { normalize } from "normalizr";
import {
  nftItemEntity,
  nftContractEntity,
  nftItemListEntity,
  nftContractListEntity,
  nftScheduleEntity,
  nftScheduleListEntity,
} from "./entity";

export const nftItemNormalizer = (nftItem: Moim.NFT.INftDetail) =>
  normalize<Moim.NFT.INftDetail, Moim.Entity.INormalizedData, Moim.Id>(
    nftItem,
    nftItemEntity,
  );

export const nftScheduleNormalizer = (nftSchedule: Moim.NFT.ISchedule) =>
  normalize<Moim.NFT.ISchedule, Moim.Entity.INormalizedData, Moim.Id>(
    nftSchedule,
    nftScheduleEntity,
  );

export const nftContractNormalizer = (nftContract: Moim.NFT.IContract) =>
  normalize<Moim.NFT.IContract, Moim.Entity.INormalizedData, Moim.Id>(
    nftContract,
    nftContractEntity,
  );

export const nftItemListNormalizer = <
  T extends Moim.IListResponse<Moim.NFT.INftDetail>
>(
  data: T,
) =>
  normalize<
    Moim.NFT.INftDetail,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, nftItemListEntity);

export const nftContractListNormalizer = <
  T extends Moim.IListResponse<Moim.NFT.IContract>
>(
  data: T,
) =>
  normalize<
    Moim.NFT.IContract,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, nftContractListEntity);

export const nftScheduleListNormalizer = <
  T extends Moim.IListResponse<Moim.NFT.ISchedule>
>(
  data: T,
) =>
  normalize<
    Moim.NFT.ISchedule,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, nftScheduleListEntity);
