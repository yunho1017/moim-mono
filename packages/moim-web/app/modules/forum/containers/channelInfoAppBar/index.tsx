import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";

interface IProps {
  visibleTopTabNavigation?: boolean;
}

const ChannelInfoAppBar = ({ visibleTopTabNavigation }: IProps) => {
  const isMobile = useIsMobile();

  const forumId = useStoreState(state => state.forumData.currentForumId);

  if (!forumId || visibleTopTabNavigation) {
    return null;
  }
  return isMobile ? (
    <MobileHeader visibleTopTabNavigation={visibleTopTabNavigation} />
  ) : (
    <DesktopHeader />
  );
};

export default React.memo(ChannelInfoAppBar);
