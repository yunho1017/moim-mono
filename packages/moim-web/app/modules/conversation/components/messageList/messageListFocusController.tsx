import * as React from "react";
import { connect } from "react-redux";
import throttle from "lodash/throttle";
import memoize from "lodash/memoize";

import {
  conversationLastMessageIdWithGRPCSelector,
  conversationMessagesSelector,
} from "app/selectors/conversation";
import { IAppState } from "app/rootReducer";

import { ScrollSection } from "./styled";
import { isBrowser } from "common/helpers/envChecker";
import getDocumentScrollElement from "common/helpers/getDocumentScrollElement";
import getParentScrollElement from "common/helpers/getParentScrollElement";
import IsMobileViewport, {
  IRefHandler,
} from "common/components/isMobileViewport";

const memoizedGetScrollElement = memoize(getDocumentScrollElement);

interface IState {
  isBottom: boolean;
}

function mapStateToProps(
  state: IAppState,
  props: {
    channelId: Moim.Id;
  },
) {
  const channelId = props.channelId;
  return {
    lastMessageId: conversationLastMessageIdWithGRPCSelector(state, channelId),
    paging: conversationMessagesSelector(state, channelId)?.paging ?? {},
    postedMessageId: state.conversation.postedMessageId,
  };
}

interface IProps extends ReturnType<typeof mapStateToProps> {
  channelId: Moim.Id;
}

class MessageAutoFocusController extends React.PureComponent<
  React.PropsWithChildren<IProps>,
  IState
> {
  public state: IState = {
    isBottom: false,
  };

  private readonly refThis = React.createRef<HTMLDivElement>();
  private readonly refIsMobile = React.createRef<IRefHandler>();

  public componentDidUpdate(prevProps: IProps) {
    if (!this.props.paging.after) {
      const isDifferentMessage =
        prevProps.lastMessageId !== this.props.lastMessageId;

      if (
        isDifferentMessage &&
        (this.state.isBottom ||
          this.props.postedMessageId === this.props.lastMessageId)
      ) {
        this.goBottom();
      }
    }
  }

  public componentDidMount() {
    this.handleCheckIsBottom();
    this.getParentScrollElement().addEventListener(
      "scroll",
      this.handleCheckIsBottom,
    );
  }

  public componentWillUnmount() {
    this.getParentScrollElement().removeEventListener(
      "scroll",
      this.handleCheckIsBottom,
    );
  }

  public render() {
    return (
      <>
        <ScrollSection ref={this.refThis}>{this.props.children}</ScrollSection>
        <IsMobileViewport ref={this.refIsMobile} />
      </>
    );
  }

  private readonly goBottom = () => {
    const scrollElement = this.getScrollElement();
    if (scrollElement && isBrowser()) {
      if (this.refIsMobile.current?.isMobile) {
        scrollElement.scrollIntoView(false);
      } else {
        requestAnimationFrame(() => {
          scrollElement.scrollTop =
            scrollElement.scrollHeight - scrollElement.clientHeight;
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly handleCheckIsBottom = throttle(() => {
    const scrollElement = this.getScrollElement();
    if (scrollElement && !this.props.paging.after) {
      const { scrollHeight, scrollTop, clientHeight } = scrollElement;

      this.setState({
        isBottom:
          scrollHeight <= clientHeight ||
          scrollTop >= scrollHeight - clientHeight,
      });
    } else {
      this.setState({ isBottom: false });
    }
  }, 200);

  private readonly getScrollElement = () =>
    memoizedGetScrollElement(this.refThis.current);

  private readonly getParentScrollElement = () =>
    getParentScrollElement(this.refThis.current || null) ?? window;
}

export default connect(mapStateToProps)(MessageAutoFocusController);
