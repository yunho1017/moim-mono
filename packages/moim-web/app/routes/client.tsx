import * as React from "react";
import { RouteComponentProps, RouteProps, Redirect } from "react-router-dom";
// URL Definition
import createURLDefinition from "common/helpers/url/createDefinition";
// Components
import { VingleLoadable } from "app/routes/loadable";
import Layout, { NoGNBLayout } from "app/modules/layout";
import MeProfileRedirector from "app/modules/redirectToSecondaryView/meProfile";
import ShareProfileRedirector from "app/modules/redirectToSecondaryView/shareProfile";
import SharePositionMembersRedirector from "app/modules/redirectToSecondaryView/sharePositionMembers";
import ShareCommunityCoinsRedirector from "app/modules/redirectToSecondaryView/shareCommunityCoins";
import ShareCommunityCoinsToBeExpiredRedirector from "app/modules/redirectToSecondaryView/shareCommunityCoinToBeExpired";
import CommerceCartsRedirector from "app/modules/redirectToSecondaryView/commerceCart";
import CommerceMyShoppingRedirector from "app/modules/redirectToSecondaryView/commerceMyShopping";
import MyQuestsRedirector from "app/modules/redirectToSecondaryView/myQuest";
import { DQuestShowModalRedirect } from "app/modules/dquest/containers/show/modal";
import Channel from "app/modules/channel";
import Home from "app/modules/home";

// helpers
import { MoimURL } from "common/helpers/url";

const ExternalCommunity = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/externalPreview"),
);

const NotFound = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/common/components/feedBack/components/notFound"),
);

const ServerMaintenance = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/common/components/feedBack/components/serverMaintenance"),
);

const ConnectionError = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/common/components/feedBack/components/connectionError"),
);

const NoRight = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/common/components/feedBack/components/noRight"),
);

const MoimLogin = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/login"),
);

const About = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/termsAndPolicy"),
);

const Hub = VingleLoadable(/* #__LOADABLE__ */ async () => import("app/hub"));

const Setting = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/settingMoim"),
);
const PersonalSetting = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/personalSetting"),
);

const Cover = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/cover"),
);

const QuickJoin = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/quickJoin"),
);

const Search = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/search"),
);

const PluginRedirectDetector = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("common/components/pluginRedirectDetector"),
);

const MeetingHome = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/meeting"),
);

const CommerceMain = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/commerce"),
);
const CampaignMain = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/campaign"),
);

const TestBed = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/testBed"),
);

const PostTemplate = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/postTemplate"),
);

const ExternalMoimBlockitEditor = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/modules/externalMoimBlockitEditor"),
);

const Plugins = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/plugins"),
);

const ContentsGroupThreads = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/contentsGroup"),
);
const NftShow = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/nftShow"),
);
const NftSetShow = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/nftSet"),
);
const NftScheduleShow = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/nftSchedule"),
);
const NftCollectionShow = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/nftCollection"),
);

const TreasuryShow = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/treasury"),
);

const ChildMoimGroupThreads = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/childMoimGroup"),
);

const BlockitEditor = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/blockitEditor/container"),
);

const QuestList = VingleLoadable(
  /* #__LOADABLE__ */ async () => import("app/modules/dquest/containers/list"),
);
const QuestGroupList = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/modules/dquest/containers/questGroup"),
);

const CryptobadgeShow = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/modules/cryptobadge/cryptobadgeShow"),
);

const CertificateShow = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/modules/cryptobadge/certificate/certificateShow"),
);

const CertificateMetadataShow = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/modules/cryptobadge/certificate/certificateMetadataShow"),
);

const CryptobadgeGroupShow = VingleLoadable(
  /* #__LOADABLE__ */ async () =>
    import("app/modules/cryptobadge/cryptobadgeGroupShow"),
);

export interface IRouteConfig extends RouteProps {
  component?: React.ComponentType<IRouteComponentProps>;
  def?:
    | ReturnType<typeof createURLDefinition>
    | ReturnType<typeof createURLDefinition>[];
  exact?: boolean;
  strict?: boolean;
  routes?: IRouteConfig[];
}

