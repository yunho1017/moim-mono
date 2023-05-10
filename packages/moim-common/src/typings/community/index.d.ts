declare namespace Moim {
  declare namespace Community {
    interface ICommunity {
      id: string;
      origin: string;
      externalId: string;
      name: string;
      description: string;
      modules: CommunityModuleType[];
      logoUrl?: string;
      networks?: NetworkType;
      currency?: ICommunityCurrency[];
      issuers?: Id[];
    }

    interface ICommunityUser {
      userId: string;
      profileId: string;
      addresses: string[];
      name: string;
      bio: string;
      avatarUrl: string;
      canId?: string;
    }

    type CommunityModuleType = "MOIM" | "NFT" | "DQUEST" | "TREASURY";
    type NetworkType = "CAN" | "POLYGON" | "ETHEREUM" | "MUMBAI";

    type IBlockchainType = "POLYGON" | "ETHEREUM" | "MUMBAI";
    type BlockchainCommunityCurrency =
      | "MATIC"
      | "ETH"
      | "LINK"
      | "USDT"
      | "USDC"
      | "APE"
      | "SAND"
      | "SHIB"
      | "NEAR"
      | "AVAX"
      | "MANA";

    interface ICommunityCurrency {
      name: string;
      symbol: string;
      description: string;
      network: string;
      imageUrl: string;
      contractAddress: string;
      decimal: number;
    }

    interface INetworkBlockConfig {
      symbol: string;
      chainId: string;
      currentBlockNumber: number;
      averageBlockTime: number;
    }
  }
}
