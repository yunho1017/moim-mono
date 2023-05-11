import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import uuid from "uuid";
// hooks
import { useActions, useStoreState } from "app/store";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { useParseListElementConfig } from "common/components/blockitListLayout/hooks/useParseListElementConfig";
import useRedirect from "common/hooks/useRedirect";
// actions
import {
  getContentsGroupThreads as getContentsGroupThreadsAction,
  getContentsGroupData as getContentsGroupDataAction,
} from "app/actions/contentsGroup";
// helpers
import { MoimURL } from "common/helpers/url";
// component
import InViewTrigger from "../../inViewTrigger";
import { ArrowContainer } from "common/components/blockitEditorBase/styled";
import { Wrapper, Inner } from "../styled";

import { selectThreadListById } from "app/selectors/forum";
import BlockitHeader from "../../header";
import BlockitFooter from "../../footer";
import ContentsGroupItemList from "./list";

interface IProps extends Omit<Moim.Blockit.IContentGroupPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  resourceId: string;
}

const DEFAULT_LIMIT = 20;

const ContentGroupPreviewWithResourceId: React.FC<IProps> = ({
  title,
  description,
  header,
  footer,
  listElement,
  listShowConfig,
  resourceId,
}) => {
  const redirect = useRedirect();
  const [
    contentsGroupData,
    setContentsGroup,
  ] = React.useState<Moim.ContentsGroup.IContentsGroupData | null>(null);
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const portalSectionId = React.useMemo(
    () => `contents-group-preview-portal-${uuid.v4()}`,
    [],
  );
  const { getContentsGroupThreads, getContentsGroupData } = useActions({
    getContentsGroupThreads: getContentsGroupThreadsAction,
    getContentsGroupData: getContentsGroupDataAction,
  });
  const threads = useStoreState(state =>
    state.contentsGroup.groupByThreads[resourceId]?.data
      ? selectThreadListById(
          state,
          state.contentsGroup.groupByThreads[resourceId].data,
        )
      : undefined,
  );

  const { listElementType, maxVisibleCount } = useParseListElementConfig(
    listElement,
  );

  const handleClickViewMore = React.useCallback(() => {
    const defaultRedirectUrl = new MoimURL.ContentsGroupThreads({
      id: resourceId,
    }).toString();
    const redirectUrl = contentsGroupData?.detailUrl;

    if (!redirectUrl) {
      redirect(defaultRedirectUrl);
    } else {
      const nl = new URL(redirectUrl);

      if (nl.hostname === location.hostname) {
        redirect(defaultRedirectUrl);
      } else {
        window.open(redirectUrl, "_blank");
      }
    }
  }, [contentsGroupData, redirect, resourceId]);

  const handleOnView = React.useCallback(() => {
    if (!isLoading) {
      setLoadStatus(true);
      getContentsGroupData(resourceId).then(contentsGroupResponse => {
        if (contentsGroupResponse) {
          setContentsGroup(contentsGroupResponse);
        }
      });
      getContentsGroupThreads(
        resourceId,
        maxVisibleCount ?? DEFAULT_LIMIT,
        cancelTokenSource.current.token,
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    isLoading,
    getContentsGroupData,
    resourceId,
    getContentsGroupThreads,
    maxVisibleCount,
    cancelTokenSource,
  ]);

  React.useLayoutEffect(
    () => () => {
      handleCancel();
    },
    [handleCancel],
  );

  return (
    <Wrapper>
      <InViewTrigger onVisible={handleOnView} />
      {/* here */}
      <Inner>
        <BlockitHeader
          title={header?.title ?? title}
          description={header?.description ?? description}
          showTitle={header?.showTitle ?? true}
          showDescription={header?.showDescription ?? true}
          showMoreButton={header?.showMoreButton ?? true}
          onClickViewMore={handleClickViewMore}
        />
        {listElementType === "horizontal" && (
          <ArrowContainer id={portalSectionId} />
        )}
        <ContentsGroupItemList
          threads={threads}
          portalSectionId={portalSectionId}
          isLoading={Boolean(
            (!threads?.length && isLoading === undefined) || isLoading,
          )}
          listElement={listElement}
          listShowConfig={listShowConfig}
        />
        <BlockitFooter
          textKey="button_see_more_content_group"
          showMoreButton={footer?.showMoreButton ?? false}
          onClickViewMore={handleClickViewMore}
        />
      </Inner>
    </Wrapper>
  );
};

export default React.memo(ContentGroupPreviewWithResourceId);
