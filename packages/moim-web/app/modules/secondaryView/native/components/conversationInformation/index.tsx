import * as React from "react";

import { FormattedMessage } from "react-intl";
import ChannelInformation from "app/modules/channelInformation";
import {
  useHandlers,
  useProps,
} from "app/modules/channelInformation/hooks/useConversation";
import { DefaultLayout } from "../../layout";
import SettingButton from "../settingButton";
import { Header, HeaderTitle } from "./styled";
import useSuperPermission from "common/hooks/useSuperPermission";
import PermissionChecker from "common/components/permissionChecker";
import { PermissionDeniedFallbackType } from "app/enums";

export default function ConversationInformation({
  channelId,
}: {
  channelId: string;
}) {
  const { conversation, isLoading, members, handleGetMembers } = useHandlers(
    useProps(channelId),
  );
  const {
    hasPermission: hasSettingPermission,
    isLoading: isPermissionLoading,
  } = useSuperPermission();

  return (
    <DefaultLayout
      appBar={{
        titleElement: (
          <Header>
            <HeaderTitle
              value={
                <FormattedMessage id="channel_information_show/page_title_channel_info" />
              }
              line={1}
            />
          </Header>
        ),
        titleAlignment: "Left",
        rightButton: (
          <PermissionChecker
            fallbackType={PermissionDeniedFallbackType.NONE}
            hasPermission={hasSettingPermission}
            isLoading={isPermissionLoading}
          >
            <SettingButton channelId={channelId} />
          </PermissionChecker>
        ),
        enableScrollParallax: true,
      }}
    >
      <ChannelInformation
        channel={conversation}
        isLoading={isLoading}
        isInitialLoading={Boolean(!members || (!members && isLoading))}
        members={members}
        onGetMembers={handleGetMembers}
      />
    </DefaultLayout>
  );
}