export interface IRouteComponentProps
  extends RouteComponentProps<Moim.IMatchParams> {
  routes?: IRouteConfig[];
}

// 어느 url에서나 접근 가능한 route
export const commonRoutes: IRouteConfig[] = [
  {
    def: MoimURL.ExternalMoimBlockitEditor,
    exact: true,
    component: ExternalMoimBlockitEditor,
  },
  {
    def: [MoimURL.About, MoimURL.AboutPolicy, MoimURL.AboutTerms],
    component: () => <About />,
  },

  {
    def: MoimURL.NotFound,
    component: () => <NotFound />,
  },

  {
    def: MoimURL.ServerMaintenance,
    component: () => <ServerMaintenance />,
  },

  {
    def: MoimURL.ConnectionError,
    component: () => <ConnectionError />,
  },
  {
    def: MoimURL.MeetingHome,
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <MeetingHome {...routeProps} />
    ),
  },
  {
    def: MoimURL.NoRight,
    component: () => <NoRight />,
  },
  {
    component: () => <Redirect to={MoimURL.NotFound.pattern} />,
  },
];

// 허브 url(서브 도메인이 없는 url)에서 접근 가능한 route
export const hubRoutes: IRouteConfig[] = [
  // NOTE: 시어스랩 관련 external Moim ( custom 주소 쓸 일이 없음 )
  {
    def: [
      MoimURL.ExternalCommunity,
      MoimURL.EXUserShow,
      MoimURL.EXUserNFTList,
      MoimURL.EXNFTShow,
      MoimURL.EXCoinShow,
    ],
    // 제일 큰 라우트에서 원래는 모든 route의 경우의수를 배열로 정의해두어야함
    component: (routeProps: IRouteComponentProps) => (
      <ExternalCommunity {...routeProps} />
    ),
  },
  {
    def: MoimURL.HubHome,
    component: () => <Hub />,
  },
  // moim app home은 맨 밑에 위치해야됨
  {
    def: MoimURL.MoimAppHome,
    component: () => <Redirect to={MoimURL.HubHome.pattern} />,
    exact: true,
  },
];

