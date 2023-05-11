import * as React from "react";
import { Redirect } from "react-router";
// hooks
import { useActions } from "app/store";
// helpers
import { MoimURL } from "common/helpers/url";
// actions
import { getContractOwners as getContractOwnersAction } from "app/actions/nft";
// component
import { DefaultLoader } from "common/components/loading";
import NftOwnersInfiniteList from "./infiniteList";

const DEFAULT_LIMIT = 20;

interface IProps {
  resourceId?: Moim.Id;
}

const NftOwnersTabShowComponents: React.FC<IProps> = ({ resourceId }) => {
  const [isLoading, setLoadStatus] = React.useState<boolean | null | undefined>(
    undefined,
  );
  const [owners, setOwners] = React.useState<
    Moim.NFT.IContractOwner[] | undefined
  >(undefined);
  const [paging, setPaging] = React.useState<
    Readonly<{
      after?: Moim.PagingValue;
      before?: Moim.PagingValue;
      total?: number;
    }>
  >({});

  const { getContractOwners } = useActions({
    getContractOwners: getContractOwnersAction,
  });

  const handleGetData = React.useCallback(
    (pagingKey?: "after" | "before") => {
      try {
        setLoadStatus(true);
        if (resourceId) {
          getContractOwners(resourceId, paging, "DESC", DEFAULT_LIMIT).then(
            result => {
              if (result.paging) {
                setPaging(result.paging);
              } else {
                setPaging({});
              }
              if (result.owners) {
                if (pagingKey) {
                  setOwners(base =>
                    pagingKey === "before"
                      ? [...result.owners, ...(base ?? [])]
                      : [...(base ?? []), ...result.owners],
                  );
                } else {
                  setOwners(result.owners);
                }
              }
            },
          );
        }
      } catch {
        setLoadStatus(null);
      } finally {
        setLoadStatus(false);
      }
    },
    [getContractOwners, paging, resourceId],
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
    <NftOwnersInfiniteList
      isFetched={isLoading === false}
      isLoading={isLoading}
      resourceId={resourceId}
      items={owners}
      paging={paging}
      onLoadMore={handleGetData}
    />
  );
};

export default NftOwnersTabShowComponents;
