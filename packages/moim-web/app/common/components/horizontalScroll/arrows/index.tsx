import * as React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useLeftArrowDisabled, useRightArrowDisabled } from "./hooks";
import {
  ArrowBox,
  InnerArrowContainer,
  InnerLeftIconContainer,
  InnerRightIconContainer,
  LeftIconResource,
  RightIconResource,
} from "./styled";

export { DimmedLeftArrow, DimmedRightArrow } from "./dimmed";
export { PortalRightArrow, PortalLeftArrow } from "./portal";

export const InnerRightArrow = () => {
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
      <InnerRightIconContainer>
        <ArrowBox role="button" disabled={disabled} onClick={handleClick}>
          <RightIconResource />
        </ArrowBox>
      </InnerRightIconContainer>
    </InnerArrowContainer>
  );
};

export const InnerLeftArrow = () => {
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
      <InnerLeftIconContainer>
        <ArrowBox role="button" disabled={disabled} onClick={handleClick}>
          <LeftIconResource />
        </ArrowBox>
      </InnerLeftIconContainer>
    </InnerArrowContainer>
  );
};

export const NormalRightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  const disabled = useRightArrowDisabled();
  const handleClick = React.useCallback(() => {
    scrollNext();
  }, [scrollNext]);

  return (
    <ArrowBox
      role="button"
      disabled={disabled}
      marginLeft={8}
      onClick={handleClick}
    >
      <RightIconResource />
    </ArrowBox>
  );
};

export const NormalLeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  const disabled = useLeftArrowDisabled();
  const handleClick = React.useCallback(() => {
    scrollPrev();
  }, [scrollPrev]);

  return (
    <ArrowBox role="button" disabled={disabled} onClick={handleClick}>
      <LeftIconResource />
    </ArrowBox>
  );
};
