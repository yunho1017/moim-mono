import { MatchRouting } from "app/enums";

function isSelectedChannel(
  matchRoute: Moim.Route.IMatchRoute,
  channelType: Moim.Channel.Type | undefined,
  channelId: Moim.Id,
): boolean {
  if (channelType === "conversation") {
    return (
      matchRoute.type === MatchRouting.CONVERSATION &&
      matchRoute.value?.conversationId === channelId
    );
  }

  if (channelType === "forum") {
    return (
      (matchRoute.type === MatchRouting.FORUM ||
        matchRoute.type === MatchRouting.FORUM_SHOW) &&
      matchRoute.value?.forumId === channelId
    );
  }

  if (channelType === "tag" || channelType === "subgroups") {
    return (
      matchRoute.type === MatchRouting.SUBMOIM_LIST &&
      matchRoute.value?.tag === channelId
    );
  }

  if (channelType === "dm") {
    return (
      matchRoute.type === MatchRouting.DIRECT_MESSAGE &&
      matchRoute.value?.directMessageId === channelId
    );
  }

  if (channelType === "view") {
    return (
      matchRoute.type === MatchRouting.VIEW &&
      matchRoute.value?.viewId === channelId
    );
  }

  return false;
}

export default isSelectedChannel;
