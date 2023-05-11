import * as React from "react";
import { isBrowser } from "app/common/helpers/envChecker";
import { InView } from "react-intersection-observer";
import getParentScrollElement from "app/common/helpers/getParentScrollElement";
import getDocumentScrollElement from "common/helpers/getDocumentScrollElement";

import VirtualizedScroller from "./virtualizedScroller";

export { VirtualizedScroller };

interface IProps extends Omit<React.HTMLProps<HTMLElement>, "ref"> {
  children: React.ReactNode;
  loadMore: (pagingKey: keyof Moim.IPaging) => any;
  element: keyof React.ReactHTML;
  loader: React.ReactNode;
  useInitialScroll: boolean;
  itemLength: number;
  threshold: number;
  useCapture: boolean;
  identity?: string;
  paging?: Moim.IPaging;
  isLoading?: boolean;
  reverse?: boolean;
  ref?: React.RefObject<InfiniteScroller>;
}

interface IState {
  thresholdScroll: null | {
    direction: keyof Moim.IPaging;
    height: number;
    top: number;
  };
  scrollElement?: HTMLElement;
}

type DefaultPropKeys =
  | "element"
  | "threshold"
  | "useCapture"
  | "loader"
  | "useInitialScroll";

function hasMoreNormalizer(paging?: Moim.IPaging) {
  return Boolean(paging && (paging.after || paging.before));
}

function isInitialLoadFromProps(props: IProps) {
  return Boolean(props.itemLength === 0 && props.isLoading);
}

const LOADING_TIME = 1500;

export default class InfiniteScroller extends React.Component<IProps, IState> {
  public static defaultProps: Pick<IProps, DefaultPropKeys> = {
    element: "div",
    threshold: 400,
    useCapture: false,
    loader: null,
    useInitialScroll: false,
  };

  public readonly state: IState = {
    thresholdScroll: null,
    scrollElement: undefined,
  };

  private readonly scrollComponent = React.createRef<HTMLElement>();
  private scrollElement: HTMLElement | null = null;

  public componentDidMount() {
    this.moveToStartScroll();
  }

  public async componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (
      (isInitialLoadFromProps(prevProps) &&
        !isInitialLoadFromProps(this.props)) ||
      prevProps.identity !== this.props.identity
    ) {
      this.moveToStartScroll();
    }
    if (
      prevState.thresholdScroll === null &&
      this.state.thresholdScroll !== null
    ) {
      this.props.loadMore(this.state.thresholdScroll.direction);
    }
    const prevHasMore = hasMoreNormalizer(prevProps.paging);
    const currHasMore = hasMoreNormalizer(this.props.paging);
    if (
      (!prevHasMore && currHasMore) ||
      (this.state.thresholdScroll &&
        prevProps.itemLength !== this.props.itemLength)
    ) {
      this.handleDataLoadAfter();
    }
  }

  public render() {
    const {
      children,
      element,
      loader,
      loadMore,
      threshold,
      useCapture,
      paging: _var2,
      itemLength,
      useInitialScroll: _var3,
      isLoading: _var4,
      reverse,
      ...props
    } = this.props;
    const childrenArray: React.ReactNode[] = [];
    const isInitialLoad = isInitialLoadFromProps(this.props);

    if (!isInitialLoad) {
      childrenArray.push(children instanceof Function ? children() : children);
    }
    if (loader) {
      if (isInitialLoad) {
        childrenArray.push(<div key="loaderInit">{loader}</div>);
      } else {
        if (this.hasMoreBefore()) {
          childrenArray.unshift(
            <React.Fragment key="beforeLoader">
              {this.renderLoaderBefore()}
            </React.Fragment>,
          );
        }
        if (this.hasMoreAfter()) {
          childrenArray.push(
            <React.Fragment key="afterLoader">
              {this.renderLoaderAfter()}
            </React.Fragment>,
          );
        }
      }
    }
    return React.createElement(
      element,
      { ...props, ref: this.scrollComponent },
      childrenArray,
    );
  }

  private readonly handleDataLoadAfter = () => {
    if (
      this.state.thresholdScroll &&
      this.state.thresholdScroll.direction === "before" &&
      isBrowser()
    ) {
      const { top, height } = this.state.thresholdScroll;
      const scrollNode = this.getScrollElement();
      requestAnimationFrame(() => {
        const diffScrollHeight = scrollNode.scrollHeight - height;
        const diffScrollTop = scrollNode.scrollTop - top;
        const positionTop = diffScrollHeight + diffScrollTop;
        scrollNode.scrollTop = positionTop > 0 ? positionTop : diffScrollHeight;
      });
    }
    setTimeout(() => {
      this.setState({
        thresholdScroll: null,
      });
    }, LOADING_TIME);
  };

  private readonly createRenderLoader = (direction: keyof Moim.IPaging) => {
    const handleChange = (visible: boolean) => {
      if (visible) {
        this.handleSetState(direction);
      }
    };
    const keyName = `loader__${direction}`;
    return () => {
      const { itemLength, threshold, loader } = this.props;
      const { scrollElement, thresholdScroll } = this.state;
      const isLoading = Boolean(
        (!scrollElement || thresholdScroll) && itemLength,
      );
      const useWindow = !getParentScrollElement(this.scrollComponent.current);
      return isLoading ? (
        <div key={keyName}>{loader}</div>
      ) : (
        <InView
          key={keyName}
          root={useWindow ? null : scrollElement}
          onChange={handleChange}
          triggerOnce={true}
          rootMargin={`${direction === "before" ? threshold : 0}px 0px ${
            direction === "after" ? threshold : 0
          }px`}
        >
          {Boolean(direction === "before" && threshold && !useWindow) && (
            <div style={{ height: threshold }} />
          )}
          {loader}
          {Boolean(direction === "after" && threshold && !useWindow) && (
            <div style={{ height: threshold }} />
          )}
        </InView>
      );
    };
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly renderLoaderBefore = this.createRenderLoader("before");

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly renderLoaderAfter = this.createRenderLoader("after");

  private readonly handleSetState = (direction: keyof Moim.IPaging) => {
    const scrollNode = this.getScrollElement();
    this.setState({
      thresholdScroll: {
        direction,
        height: scrollNode.scrollHeight,
        top: scrollNode.scrollTop,
      },
    });
  };

  private readonly moveToStartScroll = () => {
    if (isBrowser()) {
      requestAnimationFrame(() => {
        const scrollElement = this.getScrollElement();
        if (this.props.useInitialScroll && !this.directionIsMultiple()) {
          scrollElement.scrollTop =
            this.hasMoreBefore() || this.props.reverse
              ? scrollElement.scrollHeight - scrollElement.offsetHeight
              : 0;
        }
        setTimeout(() => {
          this.setState({
            scrollElement,
          });
        }, LOADING_TIME);
      });
    }
  };

  private readonly getScrollElement = (): HTMLElement => {
    if (this.scrollElement === null) {
      this.scrollElement = getDocumentScrollElement(
        this.scrollComponent.current,
      );
    }

    return this.scrollElement;
  };

  private readonly hasMoreBefore = () =>
    Boolean(this.props.paging && this.props.paging.before);

  private readonly hasMoreAfter = () =>
    Boolean(this.props.paging && this.props.paging.after);

  private readonly directionIsMultiple = () =>
    this.hasMoreAfter() && this.hasMoreBefore();
}
