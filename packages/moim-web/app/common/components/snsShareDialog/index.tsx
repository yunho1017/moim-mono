import * as React from "react";

import { Inner, ShareItemList } from "./styled";
import CopyShareUrlInput from "./components/copyShareUrlInput";
import ShareTip from "./components/tip";
import FacebookShare from "./components/snsShareItem/presets/facebook";
import TwitterShare from "./components/snsShareItem/presets/twitter";
import WhatsappShare from "./components/snsShareItem/presets/whatsapp";
import LineShare from "./components/snsShareItem/presets/line";
import EmailShare from "./components/snsShareItem/presets/email";

import useIsMobile from "common/hooks/useIsMobile";

export default function SNSShare() {
  const isMobile = useIsMobile();

  const shareItemListElement = React.useMemo(() => {
    if (isMobile) {
      return (
        <>
          <ShareItemList>
            <FacebookShare />
            <TwitterShare />
            <WhatsappShare />
          </ShareItemList>
          <ShareItemList>
            <LineShare />
            <EmailShare />
          </ShareItemList>
        </>
      );
    }
    return (
      <ShareItemList>
        <FacebookShare />
        <TwitterShare />
        <WhatsappShare />
        <LineShare />
        <EmailShare />
      </ShareItemList>
    );
  }, [isMobile]);

  return (
    <Inner>
      {shareItemListElement}
      <CopyShareUrlInput />
      <ShareTip />
    </Inner>
  );
}
