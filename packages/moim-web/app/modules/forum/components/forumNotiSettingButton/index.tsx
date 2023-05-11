import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import UnsignedChecker from "common/components/unsiginedChecker";
import { useStoreState } from "app/store";
import {
  useNotiIconWithStatus,
  useOpenChannelNotificationSettingDialog,
} from "common/components/channelNotificationSettingDialog/hooks";
import { PermissionDeniedFallbackType } from "app/enums";
import { B2RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const TextWapper = styled.div`
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${B2RegularStyle}
    min-width: ${px2rem(130)};
    height: ${px2rem(52)};
    padding: ${px2rem(15)} ${px2rem(16)};
    gap: ${px2rem(12)};
    display: flex;
    align-items: center;
`;

interface IProps {
  visibleTopTabNavigation?: boolean;
  iconSize?: string;
  onCloseRequest?(): void;
}

function ForumNotiSettingButton({
  visibleTopTabNavigation,
  iconSize,
  onCloseRequest,
}: IProps) {
  const { forumId } = useStoreState(state => ({
    forumId: state.forumData.currentForumId,
  }));

  const openChannelNotiSettingDialog = useOpenChannelNotificationSettingDialog({
    type: "forum",
    channelId: forumId,
  });

  const notiIcon = useNotiIconWithStatus({
    channelId: forumId,
    size: iconSize,
    handler: openChannelNotiSettingDialog,
  });

  const handleBottomSheetMenu = React.useCallback(() => {
    onCloseRequest?.();
    openChannelNotiSettingDialog();
  }, [onCloseRequest, openChannelNotiSettingDialog]);

  const inner = React.useMemo(() => {
    if (visibleTopTabNavigation) {
      return (
        <TextWapper onClick={handleBottomSheetMenu}>
          {notiIcon}
          <FormattedMessage id="menu_channel_noti_setting" />
        </TextWapper>
      );
    }

    return notiIcon;
  }, [handleBottomSheetMenu, notiIcon, visibleTopTabNavigation]);

  return (
    <UnsignedChecker fallbackType={PermissionDeniedFallbackType.NONE}>
      {inner}
    </UnsignedChecker>
  );
}

export default ForumNotiSettingButton;
