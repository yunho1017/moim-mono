import * as React from "react";
import memoize from "lodash/memoize";
import { isBrowser } from "app/common/helpers/envChecker";
import getDocumentScrollElement from "common/helpers/getDocumentScrollElement";

import { DefaultLoader } from "common/components/loading";
import Loader from "./components/loader";
import ScrollPositionController, {
  IScrollState,
} from "./components/scrollController";

const memoizedGetScrollElement = memoize(getDocumentScrollElement);

interface IProps extends Omit<React.HTMLProps<HTMLElement>, "ref"> {
  loadMore: (pagingKey: keyof Moim.IPaging) => any;
  element: keyof React.ReactHTML;
  useInitialScroll: boolean;
  itemLength: number;
  threshold: number;
  loader?: React.ReactNode;
  identity?: string;
  paging?: Moim.IPaging;
  isLoading?: boolean;
  reverse?: boolean;
  ref?: React.RefObject<InfiniteScroller>;
}

interface IState {
  scrollState: null | IScrollState;
}

type DefaultPropKeys = "element" | "threshold" | "loader" | "useInitialScroll";

const LOADING_TIME = 1500;

function isInitialLoadFromProps(props: IProps) {
  return Boolean(props.itemLength === 0 && props.isLoading);
}

class InfiniteScroller extends React.PureComponent<
  React.PropsWithChildren<IProps>,
  IState
> {
  public static defaultProps: Pick<IProps, DefaultPropKeys> = {
    element: "div",
    threshold: 400,
    loader: <DefaultLoader />,
    useInitialScroll: false,
  };

  public readonly state: IState = {
    scrollState: null,
  };

  private readonly scrollComponent = React.createRef<HTMLElement | null>();

  public componentDidMount() {
    this.moveToStartScroll();
  }

  public async componentDidUpdate(prevProps: IProps) {
    if (
      (isInitialLoadFromProps(prevProps) &&
        !isInitialLoadFromProps(this.props)) ||
      prevProps.identity !== this.props.identity
    ) {
      this.moveToStartScroll();
    }
  }

  public render() {
    const {
      children,
      element,
      loader,
      loadMore,
      threshold,
      itemLength,
    } = this.props;
    const childrenArray: React.ReactNode[] = [];
    const isInitialLoad = isInitialLoadFromProps(this.props);

    if (!isInitialLoad) {
      childrenArray.push(
        <ScrollPositionController
          key={"scroller"}
          scrollElement={this.getScrollElement()}
          itemLength={itemLength}
          scrollState={this.state.scrollState}
          resetScrollState={this.resetScrollState}
        >
          {children instanceof Function ? children() : children}
        </ScrollPositionController>,
      );
    }
    if (loader) {
      if (isInitialLoad) {
        childrenArray.push(<div key="loaderInit">{loader}</div>);
      } else {
        if (this.hasMoreBefore()) {
          childrenArray.unshift(
            <Loader
              key={"loader-before"}
              direction="before"
              hasScrollState={this.state.scrollState !== null}
              threshold={threshold}
              loader={loader}
              loadMore={loadMore}
              onInViewChange={this.handleInViewChange}
            />,
          );
        }

        if (this.hasMoreAfter()) {
          childrenArray.push(
            <Loader
              key={"loader-after"}
              direction="after"
              hasScrollState={this.state.scrollState !== null}
              loadMore={loadMore}
              threshold={threshold}
              loader={loader}
              onInViewChange={this.handleInViewChange}
            />,
          );
        }
      }
    }
    return React.createElement(
      element,
      {
        ref: this.scrollComponent,
      },
      childrenArray,
    );
  }

  public readonly getScrollingElement = () => this.getScrollElement();

  private readonly handleInViewChange = (direction: keyof Moim.IPaging) => {
    const scrollNode = this.getScrollElement();
    this.setState({
      scrollState: {
        direction,
        currentPosition: scrollNode.scrollHeight - scrollNode.scrollTop,
      },
    });
  };

  private readonly resetScrollState = () => {
    setTimeout(() => {
      this.setState({
        scrollState: null,
      });
    }, LOADING_TIME);
  };

  private readonly moveToStartScroll = () => {
    if (isBrowser()) {
      requestAnimationFrame(() => {
        const scrollElement = this.getScrollElement();
        if (this.props.useInitialScroll && !this.directionIsMultiple()) {
          scrollElement.scrollTop =
            this.hasMoreBefore() || this.props.reverse
              ? scrollElement.scrollHeight - scrollElement.scrollTop
              : 0;
        }
      });
    }
  };

  private readonly getScrollElement = (): HTMLElement =>
    memoizedGetScrollElement(this.scrollComponent.current);

  private readonly hasMoreBefore = () =>
    Boolean(this.props.paging && this.props.paging.before);

  private readonly hasMoreAfter = () =>
    Boolean(this.props.paging && this.props.paging.after);

  private readonly directionIsMultiple = () =>
    this.hasMoreAfter() && this.hasMoreBefore();
}

export default React.memo(InfiniteScroller);
export { InfiniteScroller as PureInfiniteScroller };
