import React from "react";
import styled from "styled-components";
import PopupBannerCarousel from "./components/image";
import PopupBannerBottomButtons from "./components/buttons";
import { PopupBannerDialog } from "../basicResponsiveDialog/styled";

import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import { ActionCreators } from "./actions";
import { getPopupBannerNotShowingToday } from "./cookieHelper";
import { CURRENT_USER_KEY } from "common/constants/keys";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Component: React.FC = () => {
  const isMobile = useIsMobile();
  const { banner, currentUserId } = useStoreState(state => ({
    banner: state.popupBanner.banner,
    currentUserId:
      localStorage.getItem(CURRENT_USER_KEY) ?? state.app.currentUserId,
  }));
  const { clear } = useActions({
    clear: ActionCreators.clear,
  });

  const targetBannerImage = React.useMemo(
    () =>
      (isMobile ? banner?.contents : banner?.contents_web)?.filter(content =>
        currentUserId ? content.showSignedUser : content.showUnsignedUser,
      ),
    [isMobile, banner?.contents, banner?.contents_web, currentUserId],
  );

  React.useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return banner && targetBannerImage ? (
    <Wrapper>
      <PopupBannerCarousel bannerId={banner.id} contents={targetBannerImage} />
      <PopupBannerBottomButtons />
    </Wrapper>
  ) : null;
};

export default function PopupBanner() {
  const isMobile = useIsMobile();
  const {
    isOpen,
    activePopupBanner,
    currentUserId,
    isJoinDialogOpen,
  } = useStoreState(state => ({
    isOpen: state.popupBanner.open,
    activePopupBanner: state.promote.activePopupBanner,
    currentUserId:
      localStorage.getItem(CURRENT_USER_KEY) ?? state.app.currentUserId,
    isJoinDialogOpen: state.joinGroupDialog.open,
  }));
  const { close, open } = useActions({
    close: ActionCreators.close,
    open: ActionCreators.open,
  });

  React.useEffect(() => {
    if (
      activePopupBanner &&
      !getPopupBannerNotShowingToday(activePopupBanner.id, false) &&
      Boolean(
        (isMobile
          ? activePopupBanner?.contents
          : activePopupBanner?.contents_web
        )?.filter(content =>
          currentUserId ? content.showSignedUser : content.showUnsignedUser,
        ).length,
      )
    ) {
      open({
        banner: activePopupBanner,
      });
    }
  }, [activePopupBanner]);

  React.useEffect(() => {
    if (isOpen && isJoinDialogOpen) {
      close();
    }
  }, [isJoinDialogOpen, isOpen]);

  return (
    <PopupBannerDialog open={isOpen} onClose={close}>
      <Component />
    </PopupBannerDialog>
  );
}
