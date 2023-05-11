import * as React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";

import Forum from "app/modules/forum";
import Conversation from "app/modules/conversation";
import SubMoimList from "app/modules/moimList";

import { MoimURL } from "common/helpers/url";
import renderRoutes from "app/routes/helpers";

import { IRouteComponentProps, IRouteConfig } from "app/routes/client";
import View from "../view";

export const channelRoutes: IRouteConfig[] = [
  {
    def: [
      MoimURL.CreateForumThread,
      MoimURL.EditForumThread,
      MoimURL.ShowForumThread,
      MoimURL.Forum,
    ],
    component: () => <Forum />,
  },

  {
    def: [MoimURL.ConversationShow, MoimURL.DirectMessageShow],
    component: () => <Conversation />,
  },

  {
    def: [MoimURL.ViewShow],
    component: () => <View />,
  },

  {
    def: MoimURL.SubMoimList,
    component: (props: IRouteComponentProps) => <SubMoimList {...props} />,
  },
];

class Channel extends React.Component<RouteComponentProps> {
  public render() {
    const { location } = this.props;

    return renderRoutes(channelRoutes, {
      location,
    });
  }
}

export default withRouter(Channel);
