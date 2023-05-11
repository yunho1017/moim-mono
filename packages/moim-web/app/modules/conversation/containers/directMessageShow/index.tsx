import * as React from "react";
import { Redirect } from "react-router";

import { MessageStartFromDirectMessage } from "common/components/talk/components/messageStart";
import { ThreadInput } from "common/components/threadV2";
import {
  Wrapper,
  ThreadInputWrapper,
  BackgroundLayer,
  NoRightTextWrapper,
} from "./styled";
import ConversationHelmet from "../../components/helmet";
import MessageList from "../../components/messageList";
import FreezeView from "common/components/freezeView";
import Header from "../../components/header";
import PermissionChecker from "common/components/permissionChecker";
// hooks
import { useProps, useHandlers, useEffects } from "./hooks";
import { MoimURL } from "common/helpers/url";
import { PermissionDeniedFallbackType } from "app/enums";
import { FormattedMessage } from "react-intl";

export interface IProps {
  channelId: string;
}
export default function DirectMessageShow(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps);
  const {
    refThis,
    isFetched,
    isLoading,
    channelId,
    targetUser,
    intl,
    isMobile,
    inputRef,
    inputWrapperRef,
    directMessageLoading,
    hideInput,
    mobileHeight,
    blockedUser,
    isBlockedUser,
    directMessageEntity,
  } = hookProps;
  const { handleEnter } = hookHandlers;
  const sendable: boolean = directMessageEntity?.sendable;

  const permissionDeniedCustomElement = React.useMemo(() => {
    if (blockedUser) {
      return (
        <NoRightTextWrapper>
          <BackgroundLayer>
            <FormattedMessage id="dm_show_dm_message_user_blocked_placeholder" />
          </BackgroundLayer>
        </NoRightTextWrapper>
      );
    }

    if (isBlockedUser) {
      return (
        <NoRightTextWrapper>
          <BackgroundLayer>
            <FormattedMessage id="dm_show_dm_message_user_is_blocked_placeholder" />
          </BackgroundLayer>
        </NoRightTextWrapper>
      );
    }

    if (targetUser?.is_bot) {
      return (
        <NoRightTextWrapper>
          <BackgroundLayer>
            <FormattedMessage id="dm_show/dm_bot_message_placeholder" />
          </BackgroundLayer>
        </NoRightTextWrapper>
      );
    }

    if (!sendable) {
      return (
        <NoRightTextWrapper>
          <BackgroundLayer>
            <FormattedMessage id="dm_show_message_not_allowed_placeholder" />
          </BackgroundLayer>
        </NoRightTextWrapper>
      );
    }

    return null;
  }, [isBlockedUser, blockedUser, targetUser?.is_bot, sendable]);

  if (
    !directMessageEntity &&
    !(isLoading || directMessageLoading) &&
    isFetched
  ) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <Wrapper ref={refThis} mobileHeight={mobileHeight}>
      <ConversationHelmet />
      <Header
        type="dm"
        wrapperRef={refThis}
        targetUser={targetUser}
        channelId={channelId}
      />

      <FreezeView isFreeze={false}>
        <MessageList
          header={
            targetUser && <MessageStartFromDirectMessage user={targetUser} />
          }
          channelId={channelId}
          useIsMine={true}
          enableRightOrderForMine={true}
        />
      </FreezeView>

      <ThreadInputWrapper visibility={!isMobile || !hideInput}>
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.CUSTOM}
          hasPermission={!blockedUser && !isBlockedUser && sendable}
          isLoading={false}
          permissionDeniedCustomElement={permissionDeniedCustomElement}
        >
          <ThreadInput
            ref={inputWrapperRef}
            id={channelId || "group-input"}
            inputRef={inputRef}
            maxAttachmentCount={1}
            onEnter={handleEnter}
            disableImageBlockUpload={true}
            placeholder={intl.formatMessage(
              {
                id: "dm_show/dm_message_placeholder",
              },
              {
                username: targetUser?.name,
              },
            )}
            resizeDetectHeight={true}
          />
        </PermissionChecker>
      </ThreadInputWrapper>
    </Wrapper>
  );
}
