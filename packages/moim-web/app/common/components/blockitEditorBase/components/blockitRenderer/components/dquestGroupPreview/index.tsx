import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import uuid from "uuid";
// hooks
import { useActions } from "app/store";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { useParseListElementConfig } from "common/components/blockitListLayout/hooks/useParseListElementConfig";
import useRedirect from "common/hooks/useRedirect";
import useIsMobile from "common/hooks/useIsMobile";
// actions
import { fetchDQuestGroupQuests as fetchDQuestGroupQuestsAction } from "app/actions/dquest";
// helpers
import { MoimURL } from "common/helpers/url";
// component
import InViewTrigger from "../inViewTrigger";
import { ArrowContainer } from "common/components/blockitEditorBase/styled";
import { Wrapper, Inner } from "./styled";

import BlockitHeader from "../header";
import BlockitFooter from "../footer";
import DquestGroupItemList from "./listComponent";
import { withPlacement } from "../../hoc/withPlacement";

interface IProps
  extends Omit<Moim.Blockit.IDQuestGroupListPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const DEFAULT_LIMIT = 20;

const DQuestGroupPreview: React.FC<IProps> = ({
  header,
  footer,
  listElement,
  itemStyle,
  itemStyle_web,
  resourceId,
}) => {
  const isMobile = useIsMobile();
  const redirect = useRedirect();
  const [quests, setQuests] = React.useState<Moim.Id[] | undefined>(undefined);

  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const portalSectionId = React.useMemo(
    () => `dquest-group-preview-portal-${uuid.v4()}`,
    [],
  );
  const { fetchDQuestGroupQuests } = useActions({
    fetchDQuestGroupQuests: fetchDQuestGroupQuestsAction,
  });

  const itemStyleConfig = React.useMemo(
    () => (!isMobile && Boolean(itemStyle_web) ? itemStyle_web : itemStyle),
    [isMobile, itemStyle, itemStyle_web],
  );

  const { listElementType, maxVisibleCount } = useParseListElementConfig(
    listElement,
  );

  const handleClickViewMore = React.useCallback(() => {
    redirect(
      new MoimURL.QuestGroupQuests({
        id: resourceId,
      }).toString(),
    );
  }, [redirect, resourceId]);

  const handleOnView = React.useCallback(() => {
    if (!isLoading) {
      setLoadStatus(true);
      fetchDQuestGroupQuests(
        resourceId,
        {
          limit: maxVisibleCount ?? DEFAULT_LIMIT,
        },
        cancelTokenSource.current.token,
      )
        .then(response => {
          setQuests(response.data);
        })
        .finally(() => {
          setLoadStatus(false);
        });
    }
  }, [
    isLoading,
    fetchDQuestGroupQuests,
    resourceId,
    cancelTokenSource,
    maxVisibleCount,
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

      <Inner>
        <BlockitHeader
          title={header?.title}
          description={header?.description}
          showTitle={header?.showTitle ?? false}
          showDescription={header?.showDescription ?? false}
          showMoreButton={header?.showMoreButton ?? false}
          onClickViewMore={handleClickViewMore}
        />
        {listElementType === "horizontal" && (
          <ArrowContainer id={portalSectionId} />
        )}
        <DquestGroupItemList
          quests={quests}
          portalSectionId={portalSectionId}
          isLoading={Boolean(
            (!quests?.length && isLoading === undefined) || isLoading,
          )}
          listElement={listElement}
          itemStyleConfig={itemStyleConfig}
        />
        <BlockitFooter
          textKey="button_see_more_dquest_group"
          showMoreButton={footer?.showMoreButton ?? false}
          onClickViewMore={handleClickViewMore}
        />
      </Inner>
    </Wrapper>
  );
};

export default withPlacement(React.memo(DQuestGroupPreview));
