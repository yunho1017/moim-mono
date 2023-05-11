import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { EmailShareButton } from "react-share";
import EmailIconBase from "@icon/18-invite-b.svg";
import SNSShareItem from "..";

import { useStoreState } from "app/store";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export const EmailIcon = styled(EmailIconBase).attrs(props => ({
  role: "button",
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export default function EmailShare() {
  const { shareUrl } = useStoreState(state => ({
    shareUrl: state.SNSShareDialog.shareUrl,
  }));

  const handleClickShare = React.useCallback(() => {
    if (shareUrl) {
      AnalyticsClass.getInstance().shareUrl({
        destination: "email",
        url: shareUrl,
      });
    }
  }, [shareUrl]);

  if (!shareUrl) {
    return null;
  }

  return (
    <EmailShareButton url={shareUrl} onClick={handleClickShare}>
      <SNSShareItem
        icon={<EmailIcon />}
        text={<FormattedMessage id="external_service_email" />}
      />
    </EmailShareButton>
  );
}
