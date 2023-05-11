import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactResizeDetector from "react-resize-detector";

import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";

import { useStoreState } from "app/store";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import { MoimURL } from "common/helpers/url";
import makeShareUrl from "common/helpers/makeShareUrl";

interface IProps
  extends Pick<
    React.ComponentProps<typeof ResponsiveMenu>,
    "open" | "anchorElement" | "onCloseRequest"
  > {}

export default function MoreMenu({
  open,
  anchorElement,
  onCloseRequest,
}: IProps) {
  const [minHeight, setMinHeight] = React.useState<number | undefined>(0);
  const { conversationId } = useStoreState(state => ({
    conversationId: state.conversation.currentConversationId,
  }));

  const shareUrl = React.useMemo(
    () =>
      conversationId &&
      makeShareUrl(new MoimURL.ConversationShow({ conversationId }).toString()),
    [conversationId],
  );
  const openShareDialog = useOpenSNSShareDialog(shareUrl);

  const handlShareChannelClick = React.useCallback(() => {
    openShareDialog();
    onCloseRequest();
  }, [openShareDialog, onCloseRequest]);

  const handleResize = React.useCallback((_width: number, height: number) => {
    setMinHeight(height);
  }, []);

  return (
    <ResponsiveMenu
      open={open}
      anchorElement={anchorElement}
      onCloseRequest={onCloseRequest}
      minHeight={minHeight}
    >
      <MenuWrapper>
        <ReactResizeDetector handleHeight={true} onResize={handleResize}>
          <MenuItem onClick={handlShareChannelClick}>
            <FormattedMessage id="menu_content_link_share" />
          </MenuItem>
        </ReactResizeDetector>
      </MenuWrapper>
    </ResponsiveMenu>
  );
}
