import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import uuid from "uuid";
// hooks
import { useActions } from "app/store";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { useParseListElementConfig } from "common/components/blockitListLayout/hooks/useParseListElementConfig";
// actions
import { getContentsGroupPreview } from "app/actions/contentsGroup";

// component
import InViewTrigger from "../../inViewTrigger";
import { ArrowContainer } from "common/components/blockitEditorBase/styled";
import { Wrapper, Inner } from "../styled";

import BlockitHeader from "../../header";
import BlockitFooter from "../../footer";
import ContentsGroupItemList from "./list";

interface IProps extends Omit<Moim.Blockit.IContentGroupPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  query: Moim.ContentsGroup.IQuery;
}

const DEFAULT_LIMIT = 40;

const ContentGroupPreviewWithQueries: React.FC<IProps> = ({
  title,
  description,
  header,
  footer,
  listElement,
  listShowConfig,
  query,
}) => {
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [threads, setThreads] = React.useState<
    Moim.IPaginatedListResponse<Moim.Forum.IThread>
  >({ data: [], paging: {} });
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const portalSectionId = React.useMemo(
    () => `contents-group-preview-portal-${uuid.v4()}`,
    [],
  );
  const { dispatchGetContentsGroupPreview } = useActions({
    dispatchGetContentsGroupPreview: getContentsGroupPreview,
  });

  const { listElementType, maxVisibleCount } = useParseListElementConfig(
    listElement,
  );

  const handleOnView = React.useCallback(() => {
    if (!isLoading) {
      setLoadStatus(true);

      dispatchGetContentsGroupPreview(
        { query, limit: DEFAULT_LIMIT },
        cancelTokenSource.current.token,
      )
        .then(result => {
          setThreads(result);
        })
        .finally(() => {
          setLoadStatus(false);
        });
    }
  }, [isLoading, query, maxVisibleCount, cancelTokenSource]);

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
          showTitle={header?.showTitle ?? true}
          showDescription={header?.showDescription ?? true}
          showMoreButton={header?.showMoreButton ?? true}
          titleElement={header?.titleElement}
        />
        {listElementType === "horizontal" && (
          <ArrowContainer id={portalSectionId} />
        )}
        <ContentsGroupItemList
          threads={threads.data}
          portalSectionId={portalSectionId}
          isLoading={isLoading === undefined || isLoading}
          listElement={listElement}
          listShowConfig={listShowConfig}
        />
        <BlockitFooter
          textKey="button_see_more_content_group"
          showMoreButton={footer?.showMoreButton ?? false}
        />
      </Inner>
    </Wrapper>
  );
};

export default React.memo(ContentGroupPreviewWithQueries);
