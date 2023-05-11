import * as React from "react";
import { IHookProps } from "./useProps";

const TITLE_LINE_HEIGHT = 22;

export function useEffects(hookProps: IHookProps) {
  const {
    title,
    titleRef,
    tags,
    setTitleShaveLine,
    description,
    setDescriptionShaveLine,
  } = hookProps;

  React.useLayoutEffect(() => {
    const isTitleOverThenOneLine = Boolean(
      title &&
        titleRef.current &&
        titleRef.current?.offsetHeight > TITLE_LINE_HEIGHT,
    );
    if (title) {
      if (!tags && isTitleOverThenOneLine) {
        setTitleShaveLine(2);
      } else {
        setTitleShaveLine(1);
      }
    } else {
      setTitleShaveLine(0);
    }
    if (description) {
      if (tags || isTitleOverThenOneLine) {
        setDescriptionShaveLine(1);
      } else {
        // TODO: 한글 문제 때문에 2줄임에도 3줄로 보이는 문제 때문에 1줄로 바꿈
        setDescriptionShaveLine(1);
      }
    } else {
      setDescriptionShaveLine(0);
    }
  }, [
    title,
    description,
    tags,
    titleRef,
    setTitleShaveLine,
    setDescriptionShaveLine,
  ]);
}
