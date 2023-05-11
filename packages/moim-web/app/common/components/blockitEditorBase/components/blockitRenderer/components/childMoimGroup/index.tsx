import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { ChildMoimGroupHooks } from "./hooks";
import useCurrentUser from "common/hooks/useCurrentUser";
import useRedirect from "common/hooks/useRedirect";
// actions
import { bufferedGetChildMoimGroupMoims as getChildMoimGroupMoimsAction } from "app/actions/childMoimGroup";
// helpers
import { selectMoimsById } from "app/selectors/moim";
// component
import QuickJoinDialog, {
  useQuickJoinDialog,
} from "common/components/quickJoinDialog";
import BlockitListLayout from "common/components/blockitListLayout";
import InfiniteScroller from "common/components/infiniteScroller/new";
import InViewTrigger from "../inViewTrigger";
import { Wrapper, Inner, LoadWrapper, Loading, ItemContainer } from "./styled";
import { MoimCellSkeleton } from "./components/moimCell/skeleton";
import MoimItem from "./components/moimCell";
import { withPlacement } from "../../hoc/withPlacement";
import BlockitHeader from "../header";
import { MoimURL } from "common/helpers/url";

interface IProps extends Omit<Moim.Blockit.IChildMoimGroupListBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const DEFAULT_LIMIT = 20;

const ChildMoimGroup: React.FC<IProps> = ({
  title,
  description,
  listElement,
  resourceId,
  header,
}) => {
  const currentUser = useCurrentUser();
  const redirect = useRedirect();
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [isLoading, setLoadStatus] = React.useState(false);

  const isMobile = useIsMobile();
  const { getChildMoimGroupMoims } = useActions({
    getChildMoimGroupMoims: getChildMoimGroupMoimsAction,
  });
  const moims = useStoreState(state =>
    selectMoimsById(
      state,
      state.childMoimGroup.groupByMoims[resourceId]?.data ?? [],
    ),
  );
  const { paging } = useStoreState(state => ({
    paging: state.childMoimGroup.groupByMoims[resourceId]?.paging ?? {},
  }));

  const {
    targetMoimUrl,
    targetMoimId,
    handleOpen,
    open: quickJoinOpenStatus,
    username: targetUsername,
    handleClose: handleCloseQuickJoin,
  } = useQuickJoinDialog();

  const { column } = ChildMoimGroupHooks.useConfig(listElement);

  const handleOpenQuickJoinDialog = React.useCallback(
    (moimUrl: string, moimId: Moim.Id) => {
      if (currentUser) {
        handleOpen(moimUrl, moimId, currentUser.name);
      }
    },
    [currentUser, handleOpen],
  );
  const handleLoadMore = React.useCallback(() => {
    if (!isLoading && paging.after) {
      setLoadStatus(true);
      getChildMoimGroupMoims(
        resourceId,
        DEFAULT_LIMIT,
        cancelTokenSource.current.token,
        {
          after: paging.after,
        },
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    cancelTokenSource,
    getChildMoimGroupMoims,
    isLoading,
    paging.after,
    resourceId,
  ]);

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = moims?.some(thread => thread?.id === undefined);
    if (moims === undefined || isLoading || isUndefinedArray) {
      return new Array(
        column *
          (isMobile || !listElement.rowCount_web
            ? listElement.rowCount
            : listElement.rowCount_web),
      )
        .fill(0)
        .map((_, idx) => (
          <ItemContainer key={`child_moim_group_skeleton_${idx}`}>
            <MoimCellSkeleton />
          </ItemContainer>
        ));
    }

    return moims.map(moim => (
      <ItemContainer key={`child_moim_group_${moim.id}`}>
        <MoimItem moim={moim} onJoinClick={handleOpenQuickJoinDialog} />
      </ItemContainer>
    ));
  }, [
    moims,
    isLoading,
    column,
    isMobile,
    listElement.rowCount_web,
    listElement.rowCount,
    handleOpenQuickJoinDialog,
  ]);

  const handleOnView = React.useCallback(() => {
    if (!isLoading && !moims.length) {
      setLoadStatus(true);
      getChildMoimGroupMoims(
        resourceId,
        DEFAULT_LIMIT,
        cancelTokenSource.current.token,
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    cancelTokenSource,
    getChildMoimGroupMoims,
    isLoading,
    moims?.length,
    resourceId,
  ]);

  const handleClickViewMore = React.useCallback(() => {
    redirect(new MoimURL.ChildMoimGroupMoims({ id: resourceId }).toString());
  }, [redirect, resourceId]);

  React.useLayoutEffect(
    () => () => {
      handleCancel();
    },
    [handleCancel],
  );

  return (
    <Wrapper>
      <InViewTrigger onVisible={handleOnView} />
      <Inner>
        <BlockitHeader
          title={header?.title ?? title}
          description={header?.description ?? description}
          showTitle={header?.showTitle}
          showDescription={header?.showDescription}
          showMoreButton={header?.showMoreButton}
          onClickViewMore={handleClickViewMore}
        />
        <InfiniteScroller
          itemLength={moims.length}
          threshold={700}
          paging={paging}
          loader={
            <LoadWrapper>
              <Loading />
            </LoadWrapper>
          }
          loadMore={handleLoadMore}
        >
          <BlockitListLayout element={listElement}>
            {itemElements}
          </BlockitListLayout>
        </InfiniteScroller>
      </Inner>
      <QuickJoinDialog
        open={quickJoinOpenStatus}
        targetMoimDomain={targetMoimUrl}
        targetMoimId={targetMoimId}
        username={targetUsername}
        onClose={handleCloseQuickJoin}
      />
    </Wrapper>
  );
};

export default withPlacement(React.memo(ChildMoimGroup));
