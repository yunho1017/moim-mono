// vendor
import * as React from "react";
import { MoimURL } from "common/helpers/url";
// component
import { ThreadRenderer } from "common/components/thread";
// utils
import { useStoreState } from "app/store";
import { useListItemImageScale } from "common/components/lazyBlurHashImage";
import { useRedirectPostShowModal } from "app/modules/postShow/modal";
import useRedirect from "common/hooks/useRedirect";
import getIsUnread from "common/helpers/getIsUnread";
import { Thread } from "app/typings";

export interface IProps {
  thread: Moim.Forum.IThread;
  config?: Thread.IThreadItemConfig;
}

const PostCell: React.FC<IProps> = props => {
  const { thread, config } = props;
  const { threadStat } = useStoreState(state => ({
    threadStat: state.entities.stats[thread.id],
  }));
  const imageScale = useListItemImageScale();
  const redirect = useRedirect();

  const redirectPostShowModal = useRedirectPostShowModal({
    postId: thread.id,
    tagSetIds: config?.tagSets,
    groupId: thread.groupId,
  });

  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      if (thread.type.startsWith("product")) {
        e.preventDefault();
        switch (thread.type) {
          case "productReview": {
            redirect(
              new MoimURL.CommerceProductShowReview({
                id: thread.parent_id,
                threadId: thread.id,
              }).toString(),
            );
            break;
          }
          case "productQuestion": {
            redirect(
              new MoimURL.CommerceProductShowQnA({
                id: thread.parent_id,
                threadId: thread.id,
              }).toString(),
            );
            break;
          }
        }
      } else {
        redirectPostShowModal();
      }
    },
    [
      redirect,
      thread.id,
      thread.meta,
      thread.parent_id,
      thread.type,
      redirectPostShowModal,
    ],
  );

  const stat = React.useMemo(
    () => ({
      count: threadStat?.count,
      isUnread:
        (thread.read_at !== undefined && !thread.read_at) ||
        getIsUnread({
          latest: thread.latest,
          lastRead: threadStat?.last_read,
          statCount: threadStat?.count,
        }),
    }),
    [threadStat?.count, threadStat?.last_read, thread.read_at, thread.latest],
  );

  return (
    <div role="button" onClick={handleClick}>
      <ThreadRenderer
        threadId={thread.id}
        config={config ?? {}}
        stat={stat}
        thumbnailScale={imageScale}
      />
    </div>
  );
};

export default React.memo(PostCell);
