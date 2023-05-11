import * as React from "react";
import { ScreenShare } from "amazon-chime-sdk-component-library-react";
import { px2rem } from "app/common/helpers/rem";
import useOpenState from "common/hooks/useOpenState";
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
import VideoIcon from "../videoIcon";
import { Wrapper, Left, Right, Name, IconWrapper, MoreIcon } from "./styled";

export interface RosterCellProps {
  isHost: boolean;
  isMine: boolean;
  name: string;
  className?: string;
  muted?: boolean;
  videoEnabled?: boolean;
  hostDisabledVideo?: boolean;
  sharingContent?: boolean;
  microphone?: React.ReactNode;
  menuTexts?: {
    toggleMic: string;
    toggleVideo: string;
    makeHost: string;
    pinVideo: string;
  };
  onClickMenuToggleMic?(): void;
  onClickMenuToggleVideo?(): void;
  onClickMenuMakeHost?(): void;
  onClickMenuPinVideo?(): void;
}

const RosterCell: React.FC<RosterCellProps> = ({
  isHost,
  name,
  className,
  microphone,
  videoEnabled,
  sharingContent,
  hostDisabledVideo,
  menuTexts,
  onClickMenuToggleMic,
  onClickMenuToggleVideo,
  onClickMenuPinVideo,
}) => {
  const menuRef = React.useRef<HTMLDivElement>(null);

  const {
    isOpen: isMenuOpen,
    open: handleMenuOpen,
    close: handleCloseMenu,
  } = useOpenState();

  const videoIcon = React.useMemo(() => {
    if (sharingContent) {
      return (
        <ScreenShare
          width={px2rem(18)}
          height={px2rem(18)}
          viewBox="0 0 18 18"
        />
      );
    }

    if (typeof videoEnabled === "boolean") {
      return (
        <VideoIcon enabled={videoEnabled} hostDisabled={hostDisabledVideo} />
      );
    }

    return null;
  }, [sharingContent, hostDisabledVideo, videoEnabled]);

  const handleClickMenu = React.useCallback(() => {
    handleMenuOpen();
  }, [handleMenuOpen]);

  const handleClickToggleMic = React.useCallback(() => {
    onClickMenuToggleMic?.();
    handleCloseMenu();
  }, [handleCloseMenu, onClickMenuToggleMic]);

  const handleClickToggleVideo = React.useCallback(() => {
    onClickMenuToggleVideo?.();
    handleCloseMenu();
  }, [handleCloseMenu, onClickMenuToggleVideo]);

  const handleClickPinVideo = React.useCallback(() => {
    onClickMenuPinVideo?.();
    handleCloseMenu();
  }, [handleCloseMenu, onClickMenuPinVideo]);

  // TBD
  // const handleClickMakeHost = React.useCallback(() => {
  //   if (isHost) {
  //     onClickMenuMakeHost?.();
  //     handleCloseMenu();
  //   }
  // }, [isHost, handleCloseMenu, onClickMenuMakeHost]);

  return (
    <Wrapper className={className}>
      <Left>
        <Name>{name}</Name>
      </Left>
      <Right>
        <IconWrapper
          role={isHost ? "button" : undefined}
          key="rosterCell_indicator_icon_microphone"
          onClick={handleClickToggleMic}
        >
          {microphone}
        </IconWrapper>
        <IconWrapper
          role={isHost ? "button" : undefined}
          key="rosterCell_indicator_icon_video"
          onClick={handleClickToggleVideo}
        >
          {videoIcon}
        </IconWrapper>
        {isHost && (
          <IconWrapper
            ref={menuRef}
            role="button"
            key="rosterCell_indicator_icon_menu"
            onClick={handleClickMenu}
          >
            <MoreIcon />
          </IconWrapper>
        )}
      </Right>
      <ResponsiveMenu
        open={isMenuOpen}
        anchorElement={menuRef.current}
        onCloseRequest={handleCloseMenu}
      >
        <MenuWrapper>
          <MenuItem
            key="attendee_menu_toggle_mic"
            onClick={handleClickToggleMic}
          >
            {menuTexts?.toggleMic}
          </MenuItem>
          <MenuItem
            key="attendee_menu_toggle_camera"
            onClick={handleClickToggleVideo}
          >
            {menuTexts?.toggleVideo}
          </MenuItem>
          <MenuItem key="attendee_menu_pin_video" onClick={handleClickPinVideo}>
            {menuTexts?.pinVideo}
          </MenuItem>
          {/* <MenuItem
              key="attendee_menu_make_host"
              onClick={handleClickMakeHost}
            >
              {menuTexts?.makeHost}
            </MenuItem> */}
        </MenuWrapper>
      </ResponsiveMenu>
    </Wrapper>
  );
};

export default RosterCell;
