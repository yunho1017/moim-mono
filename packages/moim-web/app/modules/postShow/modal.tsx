import * as React from "react";
import * as qs from "query-string";
import { useLocation } from "react-router";
import { replace } from "connected-react-router";
import { useStoreState, useActions } from "app/store";
import { getThreadShow } from "app/actions/forum";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";

import ModalView from "common/layouts/listAndModal/components/desktop/modal";
import EmptyThread from "./components/emptyThread";
import { DefaultLoader } from "common/components/loading";
import PostShow from ".";

interface IPostShowModalQueryParams {
  tagSetIds?: Moim.Id[];
  groupId?: Moim.Id;
  postId?: Moim.Id;
}

const ThreadShowModal: React.FC<{ postId: string }> = React.memo(
  ({ postId }) => {
    const isMobile = useIsMobile();
    const location = useLocation();
    const queryParams = qs.parse(location.search, {
      arrayFormat: "bracket",
    }) as IPostShowModalQueryParams;
    const groupId = queryParams.groupId;
    const tagSetIds = queryParams.tagSetIds;

    const [isLoading, setLoadStatus] = React.useState(false);
    const [isLoaded, setLoadedStatus] = React.useState(false);
    const {
      cancelTokenSource,
      handleCancel,
    } = useCancelTokenWithCancelHandler();

    const thread = useStoreState(state =>
      postId ? state.entities.threads[postId] : null,
    );

    const { fetchThread, dispatchReplace } = useActions({
      fetchThread: getThreadShow,
      dispatchReplace: replace,
    });

    const handleClose = React.useCallback(() => {
      const queryParams = qs.parse(location.search);
      delete queryParams["groupId"];
      delete queryParams["tagSetIds"];
      delete queryParams["postId"];

      dispatchReplace({
        pathname: location.pathname,
        search: qs.stringify(queryParams),
      });
    }, [location.pathname, location.search]);

    const content = React.useMemo(() => {
      if (!thread || !postId) {
        if (isLoaded) {
          return <EmptyThread />;
        }
        return <DefaultLoader />;
      }

      return (
        <PostShow
          post={thread}
          isModalShow={true}
          tagSetIds={tagSetIds}
          onBack={handleClose}
        />
      );
    }, [isLoaded, postId, tagSetIds, thread, handleClose]);

    React.useEffect(() => {
      if (postId && !isLoading) {
        setLoadStatus(true);
        setLoadedStatus(false);
        fetchThread(
          postId,
          cancelTokenSource.current.token,
          undefined,
          groupId || undefined,
        ).finally(() => {
          setLoadStatus(false);
          setLoadedStatus(true);
        });
      }
      return () => {
        handleCancel();
        setLoadedStatus(false);
      };
    }, [postId]);

    return (
      <ModalView
        open={true}
        fullScreen={isMobile}
        onClose={handleClose}
        appBar={undefined}
      >
        {content}
      </ModalView>
    );
  },
);

export default function ThreadShowModalContainer() {
  const queryParams = qs.parse(location.search, {
    arrayFormat: "bracket",
  }) as IPostShowModalQueryParams;
  const postId = queryParams.postId;

  if (!postId) {
    return null;
  }

  return <ThreadShowModal postId={postId} />;
}

export function useRedirectPostShowModal(
  params: IPostShowModalQueryParams & { postId: string },
) {
  const redirect = useRedirect();
  const location = useLocation();

  return React.useCallback(() => {
    const query = qs.parse(location.search, { arrayFormat: "bracket" });
    redirect({
      pathname: location.pathname,
      search: qs.stringify({
        ...query,
        postId: params.postId,
        groupId: params.groupId,
        tagSetIds: params.tagSetIds,
      }),
    });
  }, [
    location.pathname,
    location.search,
    params.groupId,
    params.postId,
    params.tagSetIds,
  ]);
}
