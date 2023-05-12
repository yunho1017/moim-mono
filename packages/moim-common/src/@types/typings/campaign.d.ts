declare namespace Moim {
  declare namespace Campaign {
    interface IReduxState {
      campaigns: IPaginatedListResponse<Moim.Id>;
    }

    type CampaignExecutionVoteStatus = "accepted" | "rejected";

    /**
     * waitingForSign : 서명대기
     * proposed : 제안완료 (투표중)
     * approved : 승인
     * denied : 거절
     */
    type CampaignExecutionStatus =
      | "waitingForSign"
      | "proposed"
      | "accepted"
      | "rejected";

    interface ICampaignPosition {
      moim: Id;
      community: Id; // can community positionId
    }

    type ExecutivePositionKey = "host" | "donor" | "executor" | "decisionMaker";

    interface ICampaignExecutivePosition {
      host?: ICampaignPosition;
      donor?: ICampaignPosition;
      executor?: ICampaignPosition;
      decisionMaker?: ICampaignPosition;
    }

    interface IToken {
      code: string;
      symbol: string;
      price: number;
      decimal: string;
    }

    interface ICampaign {
      id: Id;
      parentGroupId: Id;
      title: string;
      description: string;
      beneficiaryTarget: string;
      positions?: ICampaignExecutivePosition;
      startAt: number;
      endAt: number;
      fundingStartAt: number;
      fundingEndAt: number;
      executionStartAt: number;
      executionEndAt: number;
      deployedAt: number;

      token: IToken;

      groupAccount: string;
      communityAccount: string;
      proposalName: string;
      raisedAmount?: number;
      usedAmount?: number;
      productIds: Id[];
      executionIds: Id[];

      codes: {
        execProposal: number;
        transferFund: ISimpleExecutionRule[];
      };
    }

    interface IDenormalizedCampaignPosition extends ICampaignPosition {
      moimPosition: Position.IPosition;
    }

    interface IDenormalizedCampaignExecutivePosition {
      host?: IDenormalizedCampaignPosition;
      donor?: IDenormalizedCampaignPosition;
      executor?: IDenormalizedCampaignPosition;
      decisionMaker?: IDenormalizedCampaignPosition;
    }

    interface IDenormalizedCampaign extends ICampaign {
      positions?: IDenormalizedCampaignExecutivePosition;
      products: Commerce.IProduct[];
      executions: IDenormalizedCampaignExecution[];
    }

    // NOTE: IExecutionRule를 사용하는게 맞으나 임시로
    // https://vteam.slack.com/archives/CMVFRQPLM/p1635410704006000
    interface ISimpleExecutionRule {
      id: number;
      voteDuration: number; // seconds
      passRule: string;
    }

    interface IExecutionRule {
      code_id: number;
      vote_duration: number; // seconds
      pass_rule: string;
      approval_type: number;
      // below field are no use in web.
      right_proposer: {
        is_anyone: number;
        is_any_community_member: number;
        required_badges: number[];
        required_positions: number[];
        required_tokens: number[];
        required_exp: number;
        accounts: number[];
      };
      right_approver: {
        is_anyone: number;
        is_any_community_member: number;
        required_badges: number[];
        required_positions: number[];
        required_tokens: number[];
        required_exp: number;
        accounts: number[];
      };
      right_voter: {
        is_anyone: number;
        is_any_community_member: number;
        required_badges: number[];
        required_positions: number[];
        required_tokens: number[];
        required_exp: number;
        accounts: number[];
      };
    }

    interface ICampaignExecution {
      id: Id;
      title: string;
      campaignId: Id;
      communityAccount: string;
      creatorId: Id;
      profileId: Id;
      canAccount: string;
      proposalName: string;
      requestId: Id;
      transferCodeId: Id;
      passRule: string; // ex, 80.000000000
      voteDuration: number;
      status: CampaignExecutionStatus;
      amount: number;
      bankInformation: string;
      executedAt: number;
      voters: Id[];
      startAt: number;
      endAt: number;
      remittedAt?: number;
      vote?: IExecutionVote;
      redirectUrl: string; // 최초 제안시 서명 url
      signUrl: string; // 최초 제안시 서명 url
      acceptedCount: number;
      rejectedCount: number;
      voterPositions: ICampaignPosition[];
    }

    interface IDenormalizedCampaignExecution extends ICampaignExecution {
      thread?: Forum.IDenormalizedThread;
      creator: User.IUser;
    }

    interface IExecutionVote {
      id: Moim.Id;
      campaignExecutionId: Moim.Id;
      userId: Moim.Id;
      profileId: Moim.Id; // <- lookup this field
      canAccount: Moim.Id;
      status: CampaignExecutionVoteStatus;
      signUrl: string;
      signedAt: number;
      createdAt: number;
      updatedAt: number;
    }

    interface IDenormalizedExecutionVote extends IExecutionVote {
      execution: IDenormalizedCampaignExecution;
      user: User.IUser;
      thread?: Forum.IDenormalizedThread;
    }

    interface IWalletHistoryDatum {
      block: number;
      timestamp: string;
      contract: string;
      action: string;
      actors: string;
      notified: string;
      transaction_id: Moim.Id;
      data: {
        amount: number;
        from: string;
        to: string;
        symbol: string;
        memo: string;
        quantity: string;
      };
    }
  }
}
