import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Title,
  ModalShowHeader,
  RightWrapper,
  CloseButton,
  PinIcon,
  PinnedPostWrapper,
  PinnedPostText,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { MaxWidthWrapper } from "app/modules/postShow/styled";
import ChannelName from "../components/channelName";

import { PostShowContext } from "../../../context";
import { useStoreState } from "app/store";

const DesktopHeader = () => {
  const { isModalShow, post, onBack } = React.useContext(PostShowContext);

  const { pinned } = useStoreState(state => ({
    pinned: state.forumData.pinnedPostList[post.parent_id]?.includes(post.id),
  }));

  return (
    <>
      {isModalShow && (
        <ModalShowHeader>
          <RightWrapper>
            <CloseButton onClick={onBack} />
          </RightWrapper>
        </ModalShowHeader>
      )}
      {!isModalShow && <Spacer value={40} />}
      <MaxWidthWrapper>
        <Title>
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
        </Title>
      </MaxWidthWrapper>
    </>
  );
};

export default DesktopHeader;
