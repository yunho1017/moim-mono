import * as React from "react";
import { FormattedMessage } from "react-intl";
import { TabItemComponent, Tab } from "common/components/tab";
import { DefaultLoader as Loader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller";
import {
  Wrapper,
  TabContentWrapper,
  EmptyWrapper,
  EmptyEmoji,
  EmptyTitle,
  HeaderTitle,
  HeaderSubTitle,
  BookmarkCount,
  StickyWrapper,
  ParallaxHeaderTitle,
  Header,
  PrivateIcon,
  PriviateIconWrapper,
} from "./styled";
import { DefaultLayout } from "../../layout";
import PostItem from "./components/item";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import BookmarkFilterBox from "./components/filterBox";

import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import {
  selectGetBookmarksLoading,
  selectMoimResources,
  selectUserBookmarks,
} from "app/selectors/profile";
import { userSelector } from "app/selectors/user";
import { getFamilyMoim, getBookmarks } from "app/actions/bookmark";
import useCurrentGroup from "common/hooks/useCurrentGroup";

interface ITab {
  type: "post" | "comment";
  name: React.ReactNode;
}

const DEFAULT_TAB_LIST: ITab[] = [
  {
    type: "post",
    name: <FormattedMessage id="contents_tab_post" />,
  },

  // TBD: like /dislike 페이지에서 사용
  // {
  //   type: "comment",
  //   name: <FormattedMessage id="contetns_tab_comment" />,
  // },
];

interface IProps {
  userId: Moim.Id;
  useTab?: boolean;
}
const UserBookmark: React.FC<IProps> = ({ userId, useTab }) => {
  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();
  const { targetUser, bookmarks, moimResources, isLoading } = useStoreState(
    state => ({
      bookmarks: selectUserBookmarks(state, userId),
      isLoading: selectGetBookmarksLoading(state, userId),
      moimResources: selectMoimResources(state),
      targetUser: userSelector(state, userId),
    }),
  );
  const {
    dispatchGetBookmarks,
    dispatchGetFamilyMoim: dispatchGetAllMoimResources,
  } = useActions({
    dispatchGetBookmarks: getBookmarks,
    dispatchGetFamilyMoim: getFamilyMoim,
  });
  const [activeTab, setActiveTab] = React.useState<"post" | "comment">("post");

  const handleLoadMoreBookmark = React.useCallback(
    (pagingKey: keyof Moim.IPaging) => {
      dispatchGetBookmarks(
        { userId, [pagingKey]: bookmarks.paging[pagingKey] },
        cancelToken.current.token,
      );
    },
    [userId, bookmarks],
  );

  React.useEffect(() => {
    if (moimResources.length === 0) {
      dispatchGetAllMoimResources(cancelToken.current.token);
    }
  }, []);

  React.useEffect(() => {
    dispatchGetBookmarks(
      {
        userId,
        filter: {
          groupId: currentGroup?.id,
        },
      },
      cancelToken.current.token,
    );
  }, []);

  const postItemListElement = React.useMemo(
    () =>
      bookmarks.data.map(bookmark => {
        if (
          !bookmark ||
          !bookmark.resource ||
          !bookmark.user ||
          !bookmark.channel ||
          !bookmark.group
        ) {
          return null;
        }
        return <PostItem key={bookmark.id} bookmark={bookmark} />;
      }),
    [bookmarks.data],
  );

  return (
    <DefaultLayout
      appBar={{
        titleElement: (
          <>
            <HeaderTitle>
              <FormattedMessage id="profile_show/contents/bookmarks_title" />
              <PriviateIconWrapper margin={2}>
                <PrivateIcon />
              </PriviateIconWrapper>
            </HeaderTitle>
            <HeaderSubTitle>{targetUser?.name}</HeaderSubTitle>
          </>
        ),
        titleAlignment: "Left",
        enableScrollParallax: true,
        parallaxWrapperComponent: Header,
        expendScrollParallaxElement: (
          <>
            <HeaderSubTitle>{targetUser?.name}</HeaderSubTitle>
            <ParallaxHeaderTitle>
              <FormattedMessage id="profile_show/contents/bookmarks_title" />
              <PriviateIconWrapper margin={6}>
                <PrivateIcon />
              </PriviateIconWrapper>
            </ParallaxHeaderTitle>
          </>
        ),
      }}
    >
      <Wrapper>
        <StickyWrapper>
          {useTab && (
            <Tab>
              {DEFAULT_TAB_LIST.map(({ type, name }) => (
                <TabItemComponent<"post" | "comment">
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
        </StickyWrapper>
        <BookmarkFilterBox userId={userId} />
        <DefaultDivider />
        <TabContentWrapper>
          {Boolean(bookmarks.data.length) ? (
            <>
              <BookmarkCount>
                <FormattedMessage
                  id="number_of_posts"
                  values={{ count: bookmarks.data.length }}
                />
              </BookmarkCount>
              <Spacer value={8} />
              <DefaultDivider />

              <InfiniteScroller
                loadMore={handleLoadMoreBookmark}
                isLoading={isLoading}
                loader={<Loader />}
                paging={bookmarks.paging}
                itemLength={bookmarks.data.length}
              >
                {postItemListElement}
              </InfiniteScroller>
            </>
          ) : isLoading ? (
            <Loader />
          ) : (
            <EmptyWrapper>
              <EmptyEmoji>📃</EmptyEmoji>
              <EmptyTitle>
                <FormattedMessage id="profile_show/contents/bookmarks_post_empty" />
              </EmptyTitle>
            </EmptyWrapper>
          )}
        </TabContentWrapper>
      </Wrapper>
    </DefaultLayout>
  );
};

export default UserBookmark;
