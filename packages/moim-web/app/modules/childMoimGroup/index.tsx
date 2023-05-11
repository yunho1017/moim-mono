import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router";
// hooks
import { useActions, useStoreState } from "app/store";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import useCurrentUser from "common/hooks/useCurrentUser";
// helpers
import { MoimURL } from "common/helpers/url";
import { selectMoimsById } from "app/selectors/moim";
// actions
import {
  bufferedGetChildMoimGroupMoims as getChildMoimGroupMoimsAction,
  bufferedGetChildMoimGroupData as getChildMoimGroupDataAction,
} from "app/actions/childMoimGroup";
// component
import MoimListComponent from "./components/moimList";
import { DefaultLoader } from "common/components/loading";
import QuickJoinDialog, {
  useQuickJoinDialog,
} from "common/components/quickJoinDialog";

const DEFAULT_LIMIT = 20;

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const ContentsGroupThreadsContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as { id: Moim.Id };
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [isFetched, setFetched] = React.useState(false);
  const [isLoading, setLoadStatus] = React.useState(false);
  const [
    childMoimGroupData,
    setChildMoimGroup,
  ] = React.useState<Moim.ChildMoimGroup.IChildMoimGroupData | null>(null);

  const currentUser = useCurrentUser();

  const { getChildMoimGroupMoims, getChildMoimGroupData } = useActions({
    getChildMoimGroupMoims: getChildMoimGroupMoimsAction,
    getChildMoimGroupData: getChildMoimGroupDataAction,
  });
  const moims = useStoreState(state =>
    selectMoimsById(state, state.childMoimGroup.groupByMoims[id]?.data ?? []),
  );
  const paging = useStoreState(
    state => state.childMoimGroup.groupByMoims[id]?.paging ?? {},
  );

  const {
    targetMoimUrl,
    targetMoimId,
    handleOpen,
    open: quickJoinOpenStatus,
    username: targetUsername,
    handleClose: handleCloseQuickJoin,
  } = useQuickJoinDialog();

  const handleLoadMore = React.useCallback(() => {
    if (!isLoading && paging.after) {
      setLoadStatus(true);
      getChildMoimGroupMoims(
        id,
        DEFAULT_LIMIT,
        cancelTokenSource.current.token,
        {
          after: paging.after,
        },
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [cancelTokenSource, getChildMoimGroupMoims, isLoading, paging.after, id]);

  const handleOpenQuickJoinDialog = React.useCallback(
    (moimUrl: string, moimId: Moim.Id) => {
      if (currentUser) {
        handleOpen(moimUrl, moimId, currentUser.name);
      }
    },
    [currentUser, handleOpen],
  );

  React.useEffect(() => {
    if (id) {
      setLoadStatus(true);

      const promise: Promise<any>[] = [
        getChildMoimGroupData(id, cancelTokenSource.current.token),
      ];
      if (moims.length === 0) {
        promise.push(
          getChildMoimGroupMoims(
            id,
            DEFAULT_LIMIT,
            cancelTokenSource.current.token,
          ),
        );
      }
      Promise.all(promise)
        .then(([contentsGroupResponse]) => {
          if (contentsGroupResponse) {
            setChildMoimGroup(contentsGroupResponse);
          }
        })
        .finally(() => {
          setFetched(true);
          setLoadStatus(false);
        });
    }
  }, [id]);

  React.useLayoutEffect(
    () => () => {
      handleCancel();
    },
    [handleCancel],
  );

  if (!id || (isFetched && !childMoimGroupData)) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  if (!childMoimGroupData?.listConfig) {
    return <DefaultLoader />;
  }

  return (
    <>
      <MoimListComponent
        isFetched={isFetched}
        isLoading={isLoading}
        title={childMoimGroupData?.title ?? ""}
        resourceId={id}
        moims={moims}
        paging={paging}
        listShowConfig={childMoimGroupData?.listConfig}
        onLoadMore={handleLoadMore}
        onJoinClick={handleOpenQuickJoinDialog}
      />

      <QuickJoinDialog
        open={quickJoinOpenStatus}
        targetMoimDomain={targetMoimUrl}
        targetMoimId={targetMoimId}
        username={targetUsername}
        onClose={handleCloseQuickJoin}
      />
    </>
  );
};

export default ContentsGroupThreadsContainer;
