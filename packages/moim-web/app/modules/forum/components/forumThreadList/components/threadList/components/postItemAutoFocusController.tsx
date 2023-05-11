import * as React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { IAppState } from "app/rootReducer";
import { AppDispatch } from "app/store";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";
import { getIsForumShow } from "app/modules/forum/helpers";

interface IProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    RouteComponentProps {
  threadId: Moim.Id;
  isMobile: boolean;
  selected: boolean;
}

function mapStateToProps(state: IAppState) {
  return {
    highlightThreadId: state.forumListPage.highlightThreadId,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      dispatchClearHighlightThreadId:
        ForumActionCreators.clearHighlightThreadId,
    },
    dispatch,
  );
}

class PostItemAutoFocusController extends React.PureComponent<
  React.PropsWithChildren<IProps>
> {
  private readonly refThis = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const { selected } = this.props;
    if (!this.getDisableAutoFocus() && selected) {
      requestAnimationFrame(() => {
        this.refThis.current?.scrollIntoView({ block: "center" });
      });
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    const {
      selected,
      highlightThreadId,
      threadId,
      dispatchClearHighlightThreadId,
    } = this.props;

    if (
      !this.getDisableAutoFocus() &&
      highlightThreadId &&
      (selected ||
        (highlightThreadId === threadId &&
          prevProps.highlightThreadId === null))
    ) {
      dispatchClearHighlightThreadId();
      requestAnimationFrame(() => {
        this.refThis.current?.scrollIntoView({ block: "center" });
      });
    }
  }

  public render() {
    return <div ref={this.refThis}>{this.props.children}</div>;
  }

  private readonly getDisableAutoFocus = () => {
    const { location, isMobile } = this.props;

    return isMobile && getIsForumShow(location.pathname);
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostItemAutoFocusController),
);
