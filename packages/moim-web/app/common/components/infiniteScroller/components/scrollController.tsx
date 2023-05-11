import * as React from "react";

export interface IScrollState {
  direction: keyof Moim.IPaging;
  currentPosition: number;
}
interface IProps {
  scrollElement: HTMLElement | null;
  itemLength: number;
  scrollState: IScrollState | null;
  resetScrollState(): void;
}

class ScrollPositionController extends React.PureComponent<
  React.PropsWithChildren<IProps>
> {
  public componentDidUpdate(prevProps: IProps) {
    const {
      scrollElement,
      itemLength,
      scrollState,
      resetScrollState,
    } = this.props;
    if (prevProps.itemLength !== itemLength && scrollElement && scrollState) {
      if (scrollState.direction === "before") {
        requestAnimationFrame(() => {
          scrollElement.scrollTop =
            scrollElement.scrollHeight - scrollState.currentPosition;
        });
      }
      resetScrollState();
    }
  }

  public render() {
    return <>{this.props.children}</>;
  }
}

export default ScrollPositionController;
