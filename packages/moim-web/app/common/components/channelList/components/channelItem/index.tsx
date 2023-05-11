// vendor
import * as React from "react";
import { InView } from "react-intersection-observer";
// hook
import { useHandlers, useProps } from "./hooks";
import useRedirect from "common/hooks/useRedirect";
// component
import {
  ChannelName,
  Wrapper,
  LinkIcon,
  PrivateIcon,
  TitleWrapper,
  RightElementWrapper,
  LinkChannelWrapper,
} from "./styled";
import ShavedText from "common/components/shavedText";
import { CommonBadge } from "common/components/alertBadge";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

export interface IProps {
  channelId: Moim.Id;
  isMuted: boolean;
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  textColorPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
  onClickChannel(channel: Moim.Channel.SimpleChannelType): void;
  onInViewChange(
    visible: boolean,
    channel: Moim.Id,
    ref: React.RefObject<any>,
    statCount?: number,
  ): void;
}

function LinkChannelController({
  channel,
  children,
}: React.PropsWithChildren<{
  channel: Moim.Channel.SimpleChannelWithoutCategoryType;
}>) {
  const redirect = useRedirect();

  const handleClick = React.useCallback(() => {
    if (channel.type === "link" && channel.url) {
      redirect(channel.url);
    }
  }, [
    channel.type,
    (channel as Moim.Channel.ILinkSimpleChannel).url,
    redirect,
  ]);

  if (channel.type !== "link") {
    return <>{children}</>;
  }

  return (
    <LinkChannelWrapper onClick={handleClick}>{children}</LinkChannelWrapper>
  );
}

function ChannelItem(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  const {
    channel,
    isMuted,
    isSelected,
    isUnread,
    isLimited,
    unreadCountMessage,
    hoverRef,
    elementPaletteKey,
    textColorPaletteKey,
  } = hookProps;
  const { handleClickChannel, handleInViewChange } = hookHandlers;

  const channelTitleSuffix = React.useMemo(() => {
    const elements: React.ReactNode[] = [];

    if (channel.type === "link") {
      elements.push(
        <LinkIcon key="link-icon" elementPaletteKey={textColorPaletteKey} />,
      );
    }

    if (isLimited) {
      elements.push(
        <PrivateIcon
          key="private-icon"
          elementPaletteKey={textColorPaletteKey}
        />,
      );
    }

    return elements;
  }, [isLimited, channel.type, textColorPaletteKey]);

  const rightElement: React.ReactNode = React.useMemo(() => {
    const elements: React.ReactNode[] = [];

    if (unreadCountMessage) {
      elements.push(
        <CommonBadge key="alert-badge">{unreadCountMessage}</CommonBadge>,
      );
    }

    return <RightElementWrapper>{elements}</RightElementWrapper>;
  }, [textColorPaletteKey, elementPaletteKey, unreadCountMessage]);

  const channelItemElement = React.useMemo(
    () => (
      <TitleWrapper title={channel.name}>
        <ChannelName
          isMuted={isMuted}
          isSelected={isSelected}
          isUnread={isUnread}
          elementPaletteKey={textColorPaletteKey}
        >
          <ShavedText
            value={<NativeEmojiSafeText value={channel.name} />}
            line={1}
          />
        </ChannelName>
        {channelTitleSuffix}
      </TitleWrapper>
    ),
    [
      channel.name,
      channelTitleSuffix,
      textColorPaletteKey,
      isMuted,
      isSelected,
      isUnread,
    ],
  );

  return (
    <InView onChange={handleInViewChange}>
      <Wrapper
        ref={hoverRef}
        isMuted={isMuted}
        isSelected={isSelected}
        isUnread={isUnread}
        hasChannelItemSuffix={Boolean(channelTitleSuffix.length)}
        elementPaletteKey={elementPaletteKey}
        onClick={handleClickChannel}
      >
        <LinkChannelController channel={channel}>
          {channelItemElement}
        </LinkChannelController>
        {rightElement}
      </Wrapper>
    </InView>
  );
}

export default React.memo(ChannelItem);
