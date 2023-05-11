/* eslint-disable no-shadow */
declare namespace Moim {
  declare namespace Community {
    declare namespace Coin {
      interface ICurrencyExchangeConfig {
        currency: ICommunityCurrency;
        ratio: number;
        visualRatio: string;
        showTotalValue?: boolean;
      }
      interface ICoin {
        id: string;
        name: string;
        communityId: Moim.Id;
        symbol: string;
        currencyExchangeConfigs?: ICurrencyExchangeConfig[];
        defaultExpireDuration?: number;
        communityId: string;
        symbol?: string;
        network?: string;
        imageUrl: string;
        preview?: {
          XL?: string;
          L?: string;
          M?: string;
          S?: string;
          XS?: string;
          hexCode?: string;
          fogType?: Enums.ThemeColorScaleType;
        };
        contractAddress?: string;
        decimal?: number;
        expirable?: boolean;
        transferrable?: boolean;
        createdAt: number;
        updatedAt: number;
        policyTitle?: string;
        policy?: string;
      }

      export interface ICoinHistory {
        id: string;
        amount: number;
        currency: string;
        sellerId: string;
        coinId: string;
        granterId: string;
        scopedUserId: string;
        customTitle: string;
        description?: string;
        sourceType: CoinHistorySourceType;
        sourceId: string;
        event: CoinHistoryEventType;
        createdAt: number;
        amount: number;
        expirePeriod?: number;
        expireAt?: number;
        granter?: string;
        transactionHash?: string;
        to?: ICoinHistoryUser;
        from?: ICoinHistoryUser;
        senderMessage?: string;
      }

      export interface ICoinHistoryUser {
        type: "USER" | "SYSTEM";
        profileId: string;
        userId: string;
      }

      export interface ICoinBalance {
        balance: number;
      }

      export enum CoinHistoryEventType {
        Received = "received", // === granted
        Used = "used",
        Transferred = "transferred",
        Expired = "expired",
        // TBD case
        Returned = "returned",
        GotTheChange = "gotTheChange",
      }

      export enum CoinHistorySourceType {
        // event === received
        SignUp = "signUp",
        PurchaseItem = "purchaseItem",
        ProductReview = "productReview",
        ReferralSignUp = "referralReward-signUp",
        Admin = "admin",
        DQuest = "dquest",
        // event === used
        Payment = "payment",
        // event === returned
        Refund = "refund",
      }

      export interface ICoinGroup {
        id: string;
        name: string;
        communityId: string;
        userId: string;
        scope: { ids: string[] };
        condition: {
          filters: [
            {
              id: string[];
            },
          ];
          sort: [
            {
              key: string;
              order: string;
            },
          ];
        };
        createdAt: number;
        updatedAt: number;
      }

      interface ICoinGroupBalance {
        [key: string]: {
          balance: number;
          error?: any;
        };
      }

      interface IToBeExpiredCoinItem {
        id: string;
        coinId: string;
        amount: number;
        createdAt: number;
        expireAt: number;
        updatedAt: number;
        event: CoinHistoryEventType;
      }
      interface ICoinTransferUser {
        type?: "USER" | "SYSTEM";
        userId: string;
        address?: string;
      }
      // GET: api/coins/community/{communityId}
      type IGetCommunityCoins = IPaginatedListResponse<ICoin>;
      // GET: api/coins/{coinId}/histories
      interface IGetCommunityCoinHistories
        extends IPaginatedListResponse<ICoinHistory> {
        totalAmount: number;
      }
      // GET: api/coins/coinId/transactions/expire?before=${before}
      type IGetToBeExpiredCoins = IPaginatedListResponse<IToBeExpiredCoinItem>;
      // POST: api/coins/${coinId}/transfer
      interface IPostTransferCommunityCoin {
        location: string;
      }
    }
  }
}
