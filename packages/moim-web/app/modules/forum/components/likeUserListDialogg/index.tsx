import * as React from "react";

import { FormattedMessage } from "react-intl";
import { FixedHeightSmallModalLayout } from "common/components/modalLayout";
import { DefaultLoader as Loader } from "common/components/loading";
import {
  Wrapper,
  Header,
  Contents,
  TabContentWrapper,
  CloseButton,
} from "./styled";

import useHook from "./useHook";
import AppBar from "common/components/appBar";
import { H8Bold } from "common/components/designSystem/typos";
import InfiniteScroller from "common/components/infiniteScroller";
import { MemberItem } from "common/components/itemCell";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

export interface IProps {
  channelId: string;
  threadId: string;
}

export default function VotedUserListDialog(props: IProps) {
  const {
    isLoading,
    likedVotes,
    handleModalClose,
    handleLoadMoreLikeVotes,
  } = useHook(props);

  return (
    <FixedHeightSmallModalLayout>
      <Wrapper>
        <Header>
          <AppBar
            leftButton={<CloseButton onClick={handleModalClose} />}
            titleElement={
              <H8Bold>
                <FormattedMessage id="vote_user_list/down_title" />
              </H8Bold>
            }
            titleAlignment="Center"
          />
        </Header>
        <Contents>
          <TabContentWrapper>
            <InfiniteScroller
              loadMore={handleLoadMoreLikeVotes}
              isLoading={isLoading}
              loader={<Loader />}
              paging={likedVotes.paging}
              itemLength={likedVotes.data.length}
            >
              {likedVotes.data.map(({ user }) => (
                <MemberItem
                  key={`${user.group_id}_${user.id}`}
                  title={<NativeEmojiSafeText value={user.name} />}
                  subTitle={
                    user.bio ? (
                      <NativeEmojiSafeText value={user.bio} />
                    ) : (
                      undefined
                    )
                  }
                  subTitleShaveLine={1}
                  size="m"
                  image={{ userId: user.id, src: user.avatar_url || "" }}
                  canOpenProfileDialog={!user.is_deactivated}
                />
              ))}
            </InfiniteScroller>
          </TabContentWrapper>
        </Contents>
      </Wrapper>
    </FixedHeightSmallModalLayout>
  );
}
