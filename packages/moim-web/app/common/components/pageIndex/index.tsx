import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import usePrevious from "common/hooks/usePrevious";
import {
  Wrapper,
  IndexBox,
  ArrowButton,
  RightArrow,
  LeftArrow,
} from "./styled";

interface IProps {
  pageSize: number;
  totalItemSize: number;
  onChangeIndex(index: number): void;
}

const PageIndex: React.FC<IProps> = ({
  pageSize,
  totalItemSize,
  onChangeIndex,
}) => {
  const isMobile = useIsMobile();
  const indexWindowSize = isMobile ? 6 : 10;
  const [currIdx, setCurrIdx] = React.useState(0);
  const prevIndex = usePrevious(currIdx);
  const maxIndex = Math.ceil(totalItemSize / pageSize);

  const isFirstIndex = React.useMemo(() => currIdx === 0, [currIdx]);
  const isEndIndex = React.useMemo(() => currIdx === maxIndex, [
    currIdx,
    maxIndex,
  ]);

  const handleClickPrev = React.useCallback(() => {
    if (!isFirstIndex) {
      setCurrIdx(currIdx - 1);
    }
  }, [currIdx, isFirstIndex]);
  const handleClickNext = React.useCallback(() => {
    if (!isEndIndex) {
      setCurrIdx(currIdx + 1);
    }
  }, [currIdx, isEndIndex]);

  const handleClickPosition: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      const pos = parseInt(e.currentTarget.dataset.index || "-1", 10);
      if (pos >= 0) {
        setCurrIdx(pos);
      }
    },
    [],
  );

  const elements = React.useMemo(() => {
    const flattenIndex = currIdx % Math.min(maxIndex, indexWindowSize);
    const toLeft = Math.abs(0 - flattenIndex);
    const toRight = Math.abs(
      flattenIndex - Math.min(maxIndex, indexWindowSize),
    );
    const numbers: React.ReactNode[] = [];

    for (let i = toLeft; i > 0; i--) {
      numbers.push(
        <IndexBox
          selected={false}
          data-index={currIdx - i}
          onClick={handleClickPosition}
        >
          {currIdx + 1 - i}
        </IndexBox>,
      );
    }
    numbers.push(
      <IndexBox
        selected={true}
        data-index={currIdx}
        onClick={handleClickPosition}
      >
        {currIdx + 1}
      </IndexBox>,
    );
    for (let i = 1; i < toRight; i++) {
      numbers.push(
        <IndexBox
          selected={false}
          data-index={currIdx + i}
          onClick={handleClickPosition}
        >
          {currIdx + 1 + i}
        </IndexBox>,
      );
    }

    return numbers;
  }, [currIdx, handleClickPosition, indexWindowSize, maxIndex]);

  React.useLayoutEffect(() => {
    if (prevIndex !== undefined && prevIndex !== currIdx) {
      onChangeIndex(currIdx);
    }
  }, [onChangeIndex, prevIndex, currIdx]);

  return (
    <Wrapper>
      {maxIndex >= indexWindowSize && (
        <ArrowButton disable={isFirstIndex} onClick={handleClickPrev}>
          <LeftArrow disable={isFirstIndex} />
        </ArrowButton>
      )}
      {elements}
      {maxIndex >= indexWindowSize && (
        <ArrowButton disable={isEndIndex} onClick={handleClickNext}>
          <RightArrow disable={isEndIndex} />
        </ArrowButton>
      )}
    </Wrapper>
  );
};

export default PageIndex;
