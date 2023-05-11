import * as React from "react";
import { IProps } from "../";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useOpenState from "common/hooks/useOpenState";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useNotificationsDialog from "common/hooks/useNotificationsDialog";
import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import useVisibleMyCart from "app/modules/layout/components/topNavigation/hooks/useVisibleMyCart";
import { currentGroupSelector } from "app/selectors/app";
import { moimStatSelector } from "app/selectors/stat";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { redirect } = useNativeSecondaryView();
  const isMobile = useIsMobile();
  const notiButtonRef = React.useRef<HTMLButtonElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const {
    isOpen: isOpenProfileMenu,
    open: openProfileMenu,
    close: closeProfileMenu,
  } = useOpenState();
  const { collapseSideNavigation } = useSideNavigationPanel();
  const { openNotificationsDialog } = useNotificationsDialog();
  const visibleMyCartIcon = useVisibleMyCart();

  const { notiCount } = useStoreState(state => {
    const currentGroup = currentGroupSelector(state);
    const statId = currentGroup?.is_hub
      ? currentGroup.id
      : currentGroup?.parent;
    return {
      notiCount: moimStatSelector(state, statId ?? "")?.root_list_count ?? 0,
    };
  });

  return {
    ...props,
    isMobile,
    notiCount,
    visibleMyCartIcon,
    collapseSideNavigation,
    redirect,
    notiButtonRef,
    wrapperRef,
    isOpenProfileMenu,
    openProfileMenu,
    closeProfileMenu,
    openNotificationsDialog,
  };
}
