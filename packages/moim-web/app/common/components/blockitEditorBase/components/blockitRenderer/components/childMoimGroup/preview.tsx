import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import uuid from "uuid";
// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { ChildMoimGroupHooks } from "./hooks";
import useCurrentUser from "common/hooks/useCurrentUser";
import useRedirect from "common/hooks/useRedirect";
import useGroupTexts from "common/hooks/useGroupTexts";
// actions
import { bufferedGetChildMoimGroupMoims as getChildMoimGroupMoimsAction } from "app/actions/childMoimGroup";
// helpers
// component
import QuickJoinDialog, {
  useQuickJoinDialog,
} from "common/components/quickJoinDialog";
import {
  PortalRightArrow,
  PortalLeftArrow,
} from "common/components/horizontalScroll/arrows";
import BlockitListLayout from "common/components/blockitListLayout";
import InViewTrigger from "../inViewTrigger";
import { BlockitFeedback } from "../feedback";
import { MoimCellSkeleton } from "./components/moimCell/skeleton";
import MoimItem from "./components/moimCell";
import { withPlacement } from "../../hoc/withPlacement";
import BlockitHeader from "../header";
import BlockitFooter from "../footer";
import { selectMoimsById } from "app/selectors/moim";
import { MoimURL } from "common/helpers/url";
import { Wrapper, Inner, ListWrapper, ItemContainer } from "./styled";
import { ArrowContainer } from "common/components/blockitEditorBase/styled";

interface IProps
  extends Omit<Moim.Blockit.IChildMoimGroupListPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const DEFAULT_LIMIT = 20;

const ChildMoimGroupPreview: React.FC<IProps> = ({
  title,
  description,
  header,
  footer,
  listElement,
  resourceId,
}) => {
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [isLoading, setLoadStatus] = React.useState(false);
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const redirect = useRedirect();

  const portalSectionId = React.useMemo(
    () => `child-moim-group-preview-portal-${uuid.v4()}`,
    [],
  );

  const { getChildMoimGroupMoims } = useActions({
    getChildMoimGroupMoims: getChildMoimGroupMoimsAction,
  });

  const childMoimText = useGroupTexts("child_moim");

  const moims = useStoreState(state =>
    state.childMoimGroup.groupByMoims[resourceId]?.data
      ? selectMoimsById(
          state,
          state.childMoimGroup.groupByMoims[resourceId].data,
        )
      : undefined,
  );

  const {
    targetMoimUrl,
    targetMoimId,
    handleOpen,
    open: quickJoinOpenStatus,
    username: targetUsername,
    handleClose: handleCloseQuickJoin,
  } = useQuickJoinDialog();

  const {
    column,
    listElementType,
    maxVisibleCount,
  } = ChildMoimGroupHooks.useConfig(listElement);

  const handleOpenQuickJoinDialog = React.useCallback(
    (moimUrl: string, moimId: Moim.Id) => {
      if (currentUser) {
        handleOpen(moimUrl, moimId, currentUser.name);
      }
    },
    [currentUser, handleOpen],
  );

  const slicedMoims = React.useMemo(() => moims?.slice(0, maxVisibleCount), [
    moims,
    maxVisibleCount,
  ]);

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = slicedMoims?.some(moim => moim?.id === undefined);
    if (slicedMoims === undefined || isLoading || isUndefinedArray) {
      return new Array(
        column *
          (isMobile || !listElement.rowCount_web
            ? listElement.rowCount
            : listElement.rowCount_web),
      )
        .fill(0)
        .map((_, idx) => (
          <ItemContainer key={`child_moim_group_moim_skeleton_${idx}`}>
            <MoimCellSkeleton />
          </ItemContainer>
        ));
    }

    return slicedMoims.map(moim => (
      <ItemContainer key={`child_moim_group_${moim.id}`}>
        <MoimItem moim={moim} onJoinClick={handleOpenQuickJoinDialog} />
      </ItemContainer>
    ));
  }, [
    slicedMoims,
    isLoading,
    column,
    isMobile,
    listElement.rowCount_web,
    listElement.rowCount,
    handleOpenQuickJoinDialog,
  ]);

  const handleOnView = React.useCallback(() => {
    if (!isLoading && !moims?.length) {
      setLoadStatus(true);
      getChildMoimGroupMoims(
        resourceId,
        maxVisibleCount ?? DEFAULT_LIMIT,
        cancelTokenSource.current.token,
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    isLoading,
    moims?.length,
    resourceId,
    getChildMoimGroupMoims,
    maxVisibleCount,
    cancelTokenSource,
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
          showTitle={header?.showTitle ?? true}
          showDescription={header?.showDescription ?? true}
          showMoreButton={header?.showMoreButton ?? true}
          onClickViewMore={handleClickViewMore}
        />
        {listElementType === "horizontal" && (
          <ArrowContainer id={portalSectionId} />
        )}
        <ListWrapper>
          {moims !== undefined && !moims.length ? (
            <BlockitFeedback.Empty
              textKey={"child_moim_group_list_preview_empty"}
              textKeyValues={{
                child_moim: childMoimText?.singular,
                child_moim_plural: childMoimText?.plural,
              }}
            />
          ) : (
            <BlockitListLayout
              element={listElement}
              rightArrow={
                listElementType === "horizontal" ? PortalRightArrow : undefined
              }
              leftArrow={
                listElementType === "horizontal" ? PortalLeftArrow : undefined
              }
              arrowPortalTargetId={portalSectionId}
            >
              {itemElements}
            </BlockitListLayout>
          )}
        </ListWrapper>
        <BlockitFooter
          showMoreButton={footer?.showMoreButton ?? false}
          onClickViewMore={handleClickViewMore}
        />
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

export default withPlacement(React.memo(ChildMoimGroupPreview));
