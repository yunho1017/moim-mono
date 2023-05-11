import * as React from "react";
import { useInView } from "react-intersection-observer";
import { isMobileAgent, isTablet } from "common/helpers/browserDetect";
import { VideoCallDisclaimerDialog } from "common/components/basicResponsiveDialog/styled";
import { useDeviceManager } from "app/modules/meeting/components/providers/deviceManager";
import ContentForPC from "./components/pc";
import ContentForMobile from "./components/mobile";
import useOpenState from "common/hooks/useOpenState";

export interface IRef {
  open(): void;
  close(): void;
}

export interface IProps {
  meetingName: string;
  onClickJoin(): void;
  onClickExit(): void;
}

const Disclaimer = React.forwardRef<IRef, IProps>(
  ({ meetingName, onClickJoin, onClickExit }, ref) => {
    const { isOpen, open, close } = useOpenState();
    const deviceManager = useDeviceManager();
    const { ref: refInViewTrigger, inView: isInView } = useInView({
      threshold: 1,
      triggerOnce: true,
    });
    const isMobile = React.useMemo(() => isMobileAgent() || isTablet(), []);

    const handleClose = React.useCallback(() => {
      close();
      deviceManager.dismissAlert();
    }, [deviceManager, close]);

    const handleJoinClick = React.useCallback(() => {
      if (deviceManager.isDeniedPermission) {
        deviceManager.showDevicePermissionAlert();
        return;
      }
      onClickJoin();
    }, [deviceManager, onClickJoin]);

    const handleExitClick = React.useCallback(() => {
      onClickExit();
    }, [onClickExit]);

    React.useImperativeHandle(ref, () => ({
      open,
      close: handleClose,
    }));

    React.useLayoutEffect(() => {
      if (isInView && isOpen) {
        deviceManager.initializeDeviceList();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView, isOpen]);

    return (
      <VideoCallDisclaimerDialog
        key="video-disclaimer-dialog"
        open={isOpen}
        fullScreen={true}
        fullWidth={true}
        disableEscapeKeyDown={true}
        hideBackdrop={true}
      >
        {isMobile ? (
          <ContentForMobile
            meetingName={meetingName}
            onClickJoin={handleJoinClick}
            onClickExit={handleExitClick}
          />
        ) : (
          <ContentForPC
            meetingName={meetingName}
            onClickJoin={handleJoinClick}
            onClickExit={handleExitClick}
          />
        )}
        <div ref={refInViewTrigger}></div>
      </VideoCallDisclaimerDialog>
    );
  },
);

export default Disclaimer;
