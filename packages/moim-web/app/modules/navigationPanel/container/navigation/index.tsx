// vendor
import * as React from "react";
// hook
import { useProps, useHandlers, useEffects } from "./hooks";
// component
import CurrentUser from "../../components/currentUser";
import { ChannelItem, WithCategory } from "common/components/channelList";
import DirectMessageList from "../../components/directMessageList";
import Header from "../../components/header";
import NavigationPanelUnreadSnackBar from "../../components/unreadSnackBar";
import Period from "../../components/period";
import { PaletteDivider } from "common/components/divider";
import Footer from "common/components/footer";
import {
  Body,
  HeaderWrapper,
  BottomWrapper,
  FooterWrapper,
  Wrapper,
  DmWrapper,
  Container,
  Spacer,
} from "./styled";

function NavigationPanel() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);

  const {
    currentGroup,
    currentUser,
    channelList,
    dmChannelList,
    channelListRef,
    headerRef,
    footerRef,
    logo,
    hasNonCategoryChannel,
    topUnreadSnackBar,
    bottomUnreadSnackBar,
    visibleCurrentUser,
  } = hookProps;
  const {
    handleClickChannel,
    handleChannelInViewChange,
    handleClickUnreadSnackBar,
  } = hookHandlers;

  const channelListElement = React.useMemo(
    () =>
      channelList.data.map(channel => {
        if (channel.type !== "category") {
          return (
            <ChannelItem
              key={channel.id}
              elementPaletteKey="background"
              textColorPaletteKey="menuText"
              channelId={channel.id}
              isMuted={false}
              onClickChannel={handleClickChannel}
              onInViewChange={handleChannelInViewChange}
            />
          );
        }

        return (
          <WithCategory
            key={`category_${channel.id}`}
            useCollapse={true}
            showChannelAddButton={false}
            categoryName={channel.name}
            elementPaletteKey="background"
            textColorPaletteKey="categoryTitleText"
          >
            {channel.items?.map(item => (
              <ChannelItem
                key={item.id}
                channelId={item.id}
                isMuted={false}
                elementPaletteKey="background"
                textColorPaletteKey="menuText"
                onClickChannel={handleClickChannel}
                onInViewChange={handleChannelInViewChange}
              />
            ))}
          </WithCategory>
        );
      }),
    [channelList.data, handleChannelInViewChange, handleClickChannel],
  );

  if (!currentGroup) {
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper ref={headerRef}>
          <Header logo={logo} />
        </HeaderWrapper>
        <Period
          status={currentGroup.status}
          period={currentGroup.period}
          statusConfig={currentGroup.status_config}
        />
        <Spacer value={8} />
        {hasNonCategoryChannel && (
          <PaletteDivider
            elementPaletteProps={{
              type: "sideArea",
              key: "menuText",
            }}
          />
        )}
        <Body ref={channelListRef} data-scroll-lock-scrollable>
          {channelListElement}

          {Boolean(currentUser) && (
            <DmWrapper>
              <DirectMessageList
                directMessages={dmChannelList.data}
                onInViewChange={handleChannelInViewChange}
              />
            </DmWrapper>
          )}
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </Body>

        {visibleCurrentUser && (
          <BottomWrapper ref={footerRef}>
            {hasNonCategoryChannel && (
              <PaletteDivider
                elementPaletteProps={{
                  type: "sideArea",
                  key: "menuText",
                }}
              />
            )}
            <CurrentUser currentUser={currentUser!} />
          </BottomWrapper>
        )}
      </Wrapper>

      <NavigationPanelUnreadSnackBar
        topUnreadSnackBar={{
          ...topUnreadSnackBar,
          position: headerRef.current?.clientHeight,
        }}
        bottomUnreadSnackBar={{
          ...bottomUnreadSnackBar,
          position: footerRef.current?.clientHeight,
        }}
        onSnackBarClick={handleClickUnreadSnackBar}
      />
    </Container>
  );
}

export default React.memo(NavigationPanel);
