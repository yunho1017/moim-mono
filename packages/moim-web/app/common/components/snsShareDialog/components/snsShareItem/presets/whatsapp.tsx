import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { WhatsappShareButton } from "react-share";
import WhatsappIconBase from "@icon/18-whatsapp.svg";
import SNSShareItem from "..";

import { useStoreState } from "app/store";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export const WhatsappIcon = styled(WhatsappIconBase).attrs({
  role: "button",
  size: "xs",
})``;

export default function WhatsappShare() {
  const { shareUrl } = useStoreState(state => ({
    shareUrl: state.SNSShareDialog.shareUrl,
  }));

  const handleClickShare = React.useCallback(() => {
    if (shareUrl) {
      AnalyticsClass.getInstance().shareUrl({
        destination: "whatsapp",
        url: shareUrl,
      });
    }
  }, [shareUrl]);

  if (!shareUrl) {
    return null;
  }

  return (
    <WhatsappShareButton url={shareUrl} onClick={handleClickShare}>
      <SNSShareItem
        icon={<WhatsappIcon />}
        text={<FormattedMessage id="external_service_whatsapp" />}
      />
    </WhatsappShareButton>
  );
}
