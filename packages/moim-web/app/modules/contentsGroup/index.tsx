import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router";
// hooks
import { useActions, useStoreState } from "app/store";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
// helpers
import { MoimURL } from "common/helpers/url";
import { selectThreadListById } from "app/selectors/forum";
// actions
import {
  getContentsGroupThreads as getContentsGroupThreadsAction,
  getContentsGroupData as getContentsGroupDataAction,
} from "app/actions/contentsGroup";
// component
import ThreadListComponent from "./components/threadList";
import { DefaultLoader } from "common/components/loading";

const DEFAULT_LIMIT = 20;

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const ContentsGroupThreadsContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as { id: Moim.Id };
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [isFetched, setFetched] = React.useState(false);
  const [isLoading, setLoadStatus] = React.useState(false);
  const [
    contentsGroupData,
    setContentsGroup,
  ] = React.useState<Moim.ContentsGroup.IContentsGroupData | null>(null);

  const { getContentsGroupThreads, getContentsGroupData } = useActions({
    getContentsGroupThreads: getContentsGroupThreadsAction,
    getContentsGroupData: getContentsGroupDataAction,
  });
  const threads = useStoreState(state =>
    selectThreadListById(
      state,
      state.contentsGroup.groupByThreads[id]?.data ?? [],
    ),
  );
  const { paging } = useStoreState(state => ({
    paging: state.contentsGroup.groupByThreads[id]?.paging ?? {},
  }));

  const handleLoadMore = React.useCallback(() => {
    if (!isLoading && paging.after) {
      setLoadStatus(true);
      getContentsGroupThreads(
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
  }, [cancelTokenSource, getContentsGroupThreads, isLoading, paging.after, id]);

  React.useEffect(() => {
    if (id) {
      setLoadStatus(true);
      const promise: Promise<any>[] = [
        getContentsGroupData(id, cancelTokenSource.current.token),
      ];
      if (threads.length === 0) {
        promise.push(
          getContentsGroupThreads(
            id,
            DEFAULT_LIMIT,
            cancelTokenSource.current.token,
          ),
        );
      }
      Promise.all(promise)
        .then(([contentsGroupResponse]) => {
          if (contentsGroupResponse) {
            setContentsGroup(contentsGroupResponse);
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

  if (!id || (isFetched && !contentsGroupData)) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }
  if (contentsGroupData?.detailUrl) {
    const nl = new URL(contentsGroupData.detailUrl);
    if (nl.hostname === location.hostname) {
      return (
        <Redirect
          to={{
            pathname: nl.pathname,
            search: location.search,
          }}
        />
      );
    } else {
      location.href = contentsGroupData.detailUrl;
    }
  }

  if (!contentsGroupData?.listConfig) {
    return <DefaultLoader />;
  }

  return (
    <ThreadListComponent
      isFetched={isFetched}
      isLoading={isLoading}
      title={contentsGroupData?.title ?? ""}
      resourceId={id}
      threads={threads}
      paging={paging}
      listShowConfig={contentsGroupData?.listConfig}
      onLoadMore={handleLoadMore}
    />
  );
};

export default ContentsGroupThreadsContainer;
