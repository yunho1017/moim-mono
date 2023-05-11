import { IGroupAppState } from "app/rootReducer";
import { MoimURL } from "common/helpers/url";

const PAGE_SET_LIST = [
  { definition: MoimURL.DirectMessageShow, name: "/direct_messages" },
  { definition: MoimURL.ShowForumThread, name: "/post_show" },
  { definition: MoimURL.Forum, name: "/thread_list" },
  { definition: MoimURL.ConversationShow, name: "/conversations" },
  {
    definition: MoimURL.ViewShow,
    name: "/view",
    getTitle: (
      params: Record<string, string>,
      getState: () => IGroupAppState,
    ) => {
      return getState().entities.channels[params.id].name;
    },
  },
  { definition: MoimURL.CommercePaymentsShow, name: "/purchase_show" },
  { definition: MoimURL.CommercePaymentsShow, name: "/purchase_show" },
  { definition: MoimURL.CommerceMyBenefitCoupons, name: "/commerce/my" },
  { definition: MoimURL.CommerceMyBenefitCredits_Legacy, name: "/commerce/my" },
  { definition: MoimURL.PositionMembers, name: "/position_users" },
  {
    definition: MoimURL.CommerceProductShowComment,
    name: "/product_comment_show",
  },
  {
    definition: MoimURL.CommerceProductShowReview,
    name: "/product_review_show",
  },
  {
    definition: MoimURL.CommerceProductShowQnA,
    name: "/product_question_show",
  },
  {
    definition: MoimURL.CommerceProductShow,
    name: "/product_show",
  },
  {
    definition: MoimURL.CommerceCategories,
    name: "/commerce/category",
  },
  {
    definition: MoimURL.CoverPage,
    name: "/cover",
  },
  {
    definition: MoimURL.Search,
    name: "/search",
  },
  {
    definition: MoimURL.ContentsGroupThreads,
    name: "/content_group",
  },
  {
    definition: MoimURL.NftScheduleShow,
    name: "/nft/schedule",
  },
  {
    definition: MoimURL.NftCollectionShow,
    name: "/nft/contract",
  },
  {
    definition: MoimURL.NftSetShow,
    name: "/nft/nft_sets",
  },
  {
    definition: MoimURL.NftShow,
    name: "/nft_show",
  },
  {
    definition: MoimURL.QuestList,
    name: "/quests",
  },
  {
    definition: MoimURL.QuestShow,
    name: "/quest",
  },
  { definition: MoimURL.SubMoimList, name: "/tag_list" },
  { definition: MoimURL.Channel, name: "channel" },
  { definition: MoimURL.ViewShow, name: "view_channel" },
  { definition: MoimURL.CryptobadgeShow, name: "cryptobadge_show" },
  { definition: MoimURL.CryptobadgeGroupShow, name: "cryptobadge_group_show" },
  { definition: MoimURL.NftShow, name: "nft_collection_show" },
  { definition: MoimURL.NftCollectionShow, name: "nft_collection_show" },
  { definition: MoimURL.NftScheduleShow, name: "nft_schedule_show" },
  { definition: MoimURL.NftSetShow, name: "nft_set_show" },
];
const ELSE_NAME = "unknown";

function getPageName(path: string, getState?: () => IGroupAppState) {
  const pageSet = PAGE_SET_LIST.find(_pageSet =>
    _pageSet.definition.isSameExact(path),
  );

  if (!pageSet) {
    return ELSE_NAME;
  }

  const matched = pageSet.definition.match(path);

  if (pageSet.getTitle && getState && matched && matched.params) {
    return pageSet.getTitle(matched.params, getState);
  }

  return pageSet.name;

  // return index > -1 ? PAGE_SET_LIST[index].name : ELSE_NAME;
}

export default getPageName;
