import { getMoimCover } from "app/actions/group";
import { useActions, useStoreState } from "app/store";
import safeParseJSON from "common/helpers/safeParseJSON";
import useCancelToken from "common/hooks/useCancelToken";
import { useCallback, useEffect, useState } from "react";

export interface ICoverData {
  group_id: string;
  content:
    | Moim.Group.IImageCover
    | Moim.Group.IURLCover
    | Moim.Group.IHTMLCover
    | Moim.Group.IBlockCover;
}

export default function useHooks() {
  const { cover, getCoverLoading } = useStoreState(state => ({
    cover: state.group.cover,
    getCoverLoading: state.group.getMoimCoverLoading,
  }));

  const cancelToken = useCancelToken();
  const { dispatchGetMoimCover } = useActions({
    dispatchGetMoimCover: getMoimCover,
  });

  const [coverPreview, setCoverPreview] = useState<ICoverData | null>(null);

  const handleGetCoverPreview = useCallback((event: MessageEvent) => {
    if (event.origin.includes("can-admin")) {
      const preview = safeParseJSON(event.data) as ICoverData;

      if (preview.content && preview.group_id) {
        setCoverPreview(preview);
      }
    }
  }, []);

  useEffect(() => {
    dispatchGetMoimCover(cancelToken.current.token);
  }, [cancelToken, dispatchGetMoimCover]);

  useEffect(() => {
    window.addEventListener("message", handleGetCoverPreview, false);
    return () => window.removeEventListener("message", handleGetCoverPreview);
  }, [handleGetCoverPreview]);

  return {
    cover: coverPreview
      ? coverPreview
      : cover
      ? {
          group_id: cover.group_id,
          content: cover.content,
        }
      : undefined,
    getCoverLoading,
  };
}
