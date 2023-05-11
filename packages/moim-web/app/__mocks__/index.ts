import {
  threadNormalizer,
  groupNormalizer,
  moimNormalizer,
  channelListNormalizer,
  channelNormalizer,
} from "app/models";
import { positionNormalizer } from "../models/position/normalizer";
import { categoryNormalizer } from "../models/category/normalizer";
import { tagNormalizer } from "app/models/tag/normalizer";
import { directMessageNormalizer } from "app/models/directMessage";
import { tagSetListNormalizer } from "app/models/tagset";
import {
  sellerNormalizer,
  sellerListNormalizer,
  productNormalizer,
  productListNormalizer,
  productSetListNormalizer,
  commerceCategoryListNormalizer,
  cartResponseNormalizer,
  purchaseListNormalizer,
  shippingAddressNormalizer,
  shippingAddressListNormalizer,
} from "app/models/commerce";

import {
  campaignListNormalizer,
  campaignExecutionListNormalizer,
  executionVoteListNormalizer,
} from "app/models/campaign";

const RAW_MOCK_COMMERCE = {
  info: require("./commerce_bank_code.json") as Moim.ISingleItemResponse<
    Moim.Commerce.ICommerceBasicInfo
  >,
  hubSeller: require("./commerce_hub_seller.json") as Moim.Commerce.ISeller,
  subSellers: require("./commerce_sub_sellers.json") as Moim.IPaginatedListResponse<
    Omit<Moim.Commerce.ISeller, "accounts">
  >,
  products: require("./commerce_products.json") as Moim.IPaginatedListResponse<
    Omit<Moim.Commerce.IProduct, "seller">
  >,
  productShow: require("./commerce_product.json") as Required<
    Moim.Commerce.IProduct
  >,
  productSets: require("./commerce_productSets.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.IProductSet
  >,
  categories: require("./commerce_categories.json") as Moim.IListResponse<
    Moim.Commerce.ICategory
  >,
  carts: require("./commerce_my_carts.json") as Moim.Commerce.ICartResponse,
  paymentCalc: require("./commerce_payment_calc.json") as Moim.Commerce.IPaymentCalcResponse,
  payments: require("./commerce_payaments.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.IPurchase
  >,
  myCreditHistories: require("./commerce_my_credit_histories.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.ICreditHistoryItem
  >,
  myCoupons: require("./commerce_coupons.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.ICoupon
  >,
  myAvailableCoupons: require("./commerce_available_coupons.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.IAvailableStatusCoupon
  >,
  variants: require("./commerce_product_variants.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.IProductVariant
  >,
  shippingAddressList: require("./commerce_get_shipping_address.json") as Moim.IListResponse<
    Moim.Commerce.ICommerceShippingAddress
  >,
  shippingAddress: require("./commerce_create_shipping_address.json") as Moim.Commerce.ICommerceShippingAddress,

  purchaseItemFunItem: require("./purchase_item_fund_item.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.IPurchaseItem
  >,

  campaigns: require("./campaign_campaign.json") as Moim.IPaginatedListResponse<
    Moim.Campaign.ICampaign
  >,
  campaignExecutions: require("./campaign_campaign_execution.json") as Moim.IListResponse<
    Moim.Campaign.ICampaignExecution
  >,
  executionVotes: require("./campaign_execution_votes.json") as Moim.IPaginatedListResponse<
    Moim.Campaign.IExecutionVote
  >,
  BATCH_DOWNLOADABLE_COUPONS: require("./batch_downloadable_coupon.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.IDownloadableCoupon
  >,
  DOWNLOADABLE_COUPON: require("./download_coupon.json") as Moim.Commerce.ICoupon,
  SEARCH_DOWNLOADABLE_COUPONS: require("./commerce_search_download_coupons.json") as Moim.IPaginatedListResponse<
    Moim.Commerce.ICoupons
  >,
};

const NORMALIZE_MOCK_COMMERCE = {
  hubSeller: sellerNormalizer(RAW_MOCK_COMMERCE.hubSeller),
  subSellers: sellerListNormalizer(RAW_MOCK_COMMERCE.subSellers),
  products: productListNormalizer(RAW_MOCK_COMMERCE.products),
  productShow: productNormalizer(RAW_MOCK_COMMERCE.productShow),
  productSets: productSetListNormalizer(RAW_MOCK_COMMERCE.productSets),
  categories: commerceCategoryListNormalizer(RAW_MOCK_COMMERCE.categories),
  carts: cartResponseNormalizer(RAW_MOCK_COMMERCE.carts),
  payments: purchaseListNormalizer(RAW_MOCK_COMMERCE.payments),
  shippingAddressList: shippingAddressListNormalizer(
    RAW_MOCK_COMMERCE.shippingAddressList,
  ),
  shippingAddress: shippingAddressNormalizer(RAW_MOCK_COMMERCE.shippingAddress),
  campaigns: campaignListNormalizer(RAW_MOCK_COMMERCE.campaigns),
  campaignExecutions: campaignExecutionListNormalizer(
    RAW_MOCK_COMMERCE.campaignExecutions,
  ),
  executionVotes: executionVoteListNormalizer(RAW_MOCK_COMMERCE.executionVotes),
};

export const RAW = {
  GROUP_PLUGINS: require("./group_plugins.json") as Moim.IPaginatedListResponse<
    Moim.Plugin.IPlugin
  >,
  GROUP_CHANNELS: require("./channels.json") as {
    data: Moim.Channel.ICommonChannel[];
  },
  NORMALIZED_CHANNEL: require("./channel.json"),
  NORMALIZED_MESSAGE: require("./message.json") as Moim.Conversations.INormalizedMessage,
  NORMALIZED_MESSAGE_WITH_FILE_BLOCK: {
    ...require("./message.json"),
    blocks: [
      {
        type: "file",
        files: [{ id: "FP28TOC7K", title: "test-result.7a4009b7.png" }],
      },
    ],
  } as Moim.Conversations.INormalizedMessage,
  MESSAGE: {
    ...require("./message.json"),
    user: require("./group_response.json").user,
  } as Moim.Conversations.IMessage,
  CHANNEL: {
    ...require("./channel.json"),
    group: require("./group_response.json").group,
    user: require("./group_response.json").user,
  } as Moim.Channel.ICommonChannel,
  FORUM: require("./forum.json").data as Moim.Forum.INormalizedForum,
  CONVERSATION: require("./conversation.json")
    .data as Moim.Conversations.INormalizedConversation,
  CATEGORY: require("./category.json") as Moim.Category.ICategory,
  DIRECT_MESSAGE: require("./directMessage.json") as Moim.DirectMessage.INormalizedDirectMessage,
  MEMBER: {
    ...require("./member.json"),
    positions: [],
    certifications: [],
  } as Moim.User.IUser,
  NORMALIZED_MEMBER: {
    ...require("./member.json"),
    positions: [],
    certifications: [],
  } as Moim.User.INormalizedUser,
  GROUP_WITH_USER: require("./group_response.json") as Moim.Group.IGroupWithUser,
  NORMALIZED_GROUP_WITH_USER: require("./group_response.json") as Moim.Group.INormalizedGroupWithUser,
  GROUP: require("./group_response.json").group as Moim.Group.IGroup,
  NORMALIZED_GROUP: require("./group_response.json")
    .group as Moim.Group.INormalizedGroup,
  GROUP_THEME: require("./group_theme.json") as Moim.Group.ITheme,
  MOIM_COVER: require("./moimCover.json") as Moim.Group.IMoimCover,
  TEXT_ICON: {
    type: "text",
    data: {
      text: "p", // Single character, Emoji can be used too
      color: "#17CEDF", // hexadecimal text color with alpha (e.g. #AABBCCFF)
      bg_color: "#FFFFFF", // hexadecimal background color with alpha (e.g. #AABBCCFF)
    },
  } as Moim.ITextIcon,
  IMAGE_ICON: {
    type: "image",
    data: {
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia&s", // "https://i.v-edge.group/G12345678-480.png"
    },
  } as Moim.IImageIcon,

  THREAD: require("./forum_thread.json").data as Moim.Forum.IThread,
  THREAD_VOTE: require("./threadVote.json").data as Moim.Forum.IVote,

  FILE_UPLOAD_QUEUE: require("./file_upload_queue.json") as Moim.ISingleItemResponse<
    Moim.Upload.IQueueInfo
  >,
  FILE_UPLOAD_STATUS_QUEUED: require("./file_upload_status_queued.json") as Moim.ISingleItemResponse<
    Moim.Upload.IUploadStatusInfo
  >,
  FILE_UPLOAD_STATUS_AVAILABLE: require("./file_upload_status_available.json") as Moim.ISingleItemResponse<
    Moim.Upload.IFileInfo
  >,

  FILE_IMAGE: require("./file_image.json") as { data: Moim.Upload.IFileInfo },
  FILE_GIF: require("./file_gif.json") as { data: Moim.Upload.IFileInfo },
  FILE_VIDEO: require("./file_video.json") as { data: Moim.Upload.IFileInfo },
  FILE_BATCH: require("./file_batch.json") as Moim.IPaginatedListResponse<
    Moim.Upload.IFileInfo
  >,
  LINK_PREVIEW_BLOCKIT: require("./linkpreview_blockit.json") as Moim.Blockit.ILinkPreviewBlock,

  POSITION: {
    ...require("./position.json"),
    creator: require("./member.json") as Moim.User.IUser,
  } as Moim.Position.IPosition,

  NORMALIZED_POSITION: require("./position.json") as Moim.Position.INormalizePosition,
  MOCK_POST_USER_REQUEST_BODY: {
    user: {
      name: "Farid Amini",
      bio: "Kinshasa",
      locale: "ko",
      tz: "Asia/Seoul",
      authentication: {
        group: "G123451",
        token: "",
      },
      notificationSettings: {
        web: {
          group: {
            status: "enable",
            detailed: {
              mention: true,
            },
          },
          channels: [],
        },
        mobile: {
          group: {
            status: "enable",
            detailed: {
              mention: true,
            },
          },
          channels: [],
        },
      },
    },
  } as Moim.User.IPostUserRequestBody,
  MY_JOINED_GROUPS: require("./myJoinedGroup.json") as Moim.IPaginatedListResponse<
    Moim.Group.INormalizedGroupWithUser
  >,
  GROUP_BOOTSTRAP: require("./bootstrap.json") as {
    data: Moim.Group.IBootstrap;
  },

  TAGS: require("./tags.json") as Moim.IPaginatedListResponse<Moim.Tag.ITag>,
  AGREEMENT_TERM: require("./agreement.json") as Moim.ISingleItemResponse<
    Moim.Agreement.IAgreement
  >,
  PERMISSIONS: require("./permission.json") as Moim.ISingleItemResponse<
    Moim.Permission.IPermission[]
  >,
  PARENT_MOIM_USER_PROFILE: require("./parentMoimUserData.json") as Moim.ISingleItemResponse<
    Moim.User.IParentMoimUserInformation
  >,
  SIMPLE_CHANNELS: require("./simpleChannels.json") as Moim.IPaginatedListResponse<
    Moim.Channel.SimpleChannelType
  >,
  SIMPLE_CHANNEL: (require("./simpleChannels.json") as Moim.IPaginatedListResponse<
    Moim.Channel.SimpleChannelWithoutCategoryType
  >).data[1],

  TAG_SET: require("./tagset.json") as Moim.IPaginatedListResponse<
    Moim.TagSet.ITagSet
  >,

  REPLACE_BLOCK_1: {
    data: [
      {
        actionType: "replace",
        actionData: [
          {
            botId: "testBotId",
            blockId: "testBlockId",
            blocks: [
              { type: "text", subType: "h1", content: "Hello world!" },
              { type: "text", subType: "caption", content: "Welcome to Moim." },
            ],
          },
        ],
      },
    ],
  } as Moim.IListResponse<Moim.Blockit.IBlockActionResponse>,

  PROFILE_SHOW_BLOCKITS: require("./profile_show_blockits.json") as Moim.Blockit.Blocks[],
  PROFILE_PREVIEW_BLOCKITS: require("./profile_preview_blockits.json") as Moim.Blockit.Blocks[],
  NORMALIZED_BOOKMARK: require("./profile_show_blockits.json") as Moim.ISingleItemResponse<
    Moim.Bookmark.INormalizedBookmark
  >,
  COMMERCE: RAW_MOCK_COMMERCE,

  CHILD_MOIM_GROUP_DATA: require("./child_moim_group_data.json") as Moim.ISingleItemResponse<
    Moim.ChildMoimGroup.IChildMoimGroupData
  >,
  CHILD_MOIM_GROUP_MOIMS: require("./child_moim_group_moims.json") as Moim.IPaginatedListResponse<
    Moim.ChildMoimGroup.IChildMoimGroupMoimDatum
  >,
  QUEST_LIST: require("./quest_list.json") as Moim.IPaginatedListResponse<
    Moim.DQuest.IQuest
  >,
};

export const NORMALIZED = {
  THREAD: threadNormalizer(RAW.THREAD),
  GROUP: groupNormalizer(RAW.NORMALIZED_GROUP),
  DIRECT_MESSAGE: directMessageNormalizer(RAW.DIRECT_MESSAGE),
  POSITION: positionNormalizer(RAW.NORMALIZED_POSITION),
  CATEGORY: categoryNormalizer(RAW.CATEGORY),
  TAG: tagNormalizer(RAW.TAGS.data[0]),
  MOIM: moimNormalizer(RAW.NORMALIZED_GROUP_WITH_USER),
  SIMPLE_CHANNELS: channelListNormalizer(RAW.SIMPLE_CHANNELS),
  SIMPLE_CHANNEL: channelNormalizer(RAW.SIMPLE_CHANNELS.data[0]),
  TAG_SET: tagSetListNormalizer(RAW.TAG_SET),

  COMMERCE: NORMALIZE_MOCK_COMMERCE,
};

const CHANNEL_BASE_DATA: Moim.Channel.ICommonChannel = {
  ...RAW.CHANNEL,
  group: RAW.GROUP_WITH_USER.group,
  creator: (RAW.GROUP_WITH_USER.user as any) as Moim.User.IUser,
};

export const MOCK_CHANNEL = {
  CHAT_MOCK_DATA: {
    ...RAW.CONVERSATION,
    group: RAW.GROUP_WITH_USER.group,
    creator: (RAW.GROUP_WITH_USER.user as any) as Moim.User.IUser,
  } as Moim.Channel.IChannel,

  FORUM_MOCK_DATA: {
    ...CHANNEL_BASE_DATA,

    list_config: {},
  } as Moim.Channel.IChannel,

  LINK_MOCK_DATA: {
    ...CHANNEL_BASE_DATA,
    url: "https://www.naver.com/",
  } as Moim.Channel.IChannel,
};

export const MOCK_SIMPLE_CHANNEL: {
  [key: string]: Exclude<Moim.Channel.SimpleChannelType, { type: "category" }>;
} = {
  CHAT_MOCK_DATA: {
    ...RAW.SIMPLE_CHANNEL,
    type: "conversation",
  } as Moim.Channel.ICommonSimpleChannel,

  FORUM_MOCK_DATA: {
    ...RAW.SIMPLE_CHANNEL,
    type: "forum",
  } as Moim.Channel.IForumSimpleChannel,

  LINK_MOCK_DATA: {
    ...RAW.SIMPLE_CHANNEL,
    type: "link",
    url: "https://www.naver.com/",
  } as Moim.Channel.ILinkSimpleChannel,
};
