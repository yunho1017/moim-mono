import * as React from "react";
import styled, { css } from "styled-components";

import PositionChip from "common/components/chips/preset/positionChip";

import { px2rem } from "common/helpers/rem";

const chipStyle = css`
  & + & {
    margin-left: ${px2rem(4)};
  }
`;

const PositionChipsWrapper = styled.div`
  margin-left: ${px2rem(4)};
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div<{ elementAlign?: "left" | "right" }>`
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
`;

interface IProps {
  positions: Moim.Position.IPosition[];
  hasPositionChip?: boolean;
  chipMaxWidth?: number;
  elementAlign?: "left" | "right";
  displayChipLimit?: number;
}

export default function WithPositionChip({
  positions,
  hasPositionChip = true,
  elementAlign,
  chipMaxWidth,
  children,
  displayChipLimit = 1,
}: React.PropsWithChildren<IProps>) {
  const positionChipElement = React.useMemo(() => {
    const sortedPositions = positions.sort(
      (prev, next) => next.priority - prev.priority,
    );
    if (hasPositionChip && sortedPositions.length > 0) {
      const chips = sortedPositions
        .filter(i => Boolean(i))
        .slice(0, displayChipLimit)
        .map(
          position =>
            position && (
              <PositionChip
                key={`position_${position.id}`}
                id={position.id}
                size="small"
                color={position.color}
                name={position.name}
                maxContentWidth={chipMaxWidth}
                overrideStyle={chipStyle}
              />
            ),
        );
      return <PositionChipsWrapper>{chips}</PositionChipsWrapper>;
    }

    return null;
  }, [positions, hasPositionChip, displayChipLimit, chipMaxWidth]);

  return (
    <Wrapper elementAlign={elementAlign}>
      {children}
      {positionChipElement}
    </Wrapper>
  );
}
