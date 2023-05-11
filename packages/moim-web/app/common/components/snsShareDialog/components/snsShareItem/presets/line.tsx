import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { LineShareButton } from "react-share";
import LineIconBase from "@icon/18-line.svg";
import SNSShareItem from "..";

import { useStoreState } from "app/store";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export const LineIcon = styled(LineIconBase).attrs({
  role: "button",
  size: "xs",
})``;

export default function LineShare() {
  const { shareUrl } = useStoreState(state => ({
    shareUrl: state.SNSShareDialog.shareUrl,
  }));

  const handleClickShare = React.useCallback(() => {
    if (shareUrl) {
      AnalyticsClass.getInstance().shareUrl({
        destination: "line",
        url: shareUrl,
      });
    }
  }, [shareUrl]);

  if (!shareUrl) {
    return null;
  }

  return (
    <LineShareButton url={shareUrl} onClick={handleClickShare}>
      <SNSShareItem
        icon={<LineIcon />}
        text={<FormattedMessage id="external_service_line" />}
      />
    </LineShareButton>
  );
}
