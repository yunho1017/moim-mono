import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { MoimURL } from "common/helpers/url";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useIsMobile from "common/hooks/useIsMobile";
import useGroupTexts from "common/hooks/useGroupTexts";
import { useActions } from "app/store";
import { ActionCreators } from "app/actions/forum";

// components
import { AppBarModalLayout } from "common/components/modalLayout";
import { TabItemComponent, Tab } from "common/components/tab";
import { DefaultLoader as Loader } from "common/components/loading";
import { H8Bold } from "common/components/designSystem/typos";
import InfiniteScroller from "common/components/infiniteScroller";
import { MemberItem as MemberItemComponent } from "common/components/itemCell";
import WithPositionChip from "common/components/withPositionChip";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

import {
  AppBarWrapperStyle,
  Wrapper,
  TabContentWrapper,
  EmptyWrapper,
  EmptyEmoji,
  EmptyTitle,
  CloseButton,
} from "./styled";

interface ITab {
  type: Moim.Forum.VotedUserListDialogTabType;
  name: React.ReactNode;
}

const DEFAULT_TAB_LIST: ITab[] = [
  {
    type: "like",
    name: <FormattedMessage id="reaction_user_list/tab_title_up" />,
  },

  {
    type: "dislike",
    name: <FormattedMessage id="reaction_user_list/tab_title_down" />,
  },
];

interface IProps {
  likedVotes: Moim.IPaginatedListResponse<Moim.Forum.IDenormalizedVote>;
  dislikedVotes: Moim.IPaginatedListResponse<Moim.Forum.IDenormalizedVote>;
  activeTab: Moim.Forum.VotedUserListDialogTabType;
  isLoading: boolean;
  onWrapperClick: React.MouseEventHandler<HTMLDivElement>;
  useTab?: boolean;
  setActiveTab(tab: Moim.Forum.VotedUserListDialogTabType): void;
  onClose(): void;
  onLoadMoreLikeVotes(): void;
  onLoadMoreDislikeVotes(): void;
}

export const VotedUserListComponent: React.FC<IProps> = ({
  likedVotes,
  dislikedVotes,
  isLoading,
  useTab,
  activeTab,
  setActiveTab,
  onClose,
  onWrapperClick,
  onLoadMoreLikeVotes,
  onLoadMoreDislikeVotes,
}) => {
  const intl = useIntl();
  const { dispatchClearDialogData } = useActions({
    dispatchClearDialogData: ActionCreators.clearVotedUserListDialog,
  });
  const memberTexts = useGroupTexts("member");
  const tabData = React.useMemo(() => {
    const isDislikeTab = activeTab === "dislike";

    return {
      votes: isDislikeTab ? dislikedVotes : likedVotes,
      loadMore: isDislikeTab ? onLoadMoreDislikeVotes : onLoadMoreLikeVotes,
      emptyMessage: isDislikeTab
        ? intl.formatMessage(
            { id: "reaction_user_list/down_list_empty" },
            {
              down_vote_name: intl.formatMessage({ id: "down_vote" }),
              ref_member: memberTexts?.singular ?? "",
            },
          )
        : intl.formatMessage(
            {
              id: "reaction_user_list/up_list_empty",
            },
            {
              up_vote_name: intl.formatMessage({
                id: "post_engagement_up_vote",
              }),
              ref_member: memberTexts?.singular ?? "",
            },
          ),
    };
  }, [
    activeTab,
    dislikedVotes,
    likedVotes,
    onLoadMoreDislikeVotes,
    onLoadMoreLikeVotes,
    intl,
    memberTexts,
  ]);

  const memberListElement = React.useMemo(
    () =>
      tabData.votes.data.map(({ user }) => (
        <MemberItem
          key={`${user.group_id}_${user.id}`}
          title={
            <WithPositionChip positions={user.positions}>
              <ShavedText
                value={<NativeEmojiSafeText value={user.name} />}
                line={1}
              />
            </WithPositionChip>
          }
          subTitle={user.bio}
          subTitleShaveLine={1}
          size="member"
          image={{
            userId: user.id,
            src: user.avatar_url || "",
            canOpenProfileDialog: false,
          }}
          handleClose={onClose}
        />
      )),
    [onClose, tabData.votes.data],
  );

  React.useEffect(() => {
    return () => {
      dispatchClearDialogData();
    };
  }, []);
  return (
    <AppBarModalLayout
      title={
        <H8Bold>
          <FormattedMessage
            id={
              useTab
                ? "reaction_user_list/page_title_up_down"
                : "reaction_user_list/page_title_like"
            }
            values={{ ref_member: memberTexts?.plural ?? "" }}
          />
        </H8Bold>
      }
      leftElement={<CloseButton onClick={onClose} />}
      headerWrapperStyle={AppBarWrapperStyle}
    >
      <Wrapper onClick={onWrapperClick}>
        {useTab && (
          <Tab>
            {DEFAULT_TAB_LIST.map(({ type, name }) => (
              <TabItemComponent<Moim.Forum.VotedUserListDialogTabType>
                key={type}
                type={type}
                onClick={setActiveTab}
                active={type === activeTab}
              >
                {name}
              </TabItemComponent>
            ))}
          </Tab>
        )}
        <TabContentWrapper>
          {Boolean(tabData.votes.data.length) ? (
            <InfiniteScroller
              loadMore={tabData.loadMore}
              isLoading={isLoading}
              loader={<Loader />}
              paging={tabData.votes.paging}
              itemLength={tabData.votes.data.length}
            >
              {memberListElement}
            </InfiniteScroller>
          ) : isLoading ? (
            <Loader />
          ) : (
            <EmptyWrapper>
              <EmptyEmoji>📭</EmptyEmoji>
              <EmptyTitle>{tabData.emptyMessage}</EmptyTitle>
            </EmptyWrapper>
          )}
        </TabContentWrapper>
      </Wrapper>
    </AppBarModalLayout>
  );
};

function MemberItem({
  handleClose,
  ...rest
}: React.ComponentProps<typeof MemberItemComponent> & { handleClose(): void }) {
  const isMobile = useIsMobile();
  const { redirect } = useNativeSecondaryView();
  const handleClick = React.useCallback(() => {
    if (rest.image.userId && isMobile) {
      redirect(new MoimURL.Members({ userId: rest.image.userId }).toString());
      handleClose();
    }
  }, [handleClose, isMobile, redirect, rest.image.userId]);

  return (
    <MemberItemComponent
      onClick={handleClick}
      canOpenProfileDialog={!isMobile && rest.canOpenProfileDialog}
      {...rest}
    />
  );
}
