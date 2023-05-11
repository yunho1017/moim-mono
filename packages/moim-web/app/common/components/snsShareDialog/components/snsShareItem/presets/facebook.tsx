import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { FacebookShareButton } from "react-share";
import FacebookIconBase from "@icon/18-facebook.svg";
import SNSShareItem from "..";

import { useStoreState } from "app/store";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export const FacebookIcon = styled(FacebookIconBase).attrs({
  role: "button",
  size: "xs",
})``;

export default function FacebookShare() {
  const { shareUrl } = useStoreState(state => ({
    shareUrl: state.SNSShareDialog.shareUrl,
  }));

  const handleClickShare = React.useCallback(() => {
    if (shareUrl) {
      AnalyticsClass.getInstance().shareUrl({
        destination: "facebook",
        url: shareUrl,
      });
    }
  }, [shareUrl]);

  if (!shareUrl) {
    return null;
  }

  return (
    <FacebookShareButton url={shareUrl} onClick={handleClickShare}>
      <SNSShareItem
        icon={<FacebookIcon />}
        text={<FormattedMessage id="external_service_facebook" />}
      />
    </FacebookShareButton>
  );
}
