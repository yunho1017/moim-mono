import * as React from "react";
import { useStoreState, useActions } from "app/store";
import { selectDraftList } from "app/selectors/draft";
import { useIntl } from "react-intl";
import { useCancelTokenWithCancelHandler } from "app/common/hooks/useCancelToken";
import InfiniteScroller from "common/components/infiniteScroller/new";
import {
  ActionCreators as DraftActionCreators,
  getDraftList as getDraftListAction,
  deleteDraft as deleteDraftAction,
  getAllDraftCount as getAllDraftCountAction,
} from "app/actions/draft";
import DraftItem from "./components/draftItem";
import EmptyComponent from "./components/empty";
import { Wrapper } from "./styled";
import FreezeView from "common/components/freezeView";

interface IProps {
  enableDeleteMode: boolean;
}

const DraftListComponent: React.FC<IProps> = ({ enableDeleteMode }) => {
  const intl = useIntl();
  const [initialFetched, setInitialFetchStatus] = React.useState(false);
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const { drafts, isListLoading, paging } = useStoreState(state => ({
    drafts: selectDraftList(state),
    count: state.draftState.draftCount,
    paging: state.draftState.drafts.paging,
    isListLoading: state.draftState.isListLoading,
    isDeleting: state.draftState.isDeleting,
  }));

  const {
    getAllDraftCount,
    getDraftList,
    deleteDraft,
    closeModal,
  } = useActions({
    getAllDraftCount: getAllDraftCountAction,
    getDraftList: getDraftListAction,
    deleteDraft: deleteDraftAction,
    closeModal: DraftActionCreators.closeDraftListModal,
  });

  const handleDelete = React.useCallback(
    (parentId: Moim.Id, threadId: Moim.Id) => {
      deleteDraft(
        {
          channelId: parentId,
          threadId,
        },
        {
          success: intl.formatMessage({ id: "delete_success_toast_message" }),
          failed: intl.formatMessage({ id: "delete_failure_toast_message" }),
        },
      );
    },
    [deleteDraft, intl],
  );

  const draftElements = React.useMemo(
    () =>
      drafts.data.length === 0 ? (
        <EmptyComponent />
      ) : (
        drafts.data.map(item => (
          <DraftItem
            key={`draft_items_${item.id}`}
            thread={item}
            enableDeleteButton={enableDeleteMode}
            onClick={closeModal}
            onDelete={handleDelete}
          />
        ))
      ),
    [drafts.data, enableDeleteMode, closeModal, handleDelete],
  );

  const loadMore = React.useCallback(() => {
    if (!isListLoading && Boolean(paging.after)) {
      getDraftList({ cancelToken: cancelTokenSource.current.token, paging });
    }
  }, [cancelTokenSource, getDraftList, isListLoading, paging]);

  React.useEffect(() => {
    getAllDraftCount();
  }, [getAllDraftCount]);

  React.useEffect(() => {
    if (!isListLoading && !initialFetched) {
      getDraftList({ cancelToken: cancelTokenSource.current.token });
      setInitialFetchStatus(true);
    }
  }, [cancelTokenSource, getDraftList, initialFetched, isListLoading]);

  React.useEffect(
    () => () => {
      handleCancel();
    },
    [handleCancel],
  );

  return (
    <FreezeView isFreeze={false}>
      <Wrapper>
        <InfiniteScroller
          itemLength={drafts.data.length || 0}
          isLoading={isListLoading}
          loadMore={loadMore}
          paging={paging}
        >
          {draftElements}
        </InfiniteScroller>
      </Wrapper>
    </FreezeView>
  );
};

export default DraftListComponent;
