import React, { createContext } from "react";

export const NFT_COLLECTION_MAX_TOTAL = 9999;

interface INFTCollectionShowContext {
  contract: Moim.NFT.IContract | undefined;
  owners: Moim.NFT.IContractOwner[] | undefined;
  items: Moim.NFT.INftDetail[] | undefined;
  availableScheduleIdsByContract: Moim.Id[] | undefined;
  selectedTabId: string | undefined;
  setSelectedTabId: (value: string) => void;
  totalOwnersCnt: number;
  totalItemsCnt: number;
  containerRef: React.RefObject<HTMLDivElement> | null;
  topWrapperRef: React.RefObject<HTMLDivElement> | null;
}

const initialValue: INFTCollectionShowContext = {
  contract: undefined,
  owners: undefined,
  items: undefined,
  availableScheduleIdsByContract: undefined,
  selectedTabId: undefined,
  setSelectedTabId: () => {},
  totalOwnersCnt: 0,
  totalItemsCnt: 0,
  containerRef: null,
  topWrapperRef: null,
};

const NFTCollectionShowContext = createContext<INFTCollectionShowContext>(
  initialValue,
);

export { NFTCollectionShowContext };