// 모임 url(서브 도메인이 있는 url)에서 접근 가능한 route
export const moimRoutes: IRouteConfig[] = [
  {
    def: MoimURL.BlockitEditor,
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <NoGNBLayout>
        <BlockitEditor {...routeProps} />
      </NoGNBLayout>
    ),
  },
  {
    def: [
      MoimURL.SettingMoim,
      MoimURL.SettingSectionMoim,
      MoimURL.SettingMoimOverview,
      MoimURL.SettingMoimChannels,
      MoimURL.CreateCategory,
      MoimURL.CreateChannel,
      MoimURL.SettingMoimCategory,
      MoimURL.SettingMoimCategoryAndChannel,
      MoimURL.SettingMoimPosition,
      MoimURL.SettingMoimPositionShow,
      MoimURL.SettingMoimPositionEdit,
    ],
    component: (routeProps: IRouteComponentProps) => (
      <Setting {...routeProps} />
    ),
  },
  {
    def: [MoimURL.PersonalSettingMoim],
    component: (routeProps: IRouteComponentProps) => (
      <PersonalSetting {...routeProps} />
    ),
  },
  {
    def: MoimURL.QuickJoinMoim,
    component: (routeProps: IRouteComponentProps) => (
      <QuickJoin {...routeProps} />
    ),
    exact: true,
  },

  // WITH LAYOUT
  {
    def: MoimURL.CoverPage,
    component: () => <Cover />,
  },

  {
    def: MoimURL.ContentsGroupThreads,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <ContentsGroupThreads {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.ChildMoimGroupMoims,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <ChildMoimGroupThreads {...routeProps} />
      </Layout>
    ),
  },
  {
    def: [
      MoimURL.MyQuestList,
      MoimURL.MyQuestListInActive,
      MoimURL.MyQuestListAchieved,
    ],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <MyQuestsRedirector {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.QuestGroupQuests,
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <QuestGroupList {...routeProps} />
      </Layout>
    ),
  },

  {
    def: MoimURL.QuestShow,
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <DQuestShowModalRedirect {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.QuestList,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <QuestList {...routeProps} />
      </Layout>
    ),
  },
  {
    def: [
      MoimURL.CreateForumThread,
      MoimURL.EditForumThread,
      MoimURL.FocusedShowForumThread,
      MoimURL.ShowForumThread,
      MoimURL.Forum,
      MoimURL.ConversationShow,
      MoimURL.ViewShow,
      MoimURL.DirectMessageShow,
      MoimURL.SubMoimList,
    ],
    component: () => (
      <Layout>
        <Channel />
      </Layout>
    ),
  },

  {
    def: [MoimURL.PluginShow, MoimURL.Plugins],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <Plugins {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [
      MoimURL.CommercePaymentsShow,
      MoimURL.CommercePaymentsList,
      MoimURL.CommerceMyBenefitCoupons,
      MoimURL.CommerceMyBenefitCouponsFocus,
      MoimURL.CommerceMyBenefit,
      MoimURL.CommerceMyShopping,
    ],
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CommerceMyShoppingRedirector {...routeProps} />
      </Layout>
    ),
  },

  {
    def: MoimURL.CommerceMyCarts,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CommerceCartsRedirector {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.Me,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <MeProfileRedirector {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.ProfileShare,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <ShareProfileRedirector {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.CoinShow,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <ShareCommunityCoinsRedirector {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.CoinToBeExpired,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <ShareCommunityCoinsToBeExpiredRedirector {...routeProps} />
      </Layout>
    ),
  },
  {
    def: MoimURL.PositionMembers,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <SharePositionMembersRedirector {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [
      MoimURL.PostTemplate,
      MoimURL.PostTemplateEditor,
      MoimURL.PostTemplateShow,
    ],
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <PostTemplate {...routeProps} />
      </Layout>
    ),
  },
  {
    def: [MoimURL.SearchWithTab, MoimURL.Search],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <Search {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [
      MoimURL.CampaignWallet,
      MoimURL.CampaignParticipants,
      MoimURL.CampaignFunds,
      MoimURL.CampaignExecutionView,
      MoimURL.CampaignExecutions,
    ],
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CampaignMain {...routeProps} />
      </Layout>
    ),
  },
  {
    def: [
      MoimURL.CommerceProductSets,
      MoimURL.CommerceCategories,
      MoimURL.CommerceSellers,
      MoimURL.CommerceDeliveryGroup,
      MoimURL.CommerceProductShow,
      MoimURL.CommerceSellerSets,
    ],
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CommerceMain {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [MoimURL.NftShow],
    component: () => (
      <Layout>
        <NftShow />
      </Layout>
    ),
  },

  {
    def: MoimURL.NftSetShow,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <NftSetShow {...routeProps} />
      </Layout>
    ),
  },

  {
    def: MoimURL.NftScheduleShow,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <NftScheduleShow {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [MoimURL.NftCollectionShow, MoimURL.NftCollectionShowTabs],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <NftCollectionShow {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [MoimURL.TreasuryShow],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <TreasuryShow {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [MoimURL.CryptobadgeShow],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CryptobadgeShow {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [MoimURL.CertificateShow],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CertificateShow {...routeProps} />
      </Layout>
    ),
  },
  {
    def: [MoimURL.CertificateMetadataShow],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CertificateMetadataShow {...routeProps} />
      </Layout>
    ),
  },
  {
    def: [MoimURL.MoimLogin],
    exact: true,
    component: () => (
      <Layout>
        <MoimLogin />
      </Layout>
    ),
  },

  {
    def: [MoimURL.CryptobadgeGroupShow],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <CryptobadgeGroupShow {...routeProps} />
      </Layout>
    ),
  },

  {
    def: [MoimURL.RedirectPlugin],
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <PluginRedirectDetector {...routeProps} />
    ),
  },
  {
    def: MoimURL.Test,
    exact: true,
    component: (routeProps: IRouteComponentProps) => (
      <Layout>
        <TestBed {...routeProps} />
      </Layout>
    ),
  },

  // moim app home은 맨 밑에 위치해야됨
  {
    def: MoimURL.MoimAppHome,
    component: () => <Home />,
    exact: true,
  },
];
