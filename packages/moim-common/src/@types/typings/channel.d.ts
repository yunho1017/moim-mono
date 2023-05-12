declare namespace Moim {
  declare namespace Channel {
    type INormalizedData = INormalizedEntities<NormalizedChannelType>;
    type IStatNormalizedData = INormalizedEntities<IChannelStat>;

    type SimpleChannelType =
      | ICommonSimpleChannel
      | IForumSimpleChannel
      | ILinkSimpleChannel
      | IViewSimpleChannel
      | ITagSimpleChannel
      | ICategory;

    type NormalizedChannelType =
      | INormalizedCategory
      | ICommonSimpleChannel
      | IForumSimpleChannel
      | ILinkSimpleChannel
      | ITagSimpleChannel
      | IViewSimpleChannel;

    type SimpleChannelWithoutCategoryType = Exclude<
      SimpleChannelType,
      { type: "category" }
    >;

    interface IForumSimpleChannel extends ICommonSimpleChannel {
      type: "forum";
      list_config: Forum.IForumListConfig;
      show_config: Forum.IForumShowConfig;
      header?: Blockit.Blocks[];
      sorting_options?: Forum.IForumSortingOption[];
      reply_sorting_options?: Forum.IForumSortingOption[];
      text_sets?: Record<Moim.Group.GroupTextSetKey, Moim.Group.IGroupTextSet>;
      thread_template_ids?: Id[];
      thread_templates?: Forum.IPostTemplate[];
      anonymous_config?: {
        post?: boolean;
        reaction?: boolean;
      };
    }

    interface IViewSimpleChannel extends ICommonSimpleChannel {
      type: "view";
      view: {
        type: "BLOCK" | "THREAD";
        blocks?: Blockit.Blocks[];
        thread?: string;
        sub_type?: "commerce";
      };
    }

    interface ILinkSimpleChannel extends ICommonSimpleChannel {
      type: "link";
      url: string;
    }

    interface ITagSimpleChannel extends ICommonSimpleChannel {
      type: "subgroups" | "tag";
      list_config: Forum.IForumListConfig;
      show_config: Forum.IForumShowConfig;
      tags: Id[];
    }

    interface ICategory extends Omit<INormalizedCategory, "items"> {
      items?: SimpleChannelWithoutCategoryType[];
    }

    interface INormalizedCategory {
      id: Id;
      type: "category";
      name: string;
      sort_key: string;
      items?: Id[];
      updated_at: number;
    }

    interface ICommonSimpleChannel {
      id: Id;
      type: Exclude<Type, "link" | "forum">;
      name: string;
      sort_key: string;
      latest: Id;
      parent?: Id;
      stat: IChannelStat;
      purpose?: sting;
      updated_at: number;
      is_limited?: boolean;
    }

    interface IChannelState {
      channels: IPaginatedListResponse<Id>;
      getChannelsLoading: boolean;
    }

    type Type =
      | "conversation"
      | "forum"
      | "link"
      | "dm"
      | "tag"
      | "subgroups"
      | "view";

    type TypeWithCategory = Type | "category";

    type AccessRight = "public" | "private";

    interface IChannelPurpose {
      creator: string;
      content: string;
      updated_at: number;
    }

    interface IChannelTopic {
      creator: string;
      content: string;
      updated_at: number;
    }

    interface IChannelStat {
      count: number;
      last_read: Id;
      has_new: boolean;
      updated_at: number;
      list_count?: number;
      root_list_count?: number;
      has_new_notification?: boolean;
      has_new_for_list?: boolean;
    }

    interface INormalizedCommonChannel {
      id: Id;
      group: Id;
      parent: Id;
      creator: Id;
      category_id?: Id;
      created_at: number;
      updated_at: number;
      latest: string;
      name: string;
      description?: string;
      stat?: IChannelStat;
      purpose?: IChannelPurpose;
      topic?: IChannelTopic;
      priority: number;
      sort_key: string;
      previous_names?: string[];
    }

    interface ICommonChannel
      extends Omit<INormalizedCommonChannel, "group" | "creator"> {
      group: Group.IGroup;
      creator: User.IUser;
    }

    type IChannel =
      | Conversations.IConversation
      | Forum.IForum
      | Link.ILinkChannel
      | Tag.IDenormalizedTag;

    interface ICategoryWithChannel {
      category?: Moim.Category.ICategory;
      channelList: Moim.Channel.IChannel[];
    }

    // GET: /api/groups/{groupId}/channels
    interface IGetChannelListRequestQuery extends IPaging {
      limit?: number; // default: 30
    }

    type IGetChannelListRequest = IGetChannelListRequestQuery & {
      target?: Permission.PermissionType;
    };

    type IGetChannelListResponseBody = IPaginatedListResponse<
      SimpleChannelType
    >;

    // GET: /api/groups/{groupId}/channels/{channelId}
    // DELETE: /api/groups/{groupId}/channels/{channelId}
    interface IChannelRequestPath {
      channelId: Id;
    }

    type IGetChannelRequest = IChannelRequestPath;

    type IGetChannelResponseBody = ISingleItemResponse<SimpleChannelType>;

    type IDeleteChannelRequest = IChannelRequestPath;

    type IDeleteChannelResponseBody = ISingleItemResponse<ISuccessResponse>;

    type EditChannelData =
      | Pick<
          Exclude<SimpleChannelWithoutCategoryType, { type: "link" }>,
          "name" | "purpose" | "parent" | "type"
        >
      | Pick<
          ILinkSimpleChannel,
          "name" | "purpose" | "parent" | "type" | "url"
        >;

    interface IBasedChannelEditAndCreateData {
      name?: string;
      parent?: Id | null;
      targetId?: Id | null;
      purpose?: string;
    }

    interface ILinkChannelEditAndCreateData
      extends IBasedChannelEditAndCreateData {
      type?: "link";
      url?: string;
    }
    interface IConversationChannelEditAndCreateData
      extends IBasedChannelEditAndCreateData {
      type?: "conversation";
    }

    interface IForumChannelEditAndCreateData
      extends IBasedChannelEditAndCreateData {
      type?: "forum";
      list_config?: Partial<Forum.IForumListConfig>;
      show_config?: Partial<Forum.IForumShowConfig>;
      sorting_options?: Forum.IForumSortingOption[];
      reply_sorting_options?: Forum.IForumSortingOption[];
    }

    interface ICategoryChannelEditAndCreateData {
      type?: "category";
      name?: string;
    }

    interface IViewChannelEditAndCreateData {
      type?: "view";
      view?: {
        type: "BLOCK" | "THREAD";
        blocks?: Blockit.Blocks[];
        thread?: string;
      };
    }

    interface IOtherChannelEditAndCreateData
      extends IBasedChannelEditAndCreateData {
      type: "dm" | "tag" | "subgroups";
    }

    type ChannelEditAndCreateDataType =
      | ILinkChannelEditAndCreateData
      | IForumChannelEditAndCreateData
      | ICategoryChannelEditAndCreateData
      | IConversationChannelEditAndCreateData
      | IViewChannelEditAndCreateData
      | IOtherChannelEditAndCreateData;

    // PUT: /api/channels/{channelId}
    interface IEditChannelRequestPath {
      channelId: Id;
    }

    interface IEditChannelRequestBody {
      channel: ChannelEditAndCreateDataType;
    }

    type IEditChannelRequest = IEditChannelRequestPath &
      IEditChannelRequestBody;

    type IEditChannelResponseBody = ISingleItemResponse<SimpleChannelType>;

    // POST: /api/groups/{GroupID}/channels
    interface ICreateChannelRequestBody {
      channel: ChannelCreateAndCreateDataType;
    }

    type ICreateChannelRequest = ICreateChannelRequestBody;

    type ICreateChannelResponseBody = ISingleItemResponse<SimpleChannelType>;

    // GET: /api/channels/:id/pins
    interface IGetPinnedListRequestPath {
      channelId: Moim.Id;
    }

    type IGetPinnedListRequest = IGetPinnedListRequestPath;

    type IGetPinnedListResponseBody<T> = Moim.IListResponse<T>;

    // Post: /api/channels/:id/pins
    interface IPostPinRequestPath {
      channelId: Moim.Id;
    }

    interface IPostPinRequestBody {
      pinIds: Moim.Id[];
    }

    type IPostPinRequest = IPostPinRequestPath & IPostPinRequestBody;

    type IPostPinResponseBody = ISingleItemResponse<ISuccessResponse>;

    // Post: /api/channels/:id/pins
    interface IArrangePinRequestPath {
      channelId: Moim.Id;
    }

    interface IArrangePinRequestBody {
      pinIds: Moim.Id[];
    }

    type IArrangePinRequest = IArrangePinRequestPath & IArrangePinRequestBody;

    type IArrangePinResponseBody = ISingleItemResponse<ISuccessResponse>;
    // delete: /api/channels/:id/pins/:pinId
    interface IDeletePinRequestPath {
      channelId: Moim.Id;
      pinId: Moim.Id;
    }

    type IDeletePinRequest = IDeletePinRequestPath;

    type IDeletePinResponseBody = ISingleItemResponse<ISuccessResponse>;
  }
}
