declare namespace Moim {
  type TreasuryNetworkType = "CAN" | "POLYGON" | "ETHEREUM";
  namespace Treasury {
    interface IUser {
      addresses: string[];
      profileId?: string;
      userId?: string;
    }

    interface IWallet {
      name: string;
      description?: string;
      address: string;
      network: string;
      currency: string;
      currencyType?: string;
    }

    interface IWalletItem {
      communityId: string;
      id: string;
      treasuryId: string;
      name: string;
      description: string;
      network: string;
      type: string;
      address: string;
      currency: string;
      currencyType: string;
      contractId: string;
      links: string[];
      createdAt: number;
      updatedAt: number;
      balance: number;
      income: number;
      outcome: number;
      balanceUpdated: number;
      ownerAddress: string[];
      ownedBy?: IUser[];
    }

    interface ITransaction {
      communityId: string;
      walletId: string;
      createdAt: number;
      network: string;
      currency?: string;
      transactionHash: string;
      historyType: "TRANSFER";
      data: {
        from: string;
        to: string;
        fromUser?: IUser;
        toUser?: IUser;
        amount: number;
        gas: number;
      };
    }

    interface IBalance {
      currency: string;
      network: string;
      balance: number;
    }

    interface IIncome {
      currency: string;
      network: string;
      income: number;
    }

    interface IOutcome {
      currency: string;
      network: string;
      outcome: number;
    }

    interface IActivationConfig {
      symbol: string;
      network: string;
      active: boolean;
    }

    interface ITreasury {
      id: string;
      name: string;
      address: string;
      description: string;
      balances: IBalance[];
      incomes: IIncome[];
      outcomes: IOutcome[];
      createdBy: IUser;
      updatedBy: IUser;
      createdAt: number;
      updatedAt: number;
      activationConfig: IActivationConfig[];
    }

    interface ITreasuryShowConfig {
      showItemDescription: boolean;
      showValue: boolean;
      showTotalIncome: boolean;
      showTotalExpense: boolean;
      showWallets: boolean;
    }

    type ExchangeRatesType = Record<string, string>;

    interface ITreasuryExchangeRates {
      currency: string; // Base Currency (default = USD)
      rates: ExchangeRatesType;
    }

    interface ITreasuryContext {
      exchangeRates: ExchangeRatesType;
      refreshCurrency(): void;
    }
  }
}
