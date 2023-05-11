import * as React from "react";
import { Redirect } from "react-router";
import { useEffectOnce } from "react-use";
import { useActions } from "app/store";
import {
  fetchDQuestGroup as fetchDQuestGroupAction,
  fetchDQuestGroupQuests as fetchDQuestGroupQuestsAction,
} from "app/actions/dquest";
import { useCancelTokenWithCancelHandler } from "app/common/hooks/useCancelToken";
import useIsMobile from "common/hooks/useIsMobile";
import DQuestGroupQuestsComponent from "../../components/questGroup";
import { IRouteComponentProps } from "app/routes/client";
import { MoimURL } from "common/helpers/url";

const MOBILE_LIMIT = 5;
const DESKTOP_LIMIT = 20;

const DQuestList: React.FC<IRouteComponentProps> = ({ match }) => {
  const resourceId = match.params.id;
  const isMobile = useIsMobile();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const [questGroup, setQuestGroup] = React.useState<
    Moim.DQuest.IQuestGroup | undefined
  >(undefined);
  const [questIds, setQuestIds] = React.useState<Moim.Id[]>([]);
  const [paging, setPaging] = React.useState<Moim.IPaging>({});
  const {
    cancelTokenSource: getQuestListCancelTokenSource,
    handleCancel: handleCancelQuestListCancelToken,
  } = useCancelTokenWithCancelHandler();

  const { fetchDQuestGroup, fetchDQuestGroupQuests } = useActions({
    fetchDQuestGroup: fetchDQuestGroupAction,
    fetchDQuestGroupQuests: fetchDQuestGroupQuestsAction,
  });

  const limitCount = React.useMemo(
    () => (isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT),
    [isMobile],
  );

  const handleLoadMore = React.useCallback(() => {
    setLoadStatus(true);
    fetchDQuestGroupQuests(
      resourceId!,
      {
        limit: limitCount,
        paging,
      },
      getQuestListCancelTokenSource.current.token,
    )
      .then(response => {
        if (paging.after) {
          setQuestIds(state => state.concat(response.data));
        }
        setPaging(response.paging);
      })
      .finally(() => {
        setLoadStatus(false);
      });
  }, [
    limitCount,
    fetchDQuestGroupQuests,
    resourceId,
    getQuestListCancelTokenSource,
    paging,
  ]);

  React.useEffect(
    () => () => {
      handleCancelQuestListCancelToken();
    },
    [resourceId],
  );

  useEffectOnce(() => {
    if (resourceId) {
      setLoadStatus(true);
      fetchDQuestGroup(
        resourceId,
        getQuestListCancelTokenSource.current.token,
      ).then(response => {
        setQuestGroup(response);
      });
      fetchDQuestGroupQuests(
        resourceId,
        {
          limit: limitCount,
        },
        getQuestListCancelTokenSource.current.token,
      )
        .then(response => {
          setQuestIds(response.data);
          setPaging(response.paging);
        })
        .finally(() => {
          setLoadStatus(false);
        });
    }
  });

  if (!resourceId) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <DQuestGroupQuestsComponent
      resourceId={resourceId}
      isLoading={Boolean(isLoading)}
      questGroup={questGroup}
      questIds={questIds}
      paging={paging}
      onLoadMore={handleLoadMore}
    />
  );
};

export default React.memo(DQuestList);
