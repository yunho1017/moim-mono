declare namespace Moim {
  declare namespace Route {
    namespace MatchRoutingType {
      type FORUM = "FORUM";
      type FORUM_SHOW = "FORUM_SHOW";
      type CONVERSATION = "CONVERSATION";
      type SUBMOIM_LIST = "SUBMOIM_LIST";
      type DIRECT_MESSAGE = "DIRECT_MESSAGE";
      type VIEW = "VIEW";
      type COMMERCE = "COMMERCE";
      type NOT_MATCHED = "NOT_MATCHED";
    }

    type MatchRoutingType =
      | MatchRoutingType.FORUM
      | MatchRoutingType.FORUM_SHOW
      | MatchRoutingType.CONVERSATION
      | MatchRoutingType.SUBMOIM_LIST
      | MatchRoutingType.DIRECT_MESSAGE
      | MatchRoutingType.VIEW
      | MatchRoutingType.COMMERCE
      | MatchRoutingType.NOT_MATCHED;

    interface IMatchRoute {
      type: MatchRoutingType;
      value?: Moim.IMatchParams;
    }
  }
}
