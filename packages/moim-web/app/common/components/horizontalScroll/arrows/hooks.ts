import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export const useRightArrowDisabled = () => {
  const { items } = React.useContext(VisibilityContext);

  return Boolean(items.last()?.visible);
};

export const useLeftArrowDisabled = () => {
  const { items } = React.useContext(VisibilityContext);

  return Boolean(items.first()?.visible);
};
