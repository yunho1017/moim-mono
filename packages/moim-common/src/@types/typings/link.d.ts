declare namespace Moim {
  declare namespace Channel {
    declare namespace Link {
      interface INormalizedLink {
        type: "link";
        id: Moim.Id;
        group: Moim.Id;
        name: string;
        url: string;
        creator: Moim.Id;
        created_at: number;
        updated_at: number;
        priority: number;
        category_id: Moim.Id;
        purpose: Channel.IChannelPurpose;
        topic: Channel.IChannelTopic;
      }

      interface ILinkChannel
        extends Omit<INormalizedLink, "group" | "creator"> {
        group: Group.IGroup;
        creator: User.IUser;
      }

      type INormalizedData = INormalizedEntities<INormalizedLink>;

      // POST: /api/groups/links/{id}/messages
      interface ICreateLinkRequestBody {
        link: {
          name: string;
          url: string;
        };
      }

      type ICreateLinkRequest = ICreateLinkRequestBody;

      type ICreateLinkResponseBody = ISingleItemResponse<
        Channel.SimpleChannelType
      >;

      // PUT: /api/groups/links/{channel_id}/name
      interface IRenameLinkChannelRequestPath {
        channel_id: Moim.Id;
      }

      interface IRenameLinkChannelRequestBody {
        link: {
          name: string;
        };
      }

      type IRenameLinkChannelRequest = IRenameLinkChannelRequestBody &
        IRenameLinkChannelRequestPath;

      type IRenameLinkChannelResponseBody = ISingleItemResponse<
        INormalizedLinkChannel
      >;

      // PUT: /api/groups/links/{channel_id}/topic
      interface IEditLinkChannelTopicRequestPath {
        channel_id: Moim.Id;
      }

      interface IEditLinkChannelTopicRequestBody {
        link: {
          topic: string | null;
        };
      }

      type IEditLinkChannelTopicRequest = IEditLinkChannelTopicRequestPath &
        IEditLinkChannelTopicRequestBody;

      type IEditLinkChannelTopicResponseBody = ISingleItemResponse<
        INormalizedLinkChannel
      >;

      // PUT: /api/groups/links/{channel_id}/url
      interface IEditLinkChannelUrlRequestPath {
        channel_id: Moim.Id;
      }

      interface IEditLinkChannelUrlRequestBody {
        link: {
          url: string;
        };
      }

      type IEditLinkChannelUrlRequest = IEditLinkChannelUrlRequestPath &
        IEditLinkChannelUrlRequestBody;

      type IEditLinkChannelUrlResponseBody = ISingleItemResponse<
        INormalizedLinkChannel
      >;

      // GET: /api/conversations/{channel_id}
      interface IGetLinkChannelListRequestQuery extends IPaging {
        limit?: number; // default: 30
      }

      type IGetLinkChannelListRequest = IGetLinkChannelListRequestQuery;

      type IGetLinkChannelListResponseBody = IPaginatedListResponse<
        INormalizedLink
      >;
    }
  }
}
