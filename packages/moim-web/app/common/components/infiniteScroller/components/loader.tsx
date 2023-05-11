import * as React from "react";
import memoize from "lodash/memoize";
import styled, { css } from "styled-components";
import { InView } from "react-intersection-observer";

interface IProps {
  direction: keyof Moim.IPaging;
  hasScrollState: boolean;
  loader: React.ReactNode;
  threshold: number;
  loadMore: (pagingKey: keyof Moim.IPaging) => any;
  onInViewChange: (direction: keyof Moim.IPaging) => void;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const Threshold = styled.div<{
  direction: keyof Moim.IPaging;
  threshold: number;
}>`
  position: absolute;
  height: ${props => `${props.threshold}px`};
  left: 0;
  right: 0;
  pointer-events: none;
  ${props => {
    if (props.direction === "before") {
      return css`
        top: 0;
      `;
    } else {
      return css`
        bottom: 0;
      `;
    }
  }};
`;

function getLoaderRootMargin(
  direction: keyof Moim.IPaging,
  threshold?: number,
) {
  return `${direction === "before" ? threshold : 0}px 0px ${
    direction === "after" ? threshold : 0
  }px`;
}

const memoizedGetLoaderRootMargin = memoize(getLoaderRootMargin);

class Loader extends React.PureComponent<React.PropsWithChildren<IProps>> {
  public componentDidUpdate(prevProps: IProps) {
    if (!prevProps.hasScrollState && this.props.hasScrollState) {
      this.props.loadMore(this.props.direction);
    }
  }

  public render() {
    const { direction, threshold, loader, hasScrollState } = this.props;

    if (hasScrollState) {
      return <div key={`loader__${direction}`}>{loader}</div>;
    }
    return (
      <InView
        key={`loader__${direction}`}
        onChange={this.handleInViewChange}
        triggerOnce={true}
        rootMargin={memoizedGetLoaderRootMargin(direction, threshold)}
      >
        <Wrapper>
          <Threshold direction={direction} threshold={threshold!} />
          {loader}
        </Wrapper>
      </InView>
    );
  }

  private readonly handleInViewChange = (inView: boolean) => {
    const { onInViewChange, direction, hasScrollState } = this.props;
    if (inView && !hasScrollState) {
      onInViewChange(direction);
    }
  };
}

export default Loader;
