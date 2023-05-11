import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { useInView } from "react-intersection-observer";
import PositionChip from "common/components/chips/preset/positionChip";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import {
  MAX_HEIGHT,
  Wrapper,
  PositionListWrapper,
  PositionCell,
} from "./styledComponents";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";

interface IProps {
  positions: Moim.Position.IPosition[];
  onClickMore(): void;
}

const Positions: React.FC<IProps> = ({ positions, onClickMore }) => {
  const [visibleCount, setVisibleCount] = React.useState(positions.length);
  const [showMoreButton, setShowMoreButton] = React.useState(false);
  const { redirect } = useNativeSecondaryView();
  const [refMoreButton, moreButtonInView] = useInView({
    threshold: 1,
  });

  const handleClickPosition: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      const positionId = e.currentTarget.dataset.positionId;
      if (positionId) {
        redirect(
          new MoimURL.PositionMembers({
            positionId,
          }).toString(),
        );
      }
    },
    [redirect],
  );

  const handleResize = React.useCallback((_width, height) => {
    setShowMoreButton(height >= MAX_HEIGHT);
  }, []);

  const positionElements = React.useMemo(() => {
    if (
      positions.length &&
      positions.every(position => position === undefined)
    ) {
      return (
        <>
          <PositionCell key={"position_skeleton_1"}>
            <SkeletonBox width={px2rem(45)} height={px2rem(18)} />
          </PositionCell>
          <PositionCell key={"position_skeleton_2"}>
            <SkeletonBox width={px2rem(86)} height={px2rem(18)} />
          </PositionCell>
        </>
      );
    }

    const elements = positions.slice(0, visibleCount).map(
      position =>
        position && (
          <PositionCell
            key={position.id}
            data-position-id={position.id}
            onClick={handleClickPosition}
          >
            <PositionChip
              id={position.id}
              name={position.name}
              size="small"
              color={position.color}
              maxContentWidth={270}
            />
          </PositionCell>
        ),
    );
    if (showMoreButton) {
      elements.push(
        <PositionCell
          role="button"
          key="more_positions"
          ref={refMoreButton}
          onClick={onClickMore}
        >
          <PositionChip
            id="delete"
            name="..."
            size="medium"
            color="#AEB8BD"
            maxContentWidth={270}
          />
        </PositionCell>,
      );
    }
    return elements;
  }, [
    handleClickPosition,
    onClickMore,
    positions,
    refMoreButton,
    showMoreButton,
    visibleCount,
  ]);

  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (showMoreButton && visibleCount !== 0) {
        if (!moreButtonInView) {
          setVisibleCount(visibleCount - 1);
        }
      }
    });
  }, [moreButtonInView, showMoreButton, visibleCount]);

  return (
    <Wrapper>
      <PositionListWrapper>
        <ReactResizeDetector handleHeight={true} onResize={handleResize}>
          {positionElements}
        </ReactResizeDetector>
      </PositionListWrapper>
    </Wrapper>
  );
};

export default Positions;
