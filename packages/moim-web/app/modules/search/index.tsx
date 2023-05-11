import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router";
import { replace as replaceAction } from "connected-react-router";
// helpers
import { useActions } from "app/store";
import { MoimURL } from "common/helpers/url";
import { useCancelTokenWithCancelHandler } from "app/common/hooks/useCancelToken";
import useIsMobile from "app/common/hooks/useIsMobile";
import useGroupTexts from "common/hooks/useGroupTexts";
import useCurrentGroup from "common/hooks/useCurrentGroup";
// actions
import {
  ActionCreators as ForumActionCreators,
  searchThreads as searchThreadsAction,
} from "app/actions/forum";
import {
  ActionCreators as ConversationActionCreators,
  getSearchMessages as getSearchMessagesAction,
} from "app/actions/conversation";
import {
  ActionCreators as UserActionCreators,
  searchPageSearchUsers as searchPageSearchUsersAction,
} from "app/actions/user";
import {
  ActionCreators as GroupActionCreators,
  getSearchMoims as getSearchMoimsAction,
} from "app/actions/group";
import {
  ActionCreators as CommerceActionCreators,
  searchProductsByQuery as searchProductsByQueryAction,
} from "app/actions/commerce";
// container
import SearchThreads from "./container/threads";
import SearchUsers from "./container/users";
import SearchMessages from "./container/messages";
import SearchMoims from "./container/moims";
import SearchProducts, { PAGE_ITEM_SIZE } from "./container/products";
// components
import MobileSearchButton from "./container/searchInput/mobile";
import { TabItemComponent } from "common/components/tab";
import {
  Container,
  Header,
  TabsWrapper,
  Tab,
  ContentContainer,
} from "./styled";
import { SearchResultTabTypes } from "app/enums";

type IProps = RouteComponentProps<Moim.IMatchParams>;

