import * as React from "react";
import { createPortal } from "react-dom";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useLeftArrowDisabled, useRightArrowDisabled } from "./hooks";
import {
  ArrowBox,
  PortalArrowContainer,
  LeftIconResource,
  RightIconResource,
} from "./styled";

interface IProps {
  targetId: string;
}

export const PortalRightArrow: React.FC<IProps> = ({ targetId }) => {
  const { scrollNext } = React.useContext(VisibilityContext);
  const disabled = useRightArrowDisabled();
  const handleClick = React.useCallback(() => {
    scrollNext();
  }, [scrollNext]);

  return createPortal(
    <PortalArrowContainer>
      <ArrowBox role="button" disabled={disabled} onClick={handleClick}>
        <RightIconResource />
      </ArrowBox>
    </PortalArrowContainer>,
    document.getElementById(targetId) ?? document.body,
  );
};

export const PortalLeftArrow: React.FC<IProps> = ({ targetId }) => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  const disabled = useLeftArrowDisabled();
  const handleClick = React.useCallback(() => {
    scrollPrev();
  }, [scrollPrev]);

  return createPortal(
    <PortalArrowContainer>
      <ArrowBox role="button" disabled={disabled} onClick={handleClick}>
        <LeftIconResource />
      </ArrowBox>
    </PortalArrowContainer>,
    document.getElementById(targetId) ?? document.body,
  );
};
