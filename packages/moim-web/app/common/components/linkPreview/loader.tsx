import * as React from "react";
import Quill from "quill";
import Delta from "quill-delta";
import styled from "styled-components";
import { isObject } from "lodash";
import { px2rem } from "common/helpers/rem";
import { useActions } from "app/store";
import { getScrap } from "app/actions/forum";
import useCancelToken from "common/hooks/useCancelToken";
import { DefaultLoader as Loader } from "common/components/loading";

const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(130)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.colorSet.grey200};
`;

const WhiteLoader = styled(Loader).attrs(props => ({
  color: props.theme.colorV2.colorSet.white1000,
}))``;

interface ILinkPreviewLoadOp {
  "link-preview-loader": {
    type: string;
    url: string;
    placeId: Moim.Id;
  };
}

interface IProps {
  quill: Quill;
  url: string;
  placeId: Moim.Id;
}

const LinkPreviewLoader: React.FC<IProps> = ({ quill, url, placeId }) => {
  const [isLoaded, setLoadStatus] = React.useState(false);
  const cancelTokenSource = useCancelToken(placeId);
  const { fetchScrap } = useActions({
    fetchScrap: getScrap,
  });

  const updateDelta = React.useCallback(
    (linkPreviewData: {
      content: Omit<Moim.Blockit.ILinkPreviewBlock, "type">;
      metadata: {
        cache: string;
        ttl: number;
        scraped_at: number;
      };
    }) => {
      const deltas = quill.getContents();
      const newOps = deltas.map(op => {
        if (
          isObject(op.insert) &&
          op.insert.hasOwnProperty("link-preview-loader") &&
          (op.insert as ILinkPreviewLoadOp)["link-preview-loader"].placeId ===
            placeId
        ) {
          return {
            ...op,
            insert: {
              "link-preview": {
                type: "link-preview",
                placeId,
                linkPreviewData: linkPreviewData.content,
              },
            },
          };
        }
        return op;
      });
      const prevSelection = quill.getSelection();
      quill.updateContents(deltas.diff(new Delta(newOps)), "silent");
      if (prevSelection) {
        quill.setSelection(prevSelection.index, prevSelection.length, "api");
      }
    },
    [placeId, quill],
  );

  const deleteSelf = React.useCallback(() => {
    const deltas = quill.getContents();
    const newOps = deltas.filter(
      op =>
        !(
          isObject(op.insert) &&
          op.insert.hasOwnProperty("link-preview-loader") &&
          (op.insert as ILinkPreviewLoadOp)["link-preview-loader"].placeId ===
            placeId
        ),
    );
    const prevSelection = quill.getSelection();
    quill.updateContents(deltas.diff(new Delta(newOps)), "silent");
    if (prevSelection) {
      quill.setSelection(prevSelection.index, prevSelection.length, "api");
    }
  }, [placeId, quill]);

  const handleGetScrap = React.useCallback(async () => {
    try {
      const linkPreviewData = (
        await fetchScrap(url, cancelTokenSource.current.token)
      )?.data;
      setLoadStatus(true);

      if (linkPreviewData?.content) {
        updateDelta(linkPreviewData);
      } else {
        deleteSelf();
      }
    } catch {
      deleteSelf();
    }
  }, [cancelTokenSource, deleteSelf, fetchScrap, updateDelta, url]);

  React.useEffect(() => {
    if (!isLoaded) {
      handleGetScrap();
    }
  }, [handleGetScrap, isLoaded]);

  React.useEffect(
    () => () => {
      if (!isLoaded) {
        cancelTokenSource.current.cancel();
      }
    },
    [isLoaded],
  );

  return (
    <Wrapper>
      <WhiteLoader />
    </Wrapper>
  );
};

export default LinkPreviewLoader;
