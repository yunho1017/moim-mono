// vendor
import { Reducer, combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

// common components
import * as SecondaryViewReducer from "app/modules/secondaryView/reducer";
import * as ImageBrochureReducer from "common/components/imageBrochure/reducer";
import * as BlockitModalReducer from "common/components/blockitModal/reducer";
import * as PageLoadingIndicatorReducer from "common/components/pageLoadingIndicator/reducer";
import * as MoimLeaveReducer from "app/modules/personalSetting/containers/moimLeave/reducer";
import * as CreateMeetingDialogReducer from "common/components/createMeetingDialog/reducer";
import * as MyReferralPerformanceDialogReducer from "common/components/myReferralPerformanceDialog/reducer";
import * as MyReferralDialogReducer from "common/components/myReferralDialog/reducer";

// Reducers
import * as AppReducer from "./reducers/app";
import * as ConversationReducer from "./reducers/conversation";
import * as ConversationPageReducer from "./modules/conversation/reducer";
import * as GroupReducer from "app/reducers/group";
import * as EntityReducer from "./reducers/entity";
import * as ForumDataReducer from "./reducers/forum";
import * as SideNavigationReducer from "./reducers/sideNavigation";
import * as ForumEditorPageReducer from "./modules/forum/containers/forumEditor/reducer";
import * as CommentListPageReducer from "./modules/postShow/components/bottom/components/commentList/reducer";
import * as ProfilePageReducer from "./modules/profile/reducer";
import * as ProfileReducer from "./reducers/profile";
import * as MeetingReducer from "./reducers/meeting";
import * as CommerceReducer from "./reducers/commerce";
import * as CampaignDataReducer from "./reducers/campaign";
import * as SnackbarReducer from "app/reducers/snackbar";
import * as PositionReducer from "app/reducers/position";
import * as ThreadReducer from "app/reducers/thread";
import * as NftReducer from "app/reducers/nft";
import * as ChildMoimGroupReducer from "app/reducers/childMoimGroup";

import * as ProfileEditorPageReducer from "app/modules/profileEditor/reducer";
import * as ChannelReducer from "app/reducers/channel";
import * as SubGroupReducer from "app/reducers/subgroup";
import * as PermissionReducer from "app/reducers/permission";
import * as SearchReducer from "app/reducers/search";
import * as DirectMessageReducer from "app/reducers/directMessage";
import * as gRPCReducer from "app/reducers/gRPC";
import * as NotificationReducer from "app/reducers/notification";
import * as DraftReducer from "app/reducers/draft";
import * as SearchPageReducer from "app/reducers/searchPage";
import * as PostTemplateReducer from "app/reducers/postTemplate";
import * as CommercePageReducer from "app/modules/commerce/reducer";
import * as CampaignPageReducer from "app/modules/campaign/reducer";
import * as PluginReducer from "app/reducers/plugins";
import * as ContentsGroupReducer from "./reducers/contentsGroup";
import * as PromoteReducer from "./reducers/promote";
import * as DQuestReducer from "./reducers/dquest";
import * as CommunityCoinReducer from "./reducers/community/coin";
import * as CryptobadgeReducer from "./reducers/cryptobadge";

// DialogReducer
import * as ProfileDialogReducer from "./modules/profileDialog/reducer";
import * as NewDirectMessageDialogPageReducer from "app/modules/newDirectMessageDialog/reducer";
import * as PositionApplyDialogReducer from "common/components/positionApplyDialog/reducer";
import * as SNSShareDialogReducer from "common/components/snsShareDialog/reducer";
import * as ChannelNotificationSettingDialogReducer from "common/components/channelNotificationSettingDialog/reducer";
import * as JoinGroupDialogReducer from "app/common/components/joinGroupDialog/reducer";
import * as PositionFormDialogReducer from "app/reducers/positionFormDialog";
import * as GlobalReportDialogReducer from "common/components/reportDialog/base/reducer";
import * as PopupBannerReducer from "common/components/popupBanner/reducer";
import * as DQuestCompleteDialogReducer from "app/modules/dquest/containers/completeDialog/reducer";
import * as ProductOptionInventoryDialogReducer from "common/components/productItemCell/components/optionInventoryDialog/reducer";
// Hub
import * as HubPageReducer from "./hub/reducer";
import * as HubAppStore from "./reducers/hub";
import * as ForumListPageReducer from "./modules/forum/containers/forumThreadList/reducer";

export interface IGroupAppState {
  router: RouterState;
  conversation: ConversationReducer.IConversationState;
  conversationPage: ConversationPageReducer.IConversationPageData;
  app: AppReducer.IAppGlobalState;
  hub: HubAppStore.IHubAppStore;
  hubPage: HubPageReducer.IHubPageState;
  entities: Moim.Entity.INormalizedData;
  group: Moim.Group.IGroupData;
  forumData: Moim.Forum.IForumData;
  forumListPage: ForumListPageReducer.IForumListPageData;
  forumEditorPage: ForumEditorPageReducer.IForumEditorPage;
  forumCommentListPage: CommentListPageReducer.ICommentPageData;
  profileData: ProfileReducer.IProfileState;
  profilePage: ProfilePageReducer.IProfilePageState;
  imageBrochure: ImageBrochureReducer.IImageBrochureState;
  sideNavigation: SideNavigationReducer.ISideNavigationState;
  snackbar: SnackbarReducer.ISnackbarState;
  subgroupsData: Moim.SubGroup.ISubGroupData;
  position: PositionReducer.IPositionState;
  profileEditorPage: ProfileEditorPageReducer.IProfileEditorState;
  channelData: ChannelReducer.IChannelState;
  permission: Moim.Permission.IPermissionData;
  secondaryViewPage: SecondaryViewReducer.IState;
  search: SearchReducer.ISearchState;
  directMessage: DirectMessageReducer.IDirectMessageState;
  gRPC: gRPCReducer.IgRPCState;
  notification: NotificationReducer.INotificationState;
  blockitModal: BlockitModalReducer.IReduxState;
  pageLoadingIndicator: PageLoadingIndicatorReducer.IState;
  draftState: DraftReducer.IDraftState;
  searchPageData: SearchPageReducer.ISearchState;
  moimLeavePage: MoimLeaveReducer.IState;
  meeting: Moim.Meeting.IReduxState;
  postTemplate: PostTemplateReducer.IPostTemplateState;
  commerce: Moim.Commerce.IReduxState;
  commercePage: CommercePageReducer.IReduxState;
  campaignData: Moim.Campaign.IReduxState;
  campaignPage: CampaignPageReducer.IReduxState;
  plugins: PluginReducer.IReduxState;
  contentsGroup: Moim.ContentsGroup.IReduxState;
  promote: PromoteReducer.IReduxState;
  thread: ThreadReducer.IReduxState;
  nft: NftReducer.INftState;
  childMoimGroup: Moim.ChildMoimGroup.IReduxState;
  dquest: DQuestReducer.IDQuestState;
  communityCoin: CommunityCoinReducer.ICoinState;
  cryptobadge: CryptobadgeReducer.ICryptobadgeState;

  // dialog
  profileDialog: ProfileDialogReducer.IProfileDialogState;
  joinGroupDialog: Moim.Group.IJoinGroupDialogState;
  positionFormDialog: PositionFormDialogReducer.IPositionFormState;
  newDirectMessageDialog: Moim.DirectMessage.IDirectMessageDialogState;
  positionApplyDialog: PositionApplyDialogReducer.IPositionApplyState;
  SNSShareDialog: SNSShareDialogReducer.ISNSShareDialogDialogState;
  createMeetingDialog: CreateMeetingDialogReducer.IReduxState;
  channelNotificationSettingDialog: ChannelNotificationSettingDialogReducer.IChannelNotificationSettingDialogState;
  myReferralPerformanceDialog: MyReferralPerformanceDialogReducer.IMyInviteeListDialogState;
  myReferralDialog: MyReferralDialogReducer.IMyReferralDialogState;
  globalReportDialog: GlobalReportDialogReducer.IGlobalReportDialogState;
  popupBanner: PopupBannerReducer.IPopupBannerState;
  dquestCompleteDialog: DQuestCompleteDialogReducer.IDQuestCompleteDialogState;
  productOptionInventoryDialog: ProductOptionInventoryDialogReducer.IProductOptionInventoryDialogState;
}

export type IAppState = IGroupAppState;

export const initialState: IAppState = {
  router: undefined as any,
  conversation: ConversationReducer.INITIAL_STATE,
  conversationPage: ConversationPageReducer.INITIAL_STATE,
  app: AppReducer.APP_INITIAL_STATE,
  hub: HubAppStore.initialState,
  hubPage: HubPageReducer.INITIAL_STATE,
  entities: EntityReducer.INITIAL_DATA,
  group: GroupReducer.INITIAL_STATE,
  forumData: ForumDataReducer.INITIAL_STATE,
  forumListPage: ForumListPageReducer.INITIAL_STATE,
  forumEditorPage: ForumEditorPageReducer.INITIAL_STATE,
  forumCommentListPage: CommentListPageReducer.INITIAL_STATE,
  profileData: ProfileReducer.INITIAL_STATE,
  profilePage: ProfilePageReducer.INITIAL_STATE,
  imageBrochure: ImageBrochureReducer.INITIAL_STATE,
  sideNavigation: SideNavigationReducer.INITIAL_STATE,
  snackbar: SnackbarReducer.INITIAL_STATE,
  subgroupsData: SubGroupReducer.INITIAL_STATE,
  position: PositionReducer.INITIAL_STATE,
  profileEditorPage: ProfileEditorPageReducer.INITIAL_STATE,
  channelData: ChannelReducer.INITIAL_STATE,
  permission: PermissionReducer.INITIAL_STATE,
  secondaryViewPage: SecondaryViewReducer.INITIAL_STATE,
  search: SearchReducer.INITIAL_STATE,
  directMessage: DirectMessageReducer.INITIAL_STATE,
  gRPC: gRPCReducer.INITIAL_STATE,
  notification: NotificationReducer.INITIAL_STATE,
  blockitModal: BlockitModalReducer.INITIAL_STATE,
  pageLoadingIndicator: PageLoadingIndicatorReducer.INITIAL_STATE,
  draftState: DraftReducer.INITIAL_STATE,
  searchPageData: SearchPageReducer.INITIAL_STATE,
  moimLeavePage: MoimLeaveReducer.INITIAL_STATE,
  meeting: MeetingReducer.INITIAL_STATE,
  postTemplate: PostTemplateReducer.INITIAL_STATE,
  commerce: CommerceReducer.INITIAL_STATE,
  commercePage: CommercePageReducer.INITIAL_STATE,
  campaignData: CampaignDataReducer.INITIAL_STATE,
  campaignPage: CampaignPageReducer.INITIAL_STATE,
  plugins: PluginReducer.INITIAL_STATE,
  contentsGroup: ContentsGroupReducer.INITIAL_STATE,
  promote: PromoteReducer.INITIAL_STATE,
  thread: ThreadReducer.INITIAL_STATE,
  nft: NftReducer.INITIAL_STATE,
  childMoimGroup: ChildMoimGroupReducer.INITIAL_STATE,
  dquest: DQuestReducer.INITIAL_STATE,
  communityCoin: CommunityCoinReducer.INITIAL_STATE,
  cryptobadge: CryptobadgeReducer.INITIAL_STATE,

  // dialog
  profileDialog: ProfileDialogReducer.INITIAL_STATE,
  joinGroupDialog: JoinGroupDialogReducer.INITIAL_STATE,
  positionFormDialog: PositionFormDialogReducer.INITIAL_STATE,
  newDirectMessageDialog: NewDirectMessageDialogPageReducer.INITIAL_STATE,
  positionApplyDialog: PositionApplyDialogReducer.INITIAL_STATE,
  SNSShareDialog: SNSShareDialogReducer.INITIAL_STATE,
  channelNotificationSettingDialog:
    ChannelNotificationSettingDialogReducer.INITIAL_STATE,
  createMeetingDialog: CreateMeetingDialogReducer.INITIAL_STATE,
  myReferralPerformanceDialog: MyReferralPerformanceDialogReducer.INITIAL_STATE,
  myReferralDialog: MyReferralDialogReducer.INITIAL_STATE,
  globalReportDialog: GlobalReportDialogReducer.INITIAL_STATE,
  popupBanner: PopupBannerReducer.INITIAL_STATE,
  dquestCompleteDialog: DQuestCompleteDialogReducer.INITIAL_STATE,
  productOptionInventoryDialog:
    ProductOptionInventoryDialogReducer.INITIAL_STATE,
};

export function createAppReducers(history: History): Reducer<IGroupAppState> {
  return combineReducers({
    router: connectRouter(history),
    app: AppReducer.reducer,
    hub: HubAppStore.hubReducers,
    hubPage: HubPageReducer.reducer,
    conversation: ConversationReducer.reducer,
    conversationPage: ConversationPageReducer.reducer,
    entities: EntityReducer.reducer,
    group: GroupReducer.reducer,
    forumData: ForumDataReducer.reducers,
    forumListPage: ForumListPageReducer.reducer,
    forumEditorPage: ForumEditorPageReducer.reducer,
    forumCommentListPage: CommentListPageReducer.reducer,
    profileData: ProfileReducer.reducer,
    profilePage: ProfilePageReducer.reducer,
    imageBrochure: ImageBrochureReducer.reducer,
    sideNavigation: SideNavigationReducer.reducer,
    snackbar: SnackbarReducer.reducer,
    subgroupsData: SubGroupReducer.reducer,
    position: PositionReducer.reducer,
    profileEditorPage: ProfileEditorPageReducer.reducer,
    channelData: ChannelReducer.reducer,
    permission: PermissionReducer.reducer,
    secondaryViewPage: SecondaryViewReducer.reducer,
    search: SearchReducer.reducer,
    directMessage: DirectMessageReducer.reducer,
    gRPC: gRPCReducer.reducer,
    notification: NotificationReducer.reducer,
    blockitModal: BlockitModalReducer.reducer,
    pageLoadingIndicator: PageLoadingIndicatorReducer.reducer,
    draftState: DraftReducer.reducer,
    searchPageData: SearchPageReducer.reducer,
    moimLeavePage: MoimLeaveReducer.reducer,
    meeting: MeetingReducer.reducer,
    postTemplate: PostTemplateReducer.reducer,
    commerce: CommerceReducer.reducer,
    commercePage: CommercePageReducer.reducer,
    campaignData: CampaignDataReducer.reducer,
    campaignPage: CampaignPageReducer.reducer,
    plugins: PluginReducer.reducer,
    contentsGroup: ContentsGroupReducer.reducer,
    promote: PromoteReducer.reducer,
    thread: ThreadReducer.reducers,
    nft: NftReducer.reducer,
    childMoimGroup: ChildMoimGroupReducer.reducer,
    dquest: DQuestReducer.reducer,
    communityCoin: CommunityCoinReducer.reducer,
    cryptobadge: CryptobadgeReducer.reducer,

    // dialog
    profileDialog: ProfileDialogReducer.reducer,
    joinGroupDialog: JoinGroupDialogReducer.reducer,
    positionFormDialog: PositionFormDialogReducer.reducer,
    newDirectMessageDialog: NewDirectMessageDialogPageReducer.reducer,
    positionApplyDialog: PositionApplyDialogReducer.reducer,
    SNSShareDialog: SNSShareDialogReducer.reducer,
    channelNotificationSettingDialog:
      ChannelNotificationSettingDialogReducer.reducer,
    createMeetingDialog: CreateMeetingDialogReducer.reducer,
    myReferralPerformanceDialog: MyReferralPerformanceDialogReducer.reducer,
    myReferralDialog: MyReferralDialogReducer.reducer,
    globalReportDialog: GlobalReportDialogReducer.reducer,
    popupBanner: PopupBannerReducer.reducer,
    dquestCompleteDialog: DQuestCompleteDialogReducer.reducer,
    productOptionInventoryDialog: ProductOptionInventoryDialogReducer.reducer,
  });
}
