import * as React from "react";
import { postMessageParser } from "./helper";

interface IProps {
  onReceive: (payload: Moim.ICustomPostMessage | null) => void;
}

const PostMessageReceiver: React.FC<IProps> = ({ onReceive }) => {
  const handleReceiveMessage = React.useCallback(
    (e: MessageEvent) => {
      const jsonData = postMessageParser(e);
      onReceive(jsonData);
    },
    [onReceive],
  );
  React.useEffect(() => {
    window.addEventListener("message", handleReceiveMessage, false);
    return () => {
      window.removeEventListener("message", handleReceiveMessage, false);
    };
  }, [handleReceiveMessage]);
  return null;
};

export default PostMessageReceiver;
