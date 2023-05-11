import { MoimURL } from "app/common/helpers/url";
import { AppDispatch } from "app/store";
import { GROUP_ID, HUB_GROUP_ID } from "common/constants/keys";
import { isTest } from "common/helpers/envChecker";
import * as ExpiredInMemoryHelper from "common/helpers/expiredInMemoryHelper";
import * as qs from "query-string";

import AgreementAPI from "./agreement";
import ApplicationAPI from "./application";
import AuthAPI from "./auth";
import CampaignAPI from "./campaign";
import ChannelAPI from "./channel";
import CommerceAPI from "./commerce";
import { CommunityAPI } from "./community";
import { CoinAPI } from "./community/coin";
import ConversationAPI from "./conversation";
import DirectMessageAPI from "./directMessage";
import DQuestAPI from "./dquest";
import DraftAPI from "./draft";
import FileAPI from "./fileUpload";
import ForumAPI from "./forum";
import GroupAPI from "./group";
import MeAPI from "./me";
import MeetingAPI from "./meeting";
import NftAPI from "./nft";
import PermissionAPI from "./permission";
import PositionAPI from "./position";
import ReferralAPI from "./referral";
import TagAPI from "./tag";
import ThreadAPI from "./thread";
import TreasuryAPI from "./treasury";
import UserAPI from "./user";
import CryptobadgeCommunityAPI from "./cryptobadge";

export function getInMemoryCurrentGroupId() {
  if (isTest()) {
    return "testGId";
  }

  let groupId = ExpiredInMemoryHelper.get<Moim.Id>(GROUP_ID);

  if (MoimURL.ExternalMoimBlockitEditor.isSameExact(location.pathname)) {
    const queryParams = qs.parse(location.search);
    groupId = queryParams.groupId as string;
  }
  if (!groupId) throw new Error("Group Id isn't prepared.");
  return groupId;
}

export function getInMemoryCurrentHubGroupId() {
  if (isTest()) {
    return "testHubGId";
  }
  let groupId = ExpiredInMemoryHelper.get<Moim.Id>(HUB_GROUP_ID);

  if (MoimURL.ExternalMoimBlockitEditor.isSameExact(location.pathname)) {
    const queryParams = qs.parse(location.search);
    groupId = queryParams.hubGroupId as string;
  }

  if (!groupId) throw new Error("Hub Group Id isn't prepared.");
  return groupId;
}

export class MoimAPI {
  // Service API's
  public readonly group = new GroupAPI(this);
  public readonly auth = new AuthAPI(this);
  public readonly channel = new ChannelAPI(this);
  public readonly user = new UserAPI(this);
  public readonly forum = new ForumAPI(this);
  public readonly conversation = new ConversationAPI(this);
  public readonly file = new FileAPI(this);
  public readonly position = new PositionAPI(this);
  public readonly me = new MeAPI(this);
  public readonly tag = new TagAPI(this);
  public readonly directMessage = new DirectMessageAPI(this);
  public readonly permission = new PermissionAPI(this);
  public readonly agreement = new AgreementAPI(this);
  public readonly application = new ApplicationAPI(this);
  public readonly draft = new DraftAPI(this);
  public readonly meeting = new MeetingAPI(this);
  public readonly commerce = new CommerceAPI(this);
  public readonly referral = new ReferralAPI(this);
  public readonly campaign = new CampaignAPI(this);
  public readonly thread = new ThreadAPI(this);
  public readonly nft = new NftAPI(this);
  public readonly treasury = new TreasuryAPI(this);
  public readonly dquest = new DQuestAPI(this);
  public readonly community = new CommunityAPI(this);
  public readonly coin = new CoinAPI(this);
  public readonly cryptobadge = new CryptobadgeCommunityAPI(this);

  public constructor(
    public readonly dispatch?: AppDispatch,
    public readonly groupId?: string | null,
  ) {}

  public getCurrentGroupId() {
    if (this.groupId) {
      return this.groupId;
    }
    return getInMemoryCurrentGroupId();
  }

  public getCurrentHubGroupId() {
    return getInMemoryCurrentHubGroupId();
  }
}

// Default API
export default new MoimAPI();
