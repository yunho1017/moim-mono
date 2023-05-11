import * as React from "react";
import { Redirect } from "react-router";
// hooks
import { useActions } from "app/store";
// helpers
import { MoimURL } from "common/helpers/url";
import safeParseJSON from "common/helpers/safeParseJSON";
import { convertSelectedTags2CollectionItemFilter } from "app/modules/nftCollection/helper";
// actions
import {
  searchNftItems as searchNftItemsAction,
  searchNftTags as searchNftTagsAction,
} from "app/actions/nft";
// component
import { DefaultLoader } from "common/components/loading";
import NftItemsInfiniteList from "./infiniteList";
import { HorizontalTagList } from "common/components/horizontalTagList";
// styled
import { CollectionTagSectionStyle, CollectionTagListStyle } from "./styled";
import { ICollectionItemFilter } from "app/modules/nftCollection";

const DEFAULT_LIMIT = 20;
const DEFAULT_TAGSETS = {
  statuses: ["CANDIDATE", "MINTED", "UNMINTABLE"],
};
const DEFAULT_TAGSET_TEXTKEY = {
  statuses: {
    tagSet: {
      textKey: "nft_group_filter_status",
    },
    tags: {
      CANDIDATE: {
        textKey: "status_on_mint",
      },
      MINTED: {
        textKey: "status_minted",
      },
      UNMINTABLE: {
        textKey: "status_not_for_sale",
      },
    },
  },
};

interface IProps {
  resourceId?: Moim.Id;
}

const NftItemsTabShowComponents: React.FC<IProps> = ({ resourceId }) => {
  const [isLoading, setLoadStatus] = React.useState<boolean | null | undefined>(
    undefined,
  );
  const [items, setItems] = React.useState<Moim.NFT.INftDetail[] | undefined>(
    undefined,
  );
  const [paging, setPaging] = React.useState<
    Readonly<{
      after?: Moim.PagingValue;
      before?: Moim.PagingValue;
      total?: number;
    }>
  >({});
  const [nftTagSets, setNftTagSets] = React.useState<Moim.NFT.ITag>(
    DEFAULT_TAGSETS,
  );
  const [selectedTags, setSelectedTags] = React.useState<
    Record<Moim.Id, string[]>
  >({});

  const { searchNftItems, searchNftTags } = useActions({
    searchNftItems: searchNftItemsAction,
    searchNftTags: searchNftTagsAction,
  });

  const handleGetItems = React.useCallback(
    (resourceFilter: ICollectionItemFilter, pagingKey?: "after" | "before") => {
      if (resourceId) {
        searchNftItems(
          pagingKey ? { [pagingKey]: paging[pagingKey] } : undefined,
          "DESC",
          DEFAULT_LIMIT,
          {
            contractIds: [resourceId],
            ...resourceFilter,
          },
        ).then(result => {
          if (result.paging) {
            setPaging(result.paging);
          } else {
            setPaging({});
          }
          if (result.items) {
            if (pagingKey) {
              setItems(base =>
                pagingKey === "before"
                  ? [...result.items, ...(base ?? [])]
                  : [...(base ?? []), ...result.items],
              );
            } else {
              setItems(result.items);
            }
          }
        });
      }

      setLoadStatus(false);
    },
    [paging, resourceId, searchNftItems],
  );

  const handleChangeSelectedTags = React.useCallback(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get("filter")
      ? safeParseJSON(query.get("filter") ?? "")
      : {};
    const resourceFilter = convertSelectedTags2CollectionItemFilter(data);
    handleGetItems(resourceFilter);
    setSelectedTags(data);
  }, [handleGetItems]);

  const handleGetTags = React.useCallback(() => {
    if (resourceId) {
      searchNftTags(undefined, "DESC", undefined, {
        contractIds: [resourceId],
      }).then(setTags => {
        if (setTags) setNftTagSets(prev => ({ ...prev, ...setTags }));
      });
    }
  }, [resourceId, searchNftTags]);

  const handleOnLoadMore = (pagingKey?: "after" | "before") => {
    handleGetItems(
      convertSelectedTags2CollectionItemFilter(selectedTags),
      pagingKey,
    );
  };

  const handleGetData = React.useCallback(
    (pagingKey?: "after" | "before") => {
      try {
        const query = new URLSearchParams(window.location.search);
        const data = query.get("filter")
          ? safeParseJSON(query.get("filter") ?? "")
          : {};
        handleGetTags();
        handleGetItems(
          convertSelectedTags2CollectionItemFilter(data),
          pagingKey,
        );
        setSelectedTags(data);
      } catch {
        setLoadStatus(null);
      } finally {
        setLoadStatus(false);
      }
    },
    [handleGetItems, handleGetTags],
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
    <>
      <HorizontalTagList
        sectionStyle={CollectionTagSectionStyle}
        listWrapperStyle={CollectionTagListStyle}
        selectedTags={selectedTags}
        tags={nftTagSets}
        textKeyLabelsByTagset={DEFAULT_TAGSET_TEXTKEY}
        onChangeHanlder={handleChangeSelectedTags}
      />
      <NftItemsInfiniteList
        isFetched={isLoading === false}
        isLoading={isLoading}
        resourceId={resourceId}
        items={items}
        paging={paging}
        onLoadMore={handleOnLoadMore}
      />
    </>
  );
};

export default NftItemsTabShowComponents;
