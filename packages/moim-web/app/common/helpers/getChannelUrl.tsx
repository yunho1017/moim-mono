import { MoimURL } from "common/helpers/url";

function getChannelUrl(channel?: Moim.Group.IDefaultChannel) {
  if (!channel) {
    return new MoimURL.NotFound().toString();
  }

  const channelId = channel.id;

  switch (channel.type) {
    case "forum": {
      return new MoimURL.Forum({ forumId: channelId }).toString();
    }

    case "conversation": {
      return new MoimURL.ConversationShow({
        conversationId: channelId,
      }).toString();
    }

    case "subgroups":
    case "tag": {
      return new MoimURL.SubMoimList({ tag: channelId }).toString();
    }

    case "view": {
      return new MoimURL.ViewShow({ viewId: channelId }).toString();
    }

    default: {
      return new MoimURL.NotFound().toString();
    }
  }
}

export default getChannelUrl;
