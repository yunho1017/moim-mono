import * as React from "react";
import { useIntl } from "react-intl";
import { IProps } from ".";
// helper
import { MoimURL } from "common/helpers/url";
// hooks
import useOpenState from "common/hooks/useOpenState";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useNewDirectMessageDialog from "common/hooks/useNewDirectMessageDialog";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useStoreState } from "app/store";

import { blockedUserSelector } from "app/selectors/app";

export function useProps(props: IProps) {
  const { type, userId } = props;
  const {
    isOpen: isOpenMoreMenu,
    open: handleOpenMoreMenu,
    close: handleCloseMoreMenu,
  } = useOpenState();
  const {
    isOpen: isOpenContentsBoxMenu,
    open: handleOpenContentsBoxMenu,
    close: onCloseContentsBoxMenu,
  } = useOpenState();
  const { blockedUser } = useStoreState(state => ({
    blockedUser: blockedUserSelector(state, userId),
  }));
  const refMoreButton = React.useRef<HTMLDivElement>(null);
  const refContentsBoxButton = React.useRef<HTMLDivElement>(null);
  const intl = useIntl();
  const isMobile = useIsMobile();
  const avatarSize: Moim.DesignSystem.Size = React.useMemo(
    () => (type === "show" ? "xl" : "l"),
    [type],
  );
  const currentUser = useCurrentUser();
  const containerBottomPadSize = React.useMemo(
    () => (type === "show" ? 32 : 16),
    [type],
  );

  const isMyProfile = React.useMemo(() => userId === currentUser?.id, [
    userId,
    currentUser,
  ]);

  return {
    ...props,
    blockedUser,
    refMoreButton,
    refContentsBoxButton,
    intl,
    isMobile,
    isMyProfile,
    avatarSize,
    containerBottomPadSize,
    isOpenMoreMenu,
    currentUser,
    handleOpenMoreMenu,
    handleCloseMoreMenu,
    isOpenContentsBoxMenu,
    handleOpenContentsBoxMenu,
    onCloseContentsBoxMenu,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    type,
    userId,
    isMobile,
    onCloseRequest,
    onCloseContentsBoxMenu,
  } = props;
  const {
    isExpanded: sideNavigationExpanded,
    collapseSideNavigation,
  } = useSideNavigationPanel();
  const {
    redirect,
    close: handleCloseSecondaryView,
  } = useNativeSecondaryView();
  const { handleCreateDirectMessage } = useNewDirectMessageDialog();
  const openProfileSecondaryPanel = React.useCallback(() => {
    redirect(new MoimURL.Members({ userId }).toString());
  }, [redirect, userId]);

  const doCloseRequest = React.useCallback(() => {
    if (type === "preview") {
      onCloseRequest?.();
    } else {
      handleCloseSecondaryView();
    }
  }, [type, onCloseRequest, handleCloseSecondaryView]);

  const handleProfileShowOpenClick = React.useCallback(() => {
    openProfileSecondaryPanel();
    doCloseRequest();
    if (sideNavigationExpanded) {
      collapseSideNavigation();
    }
  }, [
    doCloseRequest,
    collapseSideNavigation,
    openProfileSecondaryPanel,
    sideNavigationExpanded,
  ]);

  const handleDirectMessageClick = React.useCallback(() => {
    handleCreateDirectMessage([userId]);
    if (type === "preview" || isMobile) {
      doCloseRequest();
    }
  }, [doCloseRequest, handleCreateDirectMessage, isMobile, type, userId]);

  const handleClickAvatar = React.useCallback(() => {
    if (type === "preview") {
      handleProfileShowOpenClick();
    }
  }, [handleProfileShowOpenClick, type]);

  const handleCloseContentsBoxMenu = React.useCallback(() => {
    onCloseContentsBoxMenu();
    if (type === "preview") {
      onCloseRequest?.();
    }
  }, [onCloseRequest, type, onCloseContentsBoxMenu]);

  return {
    ...props,
    handleClickAvatar,
    handleProfileShowOpenClick,
    handleDirectMessageClick,
    handleCloseContentsBoxMenu,
  };
}
