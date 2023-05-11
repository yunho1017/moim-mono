import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";

import PositionChip from "common/components/chips/preset/positionChip";

import { useStoreState } from "app/store";
import { px2rem } from "common/helpers/rem";

const StyledPositionChip = styled(PositionChip)`
  & + & {
    margin-left: ${px2rem(4)};
  }
`;

const PositionChipsWrapper = styled.div`
  margin-left: ${px2rem(4)};
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div<{
  elementAlign?: "left" | "right";
  wrapperOverrideStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${props =>
    props.elementAlign === "right"
      ? css`
          flex-direction: row-reverse;
          ${PositionChipsWrapper} {
            margin-left: 0;
            margin-right: ${px2rem(4)};
          }
        `
      : null};

  ${props => props.wrapperOverrideStyle}
`;

const ChipComponent = React.memo(
  ({
    positionId,
    chipMaxWidth,
  }: {
    positionId: string;
    chipMaxWidth?: number;
  }) => {
    const position = useStoreState(
      state => state.entities.positions[positionId],
    );
    if (!position) {
      return null;
    }
    return (
      <StyledPositionChip
        key={`position_${position.id}`}
        id={position.id}
        size="small"
        color={position.color}
        name={position.name}
        maxContentWidth={chipMaxWidth}
      />
    );
  },
);

interface IProps {
  positions: Moim.Id[];
  hasPositionChip?: boolean;
  chipMaxWidth?: number;
  elementAlign?: "left" | "right";
  displayChipLimit?: number;
  wrapperOverrideStyle?: FlattenInterpolation<any>;
}

export default function WithPositionChip({
  positions,
  hasPositionChip = true,
  elementAlign,
  chipMaxWidth,
  children,
  displayChipLimit = 1,
  wrapperOverrideStyle,
}: React.PropsWithChildren<IProps>) {
  const sortedPositions = useStoreState(state =>
    positions
      .map(position => state.entities.positions[position])
      .filter(position => Boolean(position))
      .sort((prev, next) => next.priority - prev.priority),
  );
  const positionChipElement = React.useMemo(() => {
    if (hasPositionChip && sortedPositions.length > 0) {
      const chips = sortedPositions
        .filter(i => Boolean(i))
        .slice(0, displayChipLimit)
        .map(position => (
          <ChipComponent positionId={position.id} chipMaxWidth={chipMaxWidth} />
        ));
      return <PositionChipsWrapper>{chips}</PositionChipsWrapper>;
    }

    return null;
  }, [sortedPositions, hasPositionChip, displayChipLimit, chipMaxWidth]);

  return (
    <Wrapper
      elementAlign={elementAlign}
      wrapperOverrideStyle={wrapperOverrideStyle}
    >
      {children}
      {positionChipElement}
    </Wrapper>
  );
}
