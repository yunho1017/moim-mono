import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";

import CurrentGroupContainer from "./container/current";
import ParentGroupContainer from "./container/parent";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import {
  getCanRefreshTokenFromMoimToken,
  getCanTokenFromMoimToken,
  getMoimTokenToCookie,
} from "common/helpers/authentication";
import { getOAuthTokenForGroup } from "common/helpers/cryptoBadgeHandlerWithInMemory";

import selectHubMoimId from "common/helpers/selectHubMoimId";

import { IAppState } from "app/rootReducer";

function mapStateToProps(state: IAppState) {
  return {
    open: state.joinGroupDialog.open,
    type: state.joinGroupDialog.type,
    hubGroupId: selectHubMoimId(state),
    options: state.joinGroupDialog.options,
  };
}

const Dialog = withStyles({
  root: {
    zIndex: "1301 !important" as any,
  },
})(BasicResponsiveDialog);

type IProps = ReturnType<typeof mapStateToProps>;
class JoinGroupDialog extends React.PureComponent<IProps> {
  public render() {
    const { open } = this.props;

    return <Dialog open={open}>{this.renderInner()}</Dialog>;
  }

  private readonly getAuthentication = () => {
    const { hubGroupId, options } = this.props;

    if (options?.token) {
      return {
        provider: "cryptobadge",
        token: options.token,
        group: hubGroupId,
        refreshToken: options.refreshToken,
      } as Moim.IAuthentication;
    }

    const token = hubGroupId
      ? getMoimTokenToCookie(hubGroupId)?.access_token
      : undefined;
    const canToken = getCanTokenFromMoimToken(token);
    const refreshToken = getCanRefreshTokenFromMoimToken(token);

    const authentication: Moim.IAuthentication | null =
      hubGroupId && canToken
        ? {
            provider: "cryptobadge",
            token: canToken,
            group: hubGroupId,
            refreshToken,
          }
        : getOAuthTokenForGroup();

    return authentication;
  };

  private readonly renderInner = () => {
    const { type } = this.props;

    switch (type) {
      case "current":
        return (
          <CurrentGroupContainer authentication={this.getAuthentication()} />
        );
      case "parent":
        return (
          <ParentGroupContainer authentication={this.getAuthentication()} />
        );
      default:
        return null;
    }
  };
}

export default connect(mapStateToProps)(JoinGroupDialog);
