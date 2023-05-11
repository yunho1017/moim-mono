import * as React from "react";
import { IProps } from "..";
import makeShareUrl from "common/helpers/makeShareUrl";
import { MoimURL } from "common/helpers/url";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { forumId } = props;
  const [menuWrapperHeight, setMenuWrapperHeight] = React.useState<
    number | undefined
  >(undefined);
  const shareUrl = React.useMemo(
    () => makeShareUrl(new MoimURL.Forum({ forumId }).toString()),
    [forumId],
  );
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuWrapperRef = React.useRef<HTMLUListElement>(null);
  const { redirect } = useNativeSecondaryView();

  React.useLayoutEffect(() => {
    setMenuWrapperHeight(
      menuWrapperRef.current ? menuWrapperRef.current.clientHeight : undefined,
    );
  }, [menuWrapperRef]);

  return {
    ...props,
    shareUrl,
    isOpenMenu,
    setIsOpenMenu,
    buttonRef,
    menuWrapperRef,
    menuWrapperHeight,
    redirect,
  };
}
