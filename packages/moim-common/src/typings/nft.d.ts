/**
 * Explain about 'LIMITED_OR_CREATOR': https://vteam.slack.com/archives/C014HJKHMB2/p1591756321002500
 */

declare namespace Moim {
  namespace NFT {
    type TokenTransferEventType = "MINTED" | "TRANSFER" | "SALE" | "BURNED";

    type INftStatus = "CANDIDATE" | "IN_TRANSACTION" | "MINTED" | "FAILED";

    type INftFilterStatus = "CANDIDATE" | "MINTED" | "UNMINTABLE";

    interface ITokenTransfer {
      event: TokenTransferEventType;
      timestamp: number;
      fromAddress: string;
      toAddress: string;
    }

    interface IContractOwner {
      userId: string;
      profileId: string;
      addresses: string[];
    }

    interface INftToken {
      id: string;
      contractId: string;
      contractName: string;
      contractAddress: string;
      network: IBlockchainType;
      itemId: string;
      tokenId: number;
      ownedByAddress?: string;
      ownedBy?: {
        userId: string;
        profileId: string;
      };
      metadataUrl: string;
    }

    interface INftAttribute {
      traitType: string;
      displayType: string;
      value: string;
      rarityType: "DONUT" | "BAR" | "NORMAL";
      rarity: number;
    }

    interface INftMetaData {
      mimeType: string;
      width: number;
      height: number;
    }

    interface IResource {
      previewUrl: string;
      url: string;
      mimeType?: string;
      height?: number;
      width?: number;
      ratio?: string;
    }

    interface INftDetail {
      id: Id;
      communityId: Id;
      contractId: Id;
      scheduleId: Id;
      name: string;
      description: string;
      itemUrl: string;
      itemUrlProcessed?: string;
      itemPreviewUrl: string;
      itemStaticPreviewUrl: string;
      itemMetadata?: INftMetaData;
      attributes: INftAttribute[];
      createdAt: number;
      updatedAt: number;
      inTransactionAt: number;
      mintedAt: number;
      tokenId: number;
      status: INftStatus;
      metadataUrl: string;
      transactionHash: string;
      createdBy: IContractOwner;
      mintedBy?: IContractOwner;
      ownedBy?: IContractOwner;
      ownedByAddress: string;
      mintable: boolean;
      subItemMetadata?: IResource[];
    }

    interface INftSet {
      communityId: string;
      setId: string;
      sortKey: string;
      itemId: string;
    }

    type NftItemShowConfigTextAlignment = "CENTER" | "LEFT" | "RIGHT";

    interface INftItemShowConfig {
      textAlignment?: NftItemShowConfigTextAlignment;
      showCollectionName: boolean;
      showName: boolean;
      showOwner: boolean;
      showPrice: boolean;
      showMintButton: boolean;
      showPeriod: boolean;
    }

    type NftResourceType = "IMAGE" | "VIDEO" | "NONE";

    interface INftSummaryPropertyConfig {
      columnCount: number;
      columnCount_web: number;
    }

    interface INftSummaryShowConfig {
      showCollectionName: boolean;
      showName: boolean;
      showOwner: boolean;
      showPrice: boolean;
      showMintButton: boolean;
      showPeriod: boolean;
      showItemDescription: boolean;
      showDetail: boolean;
      showAttributes: boolean;
      propertyConfig: INftSummaryPropertyConfig;
    }

    interface INftCollectionItemShowConfig {
      showSchedules: boolean;
    }

    interface INftSetList {
      communityId: Id;
      id: Id;
      name: string;
      description: string;
      totalCount: number;
      listElement: {
        columnCount: number;
        columnCount_web: number;
      };
      listConfig: INftItemShowConfig;
      resourceType: string;
      resourceId: id;
      createdAt: number;
      updatedAt: number;
      filterable?: boolean;
    }

    type NFTScheduleViewType = "SELECTIVE" | "GENERATIVE";
    type NFTScheduleSaleType = "WHITE_LIST_ONLY" | "PUBLIC";

    interface IContractStatistics {
      itemCount: number;
      mintedItemCount: number;
      ownerCount: number;
    }