const SearchContainer: React.FC<IProps> = ({ match }) => {
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const childMoimTexts = useGroupTexts("child_moim");
  const memberTexts = useGroupTexts("member");
  const productTexts = useGroupTexts("search_result_menu_products");
  const { cancelTokenSource } = useCancelTokenWithCancelHandler();
  const {
    replace,
    searchThreads,
    getSearchMessages,
    searchPageSearchUsers,
    getSearchMoims,
    searchProductsByQuery,
    clearSearchedForum,
    clearSearchedConversation,
    clearSearchedUser,
    clearSearchedMoim,
  } = useActions({
    replace: replaceAction,
    searchThreads: searchThreadsAction,
    getSearchMessages: getSearchMessagesAction,
    searchPageSearchUsers: searchPageSearchUsersAction,
    getSearchMoims: getSearchMoimsAction,
    searchProductsByQuery: searchProductsByQueryAction,

    clearSearchedForum: ForumActionCreators.clearSearchThreads,
    clearSearchedConversation: ConversationActionCreators.clearSearchMessages,
    clearSearchedUser: UserActionCreators.clearSearchPageSearchUsers,
    clearSearchedMoim: GroupActionCreators.clearSearchMoims,
    clearSearchProducts: CommerceActionCreators.clearSearchProductsByQuery,
  });

  const firstTab = currentGroup?.search_tabs[0];

  const selectedTab = React.useMemo(() => {
    switch (match.params.tab) {
      case SearchResultTabTypes.POST: {
        return SearchResultTabTypes.POST;
      }
      case SearchResultTabTypes.PRODUCT: {
        return SearchResultTabTypes.PRODUCT;
      }
      case SearchResultTabTypes.MESSAGE: {
        return SearchResultTabTypes.MESSAGE;
      }
      case SearchResultTabTypes.MEMBER: {
        return SearchResultTabTypes.MEMBER;
      }
      case SearchResultTabTypes.GROUP: {
        return SearchResultTabTypes.GROUP;
      }
      default: {
        return firstTab;
      }
    }
  }, [firstTab, match.params.tab]);

  const getTabText = React.useCallback(
    (tabType: Moim.Enums.SearchResultTabType) => {
      switch (tabType) {
        case SearchResultTabTypes.PRODUCT:
          return productTexts?.plural ?? "";
        case SearchResultTabTypes.MEMBER:
          return memberTexts?.plural ?? "";
        case SearchResultTabTypes.GROUP:
          return childMoimTexts?.plural ?? "";
        case SearchResultTabTypes.POST:
          return <FormattedMessage id="search_results/menu_posts" />;
        case SearchResultTabTypes.MESSAGE:
          return <FormattedMessage id="search_results/menu_messages" />;
      }
    },
    [productTexts, memberTexts, childMoimTexts],
  );

  const handleTabClick = React.useCallback(
    (type: Moim.Enums.SearchResultTabType) => {
      if (match.params.query) {
        replace(
          new MoimURL.SearchWithTab({
            query: match.params.query,
            tab: type,
          }).toString(),
        );
      }
    },
    [match.params.query, replace],
  );

  const mobileHeader = React.useMemo(() => {
    if (!isMobile) return null;

    return (
      <>
        <MobileSearchButton
          showInputBox={true}
          initialValue={match.params.query}
        />
      </>
    );
  }, [isMobile, match.params.query]);

  const tabs = React.useMemo(
    () =>
      currentGroup?.search_tabs
        .map(tab => {
          if (
            tab === SearchResultTabTypes.PRODUCT &&
            !currentGroup?.seller_id
          ) {
            return undefined;
          }
          return (
            <TabItemComponent
              key={tab}
              type={tab}
              onClick={handleTabClick}
              active={tab === selectedTab}
            >
              {getTabText(tab)}
            </TabItemComponent>
          );
        })
        .filter(i => Boolean(i)),
    [
      childMoimTexts,
      currentGroup,
      handleTabClick,
      memberTexts,
      selectedTab,
      getTabText,
    ],
  );

  React.useEffect(() => {
    if (match.params.query) {
      clearSearchedForum();
      clearSearchedConversation();
      clearSearchedUser();
      clearSearchedMoim();
    }
  }, [
    clearSearchedConversation,
    clearSearchedForum,
    clearSearchedMoim,
    clearSearchedUser,
    match.params.query,
  ]);

  React.useEffect(() => {
    if (match.params.query) {
      searchThreads(
        {
          type: ["post", "reply"],
          query: match.params.query,
        },
        cancelTokenSource.current.token,
      );
      getSearchMessages(
        { query: match.params.query },
        cancelTokenSource.current.token,
      );
      searchPageSearchUsers(
        { query: match.params.query },
        cancelTokenSource.current.token,
      );
      getSearchMoims(
        { query: match.params.query },
        cancelTokenSource.current.token,
      );
      if (currentGroup?.seller_id) {
        searchProductsByQuery(
          currentGroup.seller_id,
          {
            query: match.params.query,
            from: 0,
            limit: PAGE_ITEM_SIZE,
          },
          0,
          true,
          cancelTokenSource.current.token,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.query]);

  const getPath = React.useCallback(
    (tab: Moim.Enums.SearchResultTabType) =>
      firstTab === tab
        ? [`/search/:query/${tab}`, MoimURL.Search.pattern]
        : `/search/:query/${tab}`,
    [firstTab],
  );
  return (
    <Container>
      <Header>
        {mobileHeader}
        <TabsWrapper>
          <Tab>{tabs}</Tab>
        </TabsWrapper>
      </Header>
      <ContentContainer>
        <Switch>
          <Route
            path={getPath(SearchResultTabTypes.MESSAGE)}
            component={SearchMessages}
            exact={true}
          />
          <Route
            path={getPath(SearchResultTabTypes.MEMBER)}
            component={SearchUsers}
            exact={true}
          />
          <Route
            path={getPath(SearchResultTabTypes.GROUP)}
            component={SearchMoims}
            exact={true}
          />
          <Route
            path={getPath(SearchResultTabTypes.POST)}
            component={SearchThreads}
            exact={true}
          />
          {currentGroup?.seller_id && (
            <Route
              path={getPath(SearchResultTabTypes.PRODUCT)}
              component={SearchProducts}
              exact={true}
            />
          )}
        </Switch>
      </ContentContainer>
    </Container>
  );
};

export default SearchContainer;
