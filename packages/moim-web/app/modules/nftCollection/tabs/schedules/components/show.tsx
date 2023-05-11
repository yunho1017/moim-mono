import * as React from "react";
import { Redirect } from "react-router";
// hooks
import { useActions, useStoreState } from "app/store";
// helpers
import { MoimURL } from "common/helpers/url";
// actions
import { getSchedulesByContract as getSchedulesByContractAction } from "app/actions/nft";
// component
import { DefaultLoader } from "common/components/loading";
import NftSchedulesInfiniteList from "./infiniteList";

const DEFAULT_LIMIT = 10;

interface IProps {
  resourceId?: Moim.Id;
}

const NftSchedulesTabShowComponents: React.FC<IProps> = ({ resourceId }) => {
  const [isLoading, setLoadStatus] = React.useState<boolean | null | undefined>(
    undefined,
  );
  const [scheduleIds, setScheduleIds] = React.useState<string[] | undefined>(
    undefined,
  );
  const [paging, setPaging] = React.useState<
    Readonly<{
      after?: Moim.PagingValue;
      before?: Moim.PagingValue;
      total?: number;
    }>
  >({});

  const { getSchedulesByContract } = useActions({
    getSchedulesByContract: getSchedulesByContractAction,
  });

  const items = useStoreState(state =>
    scheduleIds?.map(iid => state.entities.nftSchedules[iid]),
  );

  const handleGetData = React.useCallback(
    (pagingKey?: "after" | "before") => {
      try {
        setLoadStatus(true);
        if (resourceId) {
          getSchedulesByContract(
            resourceId,
            paging,
            "DESC",
            DEFAULT_LIMIT,
          ).then(result => {
            if (result.paging) {
              setPaging(result.paging);
            } else {
              setPaging({});
            }
            if (result.scheduleIds) {
              if (pagingKey) {
                setScheduleIds(base =>
                  pagingKey === "before"
                    ? [...result.scheduleIds, ...(base ?? [])]
                    : [...(base ?? []), ...result.scheduleIds],
                );
              } else {
                setScheduleIds(result.scheduleIds);
              }
            }
          });
        }
      } catch {
        setLoadStatus(null);
      } finally {
        setLoadStatus(false);
      }
    },
    [getSchedulesByContract, paging, resourceId],
  );

  React.useEffect(() => {
    handleGetData();
  }, []);

  if (isLoading === undefined) {
    return <DefaultLoader />;
  }

  if (!resourceId) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <NftSchedulesInfiniteList
      isFetched={isLoading === false}
      isLoading={isLoading}
      resourceId={resourceId}
      items={items}
      paging={paging}
      onLoadMore={handleGetData}
    />
  );
};

export default NftSchedulesTabShowComponents;