    interface ISubMediaTitle {
      locale: "EN" | "KO";
      value: string;
    }

    interface IContract {
      id: string;
      communityId: string;
      name: string;
      description: string;
      address: string;
      abi: string;
      network: IBlockchainType;
      symbol: string;
      currency: string;
      status: INftStatus;
      boostNumberAttributeTraitTypes: string[];
      boostPercentageAttributeTraitTypes: string[];
      numberAttributeTraitTypes: string[];
      dateAttributeTraitTypes: string[];
      attributeTraitTypes: string[];
      allowedUserIds: {
        userId: string;
        profileId: string;
      }[];
      royaltyUserId: {
        userId: string;
        profileId: string;
      };
      royaltyFraction: number;
      tokenIdFrom: number;
      tokenIdTo: number;
      price: number;
      maxAmountPerAddress: number;
      baseUri: string;
      mintingStartAt: number;
      mintingEndAt: number;
      mintable: boolean;
      createdAt: number;
      updatedAt: number;
      inTransactionAt: number;
      deployedAt: number;
      standard: string;
      banner?: IResource;
      representResources?: IResource[];
      createdBy?: IContractOwner;
      ownedByAddress?: string;
      itemType: NFTScheduleViewType;
      statistics?: IContractStatistics;
      subMediaTitle?: ISubMediaTitle[];
      imported?: boolean;
      totalItemCount: number;
    }

    interface ISchedule {
      id: Id;
      communityId: Id;
      contractId: Id;
      name: string;
      transactionHash: string;
      description: string;
      allowedUserIds: {
        userId: string;
        profileId: string;
      }[];
      allowedUserAddresses: string[];
      royaltyUserId: {
        userId: string;
        profileId: string;
      }[];
      royaltyFraction: number;
      royaltyUserAddress: string;
      tokenIdFrom: number;
      tokenIdTo: number;
      price: number;
      maxAmountPerAddress: number;
      mintingStartAt: number;
      mintingEndAt: number;
      createdAt: number;
      updatedAt: number;
      inTransactionAt: number;
      deployedAt: number;
      mintable: boolean;
      bannerUrl?: string;
      banner?: IResource;
      representResourceUrls?: string[];
      representResources?: IResource[];
      maxTokenId?: number;
      saleType: NFTScheduleSaleType;
      type: "AIRDROP" | "NORMAL";
      mintingStartBlockNumber: number;
      mintingEndBlockNumber: number;
      isHidden?: boolean;
    }

    type ITag = Record<Moim.Id, string[]>;

    // nftSet Redux State
    type INftSetReduxState = IPaginatedListResponse<string>;

    // GET: api/nfts/tokens?userId=${userId}
    interface IGetNftsTokenListResponseBody {
      data: INftToken[];
    }

    // POST: api/nfts/_batch
    interface IGetNftsDetailResponseBody {
      data: INftDetail[];
    }

    // POST: api/nfts/contracts/_batch
    interface IGetNftContractListResponseBody {
      data: IContract[];
    }

    // GET: api/nfts/tokens?userId=${userId}
    interface IGetUserTokenListResponseBody {
      data: INftToken[];
    }

    // GET: api/nfts/tokens/${itemId}/histories
    type IGetTokenTransferListResponseBody = IPaginatedListResponse<
      ITokenTransfer
    >;

    // GET: api/nfts/sets/${setId}/entries
    type IGetNftSetsResponseBody = IPaginatedListResponse<INftSet>;

    // GET: /api/nfts/sets/${setId}
    type IGetNftSetListResponseBody = INftSetList;

    // GET: /api/nfts/contracts/{contractId}/schedules
    // POST: api/nfts/schedules/_batch
    type IGetNftSchedulesResponseBody = IPaginatedListResponse<ISchedule>;

    // POST: /api/nfts/contracts/{contractId}/owners
    type IGetNftContractOwnersResponseBody = IPaginatedListResponse<
      IContractOwner
    >;

    // GET: /api/nfts/contracts/{contractId}/schedules
    interface getSchedulesByContract {
      data: IContractOwner[];
    }

    // GET: /api/nfts/sets/${setId}/tags
    interface IGetNFTTags {
      name: string;
      values: string[];
    }
  }
}
