import * as React from "react";
import { FormattedMessage } from "react-intl";
import ForumShowMenu from "../../threadShow/components/menu";
import AppBar from "common/components/appBar";
import {
  getAppBarWrapperStyle,
  AppBarWrapperStickedStyle,
  CenterAlignmentWrapper,
  ParallaxTitle,
  MaxWidthPaper,
  RightWrapper,
  BlackPinIcon,
  PinIcon,
  PinnedPostWrapper,
  PinnedPostText,
  Title,
  MoreMenuWrapper,
} from "./styled";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ShavedText from "common/components/shavedText";
import { Spacer } from "common/components/designSystem/spacer";
import ChannelName from "../components/channelName";
import { WithENWordKeepAllStyle } from "common/components/designSystem/styles";

import BackIcon from "@icon/24-back-b.svg";
import BlackMoreIcon from "@icon/24-more-b.svg";

import { PostShowContext } from "../../../context";
import { useProps } from "./useHook";

const MobileHeader = () => {
  const { post } = React.useContext(PostShowContext);
  const {
    isMobile,
    pinned,
    refMenuButton,
    appBarTopPosition,
    visibleMoreMenu,
    openMenu,
    handleCloseRequestMenu,
    handleClickMenu,
    onBack,
    handleDeleteThread,
  } = useProps();

  const titleElement = React.useMemo(
    () => (
      <Title>
        {pinned && <BlackPinIcon />}
        <ShavedText
          value={<WithENWordKeepAllStyle>{post.title}</WithENWordKeepAllStyle>}
          line={1}
        />
      </Title>
    ),
    [post.title, pinned],
  );

  const titleParallaxElement = React.useMemo(
    () => (
      <MaxWidthPaper>
        <ParallaxTitle>
          <ChannelName />
          <Spacer value={8} />

          {pinned && (
            <PinnedPostWrapper>
              <PinIcon />
              <PinnedPostText>
                <FormattedMessage id="post_show/pinned_post" />
              </PinnedPostText>
            </PinnedPostWrapper>
          )}
          <NativeEmojiSafeText value={post.title} />
        </ParallaxTitle>
      </MaxWidthPaper>
    ),
    [post.title, pinned],
  );

  return (
    <>
      <AppBar
        wrapperStickyStyle={getAppBarWrapperStyle(appBarTopPosition)}
        wrapperStickedStyle={AppBarWrapperStickedStyle}
        titleElement={titleElement}
        enableScrollParallax={true}
        useScrollDownHide={false}
        parallaxWrapperComponent={CenterAlignmentWrapper}
        expendScrollParallaxElement={titleParallaxElement}
        leftButton={
          isMobile && (
            <BackIcon size="s" touch={44} role="button" onClick={onBack} />
          )
        }
        rightButton={
          <RightWrapper>
            {visibleMoreMenu && (
              <MoreMenuWrapper ref={refMenuButton}>
                <BlackMoreIcon
                  size="s"
                  touch={44}
                  role="button"
                  onClick={handleClickMenu}
                />
              </MoreMenuWrapper>
            )}
          </RightWrapper>
        }
      />

      <ForumShowMenu
        open={openMenu}
        rootId={post.parent_id}
        threadId={post.id}
        authorId={post.author}
        refMenuButton={refMenuButton}
        onClose={handleCloseRequestMenu}
        onDeleteThread={handleDeleteThread}
      />
    </>
  );
};

export default React.memo(MobileHeader);
