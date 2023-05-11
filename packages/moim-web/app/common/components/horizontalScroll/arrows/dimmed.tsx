import * as React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useLeftArrowDisabled, useRightArrowDisabled } from "./hooks";
import {
  ArrowBox,
  InnerArrowContainer,
  LeftIconResource,
  RightIconResource,
  InnerRightIconContainer,
  InnerLeftIconContainer,
  LeftDim,
  RightDim,
} from "./styled";

interface IProps {
  dimWidth?: number;
  dimHeight?: number;
}

export const DimmedRightArrow: React.FC<IProps> = ({ dimWidth, dimHeight }) => {
  const { scrollNext } = React.useContext(VisibilityContext);
  const disabled = useRightArrowDisabled();
  const handleClick = React.useCallback(() => {
    scrollNext();
  }, [scrollNext]);

  if (disabled) {
    return null;
  }

  return (
    <InnerArrowContainer>
      <RightDim dimWidth={dimWidth} dimHeight={dimHeight} />
      <InnerRightIconContainer>
        <ArrowBox role="button" disabled={disabled} onClick={handleClick}>
          <RightIconResource />
        </ArrowBox>
      </InnerRightIconContainer>
    </InnerArrowContainer>
  );
};

export const DimmedLeftArrow: React.FC<IProps> = ({ dimWidth, dimHeight }) => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  const disabled = useLeftArrowDisabled();
  const handleClick = React.useCallback(() => {
    scrollPrev();
  }, [scrollPrev]);

  if (disabled) {
    return null;
  }

  return (
    <InnerArrowContainer>
      <LeftDim dimWidth={dimWidth} dimHeight={dimHeight} />
      <InnerLeftIconContainer>
        <ArrowBox role="button" disabled={disabled} onClick={handleClick}>
          <LeftIconResource />
        </ArrowBox>
      </InnerLeftIconContainer>
    </InnerArrowContainer>
  );
};
