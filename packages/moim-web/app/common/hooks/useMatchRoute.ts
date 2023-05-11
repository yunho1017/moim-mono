import * as React from "react";
import { useHistory, useRouteMatch } from "react-router";
import createURLDefinition from "common/helpers/url/createDefinition";
import { MoimURL } from "common/helpers/url";
import { MatchRouting } from "../../enums";

interface IMatchValue {
  route: ReturnType<typeof createURLDefinition>;
  type: Moim.Route.MatchRoutingType;
  getValue?: (params: Moim.IMatchParams) => Moim.IMatchParams;
}

const MATCH_ROUTE_PRESET: IMatchValue[] = [
  {
    route: MoimURL.ShowForumThread,
    type: MatchRouting.FORUM_SHOW,
    getValue: params => ({
      threadId: params.threadId,
      forumId: params.forumId,
    }),
  },

  {
    route: MoimURL.Forum,
    type: MatchRouting.FORUM,
    getValue: params => ({ forumId: params.forumId }),
  },

  {
    route: MoimURL.ConversationShow,
    type: MatchRouting.CONVERSATION,
    getValue: params => ({ conversationId: params.conversationId }),
  },

  {
    route: MoimURL.SubMoimList,
    type: MatchRouting.SUBMOIM_LIST,
    getValue: params => ({ tag: params.tag }),
  },
  {
    route: MoimURL.DirectMessageShow,
    type: MatchRouting.DIRECT_MESSAGE,
    getValue: params => ({ directMessageId: params.directMessageId }),
  },

  {
    route: MoimURL.ViewShow,
    type: MatchRouting.VIEW,
    getValue: params => ({ viewId: params.viewId }),
  },
];

function useMatchRoute(): Moim.Route.IMatchRoute {
  const match = useRouteMatch<Moim.IMatchParams>();
  const history = useHistory();

  return React.useMemo(() => {
    let matchRoute: Moim.Route.IMatchRoute = {
      type: MatchRouting.NOT_MATCHED,
    };

    MATCH_ROUTE_PRESET.some(data => {
      if (data.route.match(history.location.pathname)) {
        matchRoute = {
          type: data.type,
          value: data.getValue?.(match.params),
        };

        return true;
      }

      return false;
    });

    return matchRoute;
  }, [match, history]);
}

export default useMatchRoute;
