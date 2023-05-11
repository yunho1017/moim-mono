import * as React from "react";
import { PermissionDeniedFallbackType } from "app/enums";
import { isProd } from "common/helpers/envChecker";
import PermissionChecker from "common/components/permissionChecker";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import AppBar from "common/components/appBar";
import { FlatButton } from "common/components/designSystem/buttons";
import PageUpdater from "common/components/pageUpdater";
import BlockViewShow from "./block";
import ThreadViewShow from "./thread";
import CommerceViewShow from "./commerce";
import { useEffects, useHandlers, useProps } from "./hooks";
import { Wrapper, ChannelName, MenuIcon, appBarStyle } from "./styled";

export interface IProps {
  channelId: string;
}

function ViewContainer(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);

  const {
    isMobile,
    currentView,
    currentGroup,
    blocks,
    hasReadPermission,
    isPermissionLoading,
    expandSideNavigation,
  } = hookProps;

  const leftElement = React.useMemo(
    () => (isMobile ? <MenuIcon onClick={expandSideNavigation} /> : null),
    [expandSideNavigation, isMobile],
  );

  const titleElement = React.useMemo(
    () => (
      <ChannelName>
        <NativeEmojiSafeText value={currentView?.name || ""} />
      </ChannelName>
    ),
    [currentView],
  );

  const inner = React.useMemo(() => {
    if (!currentView) return <div />;
    const view = (currentView as Moim.Channel.IViewSimpleChannel).view;

    if (view.type === "BLOCK") {
      // TO BE DELETED
      if (view.sub_type && view.sub_type === "commerce") {
        return (
          <CommerceViewShow
            key={props.channelId}
            channelId={props.channelId}
            blocks={blocks ?? []}
          />
        );
      }
      return (
        <BlockViewShow channelId={props.channelId} blocks={blocks ?? []} />
      );
    }

    if (view.type === "THREAD") {
      return <ThreadViewShow />;
    }

    return <div />;
  }, [currentView, props.channelId, blocks]);

  /** for-google-verification */
  const titleElementTemp = React.useMemo(
    () => (
      <div style={{ display: "flex" }}>
        <ChannelName>
          <NativeEmojiSafeText value={currentView?.name || ""} />
        </ChannelName>
      </div>
    ),
    [currentView],
  );

  if (currentView?.id === (isProd() ? "I36XHE9DD" : "IEAKK7C0M")) {
    const testUserIds = isProd() ? ["UME6QWOEB"] : ["UDYV5VXRL"];
    const botId = isProd() ? "BU4U8HE7H" : "BR8ON9LGI";
    const botToken = isProd()
      ? "e1360905da02088795da4e45709ac67526437914"
      : "9f97a0f6d819fd14e975c7d8a8bed6adb39254b7";
    const pluginAuthUrl = `https://plugins-auth.${
      isProd() ? "moim.co" : "vingle.network"
    }/google-calendar/auth.html?botId=${botId}&groupId=${hookProps.currentGroupId ||
      ""}&botToken=${botToken}&channelId=${currentView?.id}`;

    if (
      hookProps.currentUserId &&
      testUserIds.includes(hookProps.currentUserId)
    ) {
      return (
        <Wrapper>
          <AppBar
            titleElement={titleElementTemp}
            titleAlignment={isMobile ? "Center" : "Left"}
            leftButton={leftElement}
            wrapperStyle={appBarStyle}
          />
          <FlatButton
            style={{
              display: "inline-block",
              marginLeft: "16px",
              marginTop: "16px",
              width: "240px",
            }}
            size="m"
            onClick={() => {
              window.location.href = pluginAuthUrl;
            }}
          >
            Configure Calendar
          </FlatButton>
          <PermissionChecker
            fallbackType={PermissionDeniedFallbackType.SCREEN}
            hasPermission={hasReadPermission}
            isLoading={isPermissionLoading}
          >
            {inner}
          </PermissionChecker>
        </Wrapper>
      );
    }
  }

  return (
    <>
      <PageUpdater
        title={
          currentView?.name
            ? `${currentView.name}${
                currentGroup?.name ? ` - ${currentGroup.name}` : ""
              }`
            : undefined
        }
      />
      <Wrapper>
        {(currentView as Moim.Channel.IViewSimpleChannel)?.view.type !==
          "BLOCK" && (
          <AppBar
            titleElement={titleElement}
            titleAlignment={isMobile ? "Center" : "Left"}
            leftButton={leftElement}
            wrapperStyle={appBarStyle}
          />
        )}
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.SCREEN}
          hasPermission={hasReadPermission}
          isLoading={isPermissionLoading}
        >
          {inner}
        </PermissionChecker>
      </Wrapper>
    </>
  );
}
export default React.memo(ViewContainer);
