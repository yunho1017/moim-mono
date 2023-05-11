import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import { ScrollRestoreContext } from "common/helpers/scrollRestoreProvider";
import { noScrollBarStyle, useScrollStyle } from "../designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

const Wrapper = styled.div<{ overrideStyle?: FlattenInterpolation<any> }>`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle}
    ${noScrollBarStyle}
  }
  ${props => props.overrideStyle}
`;

interface IProps {
  id: Moim.Id;
  overrideStyle?: FlattenInterpolation<any>;
}

const ScrollPositionSaveList: React.FC<IProps> = ({
  id,
  overrideStyle,
  children,
}) => {
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [restored, setRestored] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { storedScrolls, storeScrollPosition } = React.useContext(
    ScrollRestoreContext,
  );

  const handleScroll = React.useCallback(
    e => {
      storeScrollPosition(id, e.currentTarget.scrollTop);
    },
    [id, storeScrollPosition],
  );

  React.useLayoutEffect(() => {
    const top = storedScrolls[id];
    const elem = refScroll.current;
    if (!restored && top === 1) {
      // NOTE: 첫 스크롤시에 위글거리는 현상이 있어서 이를 회피하기 위해 추가.
      setRestored(true);
      return;
    }
    if (!restored && top && elem) {
      setRestored(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          elem.scrollTo({ left: 0, top });
        }, 50);
      });
    }
  }, [id, restored, storedScrolls]);

  return (
    <Wrapper
      ref={refScroll}
      onScroll={handleScroll}
      overrideStyle={overrideStyle}
      data-scroll-lock-scrollable
    >
      {children}
    </Wrapper>
  );
};

export default ScrollPositionSaveList;
