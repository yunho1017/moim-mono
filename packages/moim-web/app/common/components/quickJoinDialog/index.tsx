import * as React from "react";
// constants
import { PRODUCTION_HOST, STAGE_HOST, DEV_HOST } from "common/constants/hosts";
import {
  QUICK_JOIN_MESSAGE_TYPE,
  QUICK_JOIN_MESSAGE_DATA_STATUS,
} from "app/common/constants/postMessage";
// helpers
import { MoimURL } from "common/helpers/url";
import { isDev, isProd } from "common/helpers/envChecker";
import { postMessageParser } from "common/components/postMessageReceiver/helper";
// actions
import { useActions } from "app/store";
import { ActionCreators as MeActionCreators } from "app/actions/me";
// components
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import { ParentSizeIFrame } from "./styledComponents";

interface IProps {
  open: boolean;
  targetMoimDomain: string; // Note: moim domain ex) vake-test
  targetMoimId: Moim.Id;
  username: string;
  onClose(): void;
}

const iframeName = "quick-join-iframe";

export function useQuickJoinDialog() {
  const [open, setOpenStatus] = React.useState(false);
  const [targetMoimUrl, setMoimUrl] = React.useState("");
  const [targetMoimId, setMoimId] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleOpen = React.useCallback(
    (moimUrl: string, moimId: Moim.Id, name: string) => {
      setOpenStatus(true);
      setMoimId(moimId);
      setMoimUrl(moimUrl);
      setUsername(name);
    },
    [],
  );

  const handleClose = React.useCallback(() => {
    setOpenStatus(false);
    setMoimId("");
    setMoimUrl("");
    setUsername("");
  }, []);

  return {
    open,
    targetMoimUrl,
    targetMoimId,
    username,
    handleOpen,
    handleClose,
  };
}

const QuickJoinDialog: React.FC<IProps> = ({
  open,
  targetMoimDomain,
  targetMoimId,
  username,
  onClose,
}) => {
  const { addJoinedMoims } = useActions({
    addJoinedMoims: MeActionCreators.addMyJoinedMoim,
  });
  const moimQuickJoinUrl = React.useMemo(
    () =>
      `https://${targetMoimDomain}.${
        isDev()
          ? `${DEV_HOST}:${location.port}`
          : isProd()
          ? PRODUCTION_HOST
          : STAGE_HOST
      }${new MoimURL.QuickJoinMoim().toString()}?username=${username}`,
    [targetMoimDomain, username],
  );

  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleMessage = React.useCallback(
    (e: MessageEvent) => {
      const payload: {
        type: string;
        data: {
          status: QUICK_JOIN_MESSAGE_DATA_STATUS;
          message: string;
        };
      } | null = postMessageParser(e);
      if (payload && payload.type === QUICK_JOIN_MESSAGE_TYPE) {
        switch (payload.data.status) {
          case QUICK_JOIN_MESSAGE_DATA_STATUS.REQUIRED_USERNAME: {
            handleClose();
            break;
          }
          case QUICK_JOIN_MESSAGE_DATA_STATUS.ALREADY_JOINED:
          case QUICK_JOIN_MESSAGE_DATA_STATUS.SUCCESS: {
            addJoinedMoims(targetMoimId);
            handleClose();
            break;
          }
        }
      }
    },
    [addJoinedMoims, handleClose, targetMoimId],
  );

  React.useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (open) {
        window.open(moimQuickJoinUrl, iframeName);
      }
    });
  }, [moimQuickJoinUrl, open]);

  return (
    <BasicResponsiveDialog open={open} onClose={handleClose}>
      <ParentSizeIFrame name={iframeName} />
    </BasicResponsiveDialog>
  );
};

export default QuickJoinDialog;
