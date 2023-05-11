// Actions
import { RouterAction } from "connected-react-router";
import { HubAppActions } from "./hub";
import { Actions as GroupActions } from "./group";
import { Actions as UserActions } from "./user";
import { Actions as EntityActions } from "./entity";
import { Actions as ForumActions } from "./forum";
import { Actions as ConversationActions } from "./conversation";
import { Actions as ProfileActions } from "./profile";
import { Actions as SideNavigationActions } from "./sideNavigation";
import { Actions as SnackbarActions } from "./snackbar";
import { Actions as ChannelFormDialogActions } from "./channelFormDialog";
import { Actions as PositionActions } from "./position";
import { Actions as AppActions } from "./app";
import { Actions as PositionFormActions } from "./positionFormDialog";
import { Actions as MeActions } from "./me";
import { Actions as ChannelActions } from "./channel";
import { Actions as TagActions } from "./tag";
import { Actions as PermissionActions } from "./permission";
import { Actions as AgreementActions } from "./agreement";
import { Actions as CryptobadgeActions } from "./cryptobadge";
import { Actions as DirectMessageActions } from "./directMessage";
import { Actions as GRPCActions } from "./gRPC";
import { Actions as TagSetActions } from "./tagset";
import { Actions as NotificationActions } from "./notification";
import { Actions as ReferenceBlockActions } from "./referenceBlock";
import { Actions as DraftActions } from "./draft";
import { Actions as PositionApplyActions } from "common/components/positionApplyDialog/action";
import { Actions as SNSShareDialogActions } from "common/components/snsShareDialog/actions";
import { Actions as ChannelNotificationSettingDialogActions } from "common/components/channelNotificationSettingDialog/action";
import { Actions as MeetingActions } from "./meeting";
import { Actions as BookmarkActions } from "./bookmark";
import { Actions as PostTemplateActions } from "./postTemplate";
import { Actions as CommerceActions } from "./commerce";
import { Actions as CampaignActions } from "./campaign";
import { Actions as ContentsGroupActions } from "./contentsGroup";
import { Actions as PromoteActions } from "./promote";
import { Actions as AuthActions } from "common/helpers/authentication/actions";
import { Actions as NftActions } from "./nft";
import { Actions as ChildMoimGroupActions } from "./childMoimGroup";
import { Actions as DQuestActions } from "./dquest";
import { Actions as CommunityCoinActions } from "./community/coin";
// DialogActions
import { Actions as GlobalReportDialog } from "common/components/reportDialog/base/actions";
import { Actions as DQuestCompleteDialogActions } from "app/modules/dquest/containers/completeDialog/actions";
import { Actions as ProductOptionInventoryDialogActions } from "common/components/productItemCell/components/optionInventoryDialog/actions";
// Page actions
import { Actions as CommentPageActions } from "app/modules/postShow/components/bottom/components/commentList/action";
import { Actions as SecondaryViewActions } from "./secondaryView";

// Common components
import { Actions as FileUploadActions } from "./fileUpload";
import { Actions as ImageBrochureActions } from "common/components/imageBrochure/actions";
import { Actions as PageLoadingIndicatorActions } from "common/components/pageLoadingIndicator/action";
import { Actions as CreateMeetingDialogActions } from "common/components/createMeetingDialog/action";
import { Actions as MyInviteeListDialogActions } from "common/components/myReferralPerformanceDialog/actions";
import { Actions as MyReferralDialogActions } from "common/components/myReferralDialog/actions";
import { Actions as PopupBannerActions } from "common/components/popupBanner/actions";

export type MoimActions =
  | RouterAction
  | AppActions
  | GroupActions
  | UserActions
  | HubAppActions
  | EntityActions
  | ConversationActions
  | ForumActions
  | ProfileActions
  | ImageBrochureActions
  | SideNavigationActions
  | FileUploadActions
  | SnackbarActions
  | ChannelFormDialogActions
  | PositionActions
  | CommentPageActions
  | PositionFormActions
  | MeActions
  | ChannelActions
  | TagActions
  | PermissionActions
  | AgreementActions
  | CryptobadgeActions
  | SecondaryViewActions
  | DirectMessageActions
  | GRPCActions
  | TagSetActions
  | NotificationActions
  | ReferenceBlockActions
  | PageLoadingIndicatorActions
  | DraftActions
  | PositionApplyActions
  | SNSShareDialogActions
  | ChannelNotificationSettingDialogActions
  | MeetingActions
  | CreateMeetingDialogActions
  | BookmarkActions
  | PostTemplateActions
  | CommerceActions
  | MyInviteeListDialogActions
  | MyReferralDialogActions
  | CampaignActions
  | GlobalReportDialog
  | ContentsGroupActions
  | PromoteActions
  | AuthActions
  | NftActions
  | ChildMoimGroupActions
  | DQuestActions
  | PopupBannerActions
  | DQuestCompleteDialogActions
  | CommunityCoinActions
  | ProductOptionInventoryDialogActions;

export type AllActions = MoimActions;
