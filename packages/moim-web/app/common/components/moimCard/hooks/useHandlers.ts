import * as React from "react";
import { IHookProps } from "./useProps";
import { isBrowser } from "common/helpers/envChecker";

export type IHookHandlers = ReturnType<typeof useHandlers>;

const LABEL_GAP = 4;
const REMAINING_TAG_COUNT_WIDTH = 35;

export function useHandlers(hookProps: IHookProps) {
  const {
    domain,
    moimId,
    tagRef,
    setMaxTagVisibleCount,
    onClickVisitButton,
    onClickJoinButton,
  } = hookProps;

  const handleVisitClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
    event => {
      event.stopPropagation();
      onClickVisitButton?.();
    },
    [onClickVisitButton],
  );

  const handleJoinClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
    event => {
      event.stopPropagation();
      onClickJoinButton?.(domain || "", moimId);
    },
    [domain, moimId, onClickJoinButton],
  );

  const calculateVisibleLabelCount = React.useCallback(
    (width: number) => {
      const wrapper = tagRef.current;
      if (isBrowser() && wrapper) {
        requestAnimationFrame(() => {
          let index = 0;
          let accumulateChildWidth = 0;
          for (const node of Array.from(wrapper.children)) {
            const childrenNodeWidth = node.getBoundingClientRect().width;
            if (
              accumulateChildWidth + childrenNodeWidth <
              width - REMAINING_TAG_COUNT_WIDTH
            ) {
              index++;
              accumulateChildWidth += childrenNodeWidth + LABEL_GAP;
            } else {
              setMaxTagVisibleCount(index);
              break;
            }
          }
        });
      }
    },
    [setMaxTagVisibleCount, tagRef],
  );

  return {
    handleVisitClick,
    handleJoinClick,
    calculateVisibleLabelCount,
  };
}
