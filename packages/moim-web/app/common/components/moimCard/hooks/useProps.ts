import * as React from "react";
import { IProps } from "../";
import useCurrentUser from "common/hooks/useCurrentUser";
import useGroupTexts from "common/hooks/useGroupTexts";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps({ tags, ...props }: IProps) {
  const [titleShaveLine, setTitleShaveLine] = React.useState(2);
  const [descriptionShaveLine, setDescriptionShaveLine] = React.useState(1);
  const [maxTagVisibleCount, setMaxTagVisibleCount] = React.useState(10);
  const memberTexts = useGroupTexts("member");
  const joinedTexts = useGroupTexts("moim_card_joined");
  const exploreTexts = useGroupTexts("moim_card_explore");
  const titleRef = React.useRef<HTMLDivElement>(null);
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const tagRef = React.useRef<HTMLDivElement>(null);
  const currentUser = useCurrentUser();
  const visibleTags = React.useMemo(
    () => (tags ? tags.slice(0, maxTagVisibleCount) : []),
    [maxTagVisibleCount, tags],
  );
  const remainTagCount = tags ? tags.length - maxTagVisibleCount : 0;

  return {
    ...props,
    tags,
    joinedTexts,
    exploreTexts,
    memberTexts,
    titleShaveLine,
    setTitleShaveLine,
    descriptionShaveLine,
    setDescriptionShaveLine,
    maxTagVisibleCount,
    setMaxTagVisibleCount,
    titleRef,
    descriptionRef,
    tagRef,
    currentUser,
    visibleTags,
    remainTagCount,
  };
}
