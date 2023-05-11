import React from "react";
import { Link } from "react-router-dom";
import {
  Wrapper,
  Header,
  ClearAllButton,
  List,
  ListWrapper,
  History,
} from "./styled";
import InViewTrigger from "common/components/blockitEditorBase/components/blockitRenderer/components/inViewTrigger";
import Empty from "./empty";
import { SkeletonRadiusBox } from "common/components/skeleton";
import { deleteSearchHistories, getSearchHistories } from "app/actions/me";
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useIntlShort } from "common/hooks/useIntlShort";
import { MoimURL } from "common/helpers/url";
import { px2rem } from "common/helpers/rem";

const RecentHistoriesBlock: React.FC<{
  block: Moim.Group.IRecentHistoriesBlock;
  onClose?(): void;
}> = ({ block, onClose }) => {
  const intl = useIntlShort();
  const cancelToken = useCancelToken();
  const [histories, setHistories] = React.useState<Moim.IPaginatedListResponse<
    Moim.User.ISearchHistory
  > | null>();

  const {
    dispatchDeleteSearchHistories,
    dispatchGetSearchHistories,
  } = useActions({
    dispatchGetSearchHistories: getSearchHistories,
    dispatchDeleteSearchHistories: deleteSearchHistories,
  });

  const handleGetSearchHistories = React.useCallback(async () => {
    const result = await dispatchGetSearchHistories(cancelToken?.current.token);

    setHistories(result);
  }, []);

  const handleClearHistories = React.useCallback(async () => {
    await dispatchDeleteSearchHistories(
      { isDeleteAll: true },
      cancelToken?.current.token,
    );

    setHistories({ data: [], paging: {} });
  }, []);

  return (
    <Wrapper>
      <InViewTrigger onVisible={handleGetSearchHistories} />
      <Header>
        <span>
          {block.header?.title ?? intl("search_recent_keyword_title")}
        </span>
        <ClearAllButton onClick={handleClearHistories}>
          {intl("button_clear_all_delete")}
        </ClearAllButton>
      </Header>
      {histories === null ||
      Boolean(histories?.data && histories?.data.length === 0) ? (
        <Empty />
      ) : (
        <ListWrapper>
          <List>
            {histories
              ? histories?.data.map((history, index) => (
                  <Link
                    key={`${history.query}_${index}`}
                    to={new MoimURL.Search({ query: history.query }).toString()}
                    onClick={onClose}
                  >
                    <History shape="round" size="large">
                      {history.query}
                    </History>
                  </Link>
                ))
              : new Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <SkeletonRadiusBox
                      key={index}
                      radius={px2rem(16)}
                      width={px2rem(60)}
                      height={px2rem(32)}
                    />
                  ))}
          </List>
        </ListWrapper>
      )}
    </Wrapper>
  );
};

export default RecentHistoriesBlock;
