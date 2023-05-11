import * as React from "react";

import { FormattedMessage } from "react-intl";
import ShavedText from "common/components/shavedText";
import Share from "common/components/share";
import { Wrapper, Input, ShareUrl, CopyButton } from "./styled";

import { useStoreState } from "app/store";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export default function CopyShareUrlInput() {
  const { shareUrl } = useStoreState(state => ({
    shareUrl: state.SNSShareDialog.shareUrl,
  }));

  const handleClickCopy = React.useCallback(() => {
    () => {
      if (shareUrl) {
        AnalyticsClass.getInstance().shareUrl({
          destination: "copy",
          url: shareUrl,
        });
      }
    };
  }, [shareUrl]);

  if (!shareUrl) {
    return null;
  }

  return (
    <Wrapper>
      <Input>
        <ShareUrl>
          <ShavedText line={1} value={shareUrl} />
        </ShareUrl>
        <Share
          displayText={
            <CopyButton onClick={handleClickCopy}>
              <FormattedMessage id="copy_button" />
            </CopyButton>
          }
          copyValue={shareUrl}
        />
      </Input>
    </Wrapper>
  );
}
