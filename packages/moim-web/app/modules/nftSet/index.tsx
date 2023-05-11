import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router";
// hooks
import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
// helpers
import { MoimURL } from "common/helpers/url";
import safeParseJSON from "common/helpers/safeParseJSON";
// actions
import {
  getNftSetList as getNftSetListAction,
  getNftSetShow as getNftSetShowAction,
  getNftSetTags as getNftSetTagsAction,
} from "app/actions/nft";
// component
import NFTSetShowHeader from "./components/header";
import NftSetShowComponents from "./components/show";
import { DefaultLoader } from "common/components/loading";
import { HorizontalTagList } from "common/components/horizontalTagList";
// style
import { tagListSectionStyle, Wrapper } from "./styled";
import { convertSelectedTags2ResourceFilter } from "./helper";

const DEFAULT_LIMIT = 50;
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
export interface IResourceFilter {
  statuses?: string;
  tags?: string;
}

type IProps = RouteComponentProps<Moim.IMatchParams>;

const NftSetShowContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as { id: Moim.Id };
  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();
  const [isFetched, setFetched] = React.useState(false);
  const [isLoading, setLoadStatus] = React.useState(false);
  const [nftSetData, setNftSetData] = React.useState<
    Moim.NFT.INftSetList | undefined | null
  >(undefined);
  const [nftTagSets, setNftTagSets] = React.useState<Moim.NFT.ITag>(
    DEFAULT_TAGSETS,
  );
  const [selectedTags, setSelectedTags] = React.useState<
    Record<Moim.Id, string[]>
  >({});
  const [nftItemIds, setNftItemIds] = React.useState<string[] | undefined>(
    undefined,
  );
  const [paging, setPaging] = React.useState<
    Readonly<{
      after?: Moim.PagingValue;
      before?: Moim.PagingValue;
      total?: number;
    }>
  >({});
  const NFTSetShowContainerRef = React.useRef<HTMLDivElement>(null);

  const {
    getNftSetListData,
    getNftSetShowData,
    getNftSetTagsData,
  } = useActions({
    getNftSetListData: getNftSetListAction,
    getNftSetShowData: getNftSetShowAction,
    getNftSetTagsData: getNftSetTagsAction,
  });

  const items = useStoreState(state =>
    nftItemIds?.map(iid => state.entities.nftItems[iid]),
  );

  const handleGetTags = React.useCallback(() => {
    getNftSetTagsData(id).then(setTags => {
      if (setTags) setNftTagSets(prev => ({ ...prev, ...setTags }));
    });
  }, [getNftSetTagsData, id]);

  const handleGetSetItems = React.useCallback(
    (resourceFilter: IResourceFilter, pagingKey?: "after" | "before") => {
      if (nftItemIds === undefined) {
        setFetched(false);
        setLoadStatus(true);
      }
      getNftSetShowData(
        id,
        DEFAULT_LIMIT,
        pagingKey ? { [pagingKey]: paging[pagingKey] } : undefined,
        resourceFilter,
      ).then(setData => {
        if (setData.paging) {
          setPaging(setData.paging);
        } else {
          setPaging({});
        }
        if (setData.itemIds) {
          if (pagingKey) {
            setNftItemIds(base =>
              pagingKey === "before"
                ? [...setData.itemIds, ...(base ?? [])]
                : [...(base ?? []), ...setData.itemIds],
            );
          } else {
            setNftItemIds(setData.itemIds);
          }
        }
      });

      setFetched(true);
      setLoadStatus(false);
    },
    [getNftSetShowData, id, nftItemIds, paging],
  );

  const handleChangeSelectedTags = React.useCallback(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get("filter")
      ? JSON.parse(query.get("filter") ?? "")
      : {};
    const resourceFilter = convertSelectedTags2ResourceFilter(data);
    handleGetSetItems(resourceFilter);
    NFTSetShowContainerRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setSelectedTags(data);
  }, [handleGetSetItems]);

  const handleOnLoadMore = (pagingKey?: "after" | "before") => {
    handleGetSetItems(
      convertSelectedTags2ResourceFilter(selectedTags),
      pagingKey,
    );
  };

  const handleGetData = React.useCallback(
    (pagingKey?: "after" | "before") => {
      const query = new URLSearchParams(window.location.search);
      const data = query.get("filter")
        ? safeParseJSON(query.get("filter") ?? "")
        : {};
      getNftSetListData(id).then(nftSet => {
        if (nftSet) {
          if (nftSet.filterable) {
            handleGetTags();
          }
          setNftSetData(nftSet);
        } else setNftSetData(null);
      });
      handleGetSetItems(convertSelectedTags2ResourceFilter(data), pagingKey);
      setSelectedTags(data);
    },
    [getNftSetListData, handleGetSetItems, handleGetTags, id],
  );

  React.useEffect(() => {
    handleGetData();
  }, []);

  if (isLoading && !isFetched) {
    return <DefaultLoader />;
  }

  if (!id || nftSetData === null) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <Wrapper ref={NFTSetShowContainerRef}>
      <NFTSetShowHeader
        title={nftSetData?.name ?? ""}
        description={nftSetData?.description}
      />
      {Boolean(nftSetData?.filterable) && (
        <HorizontalTagList
          sectionStyle={tagListSectionStyle}
          selectedTags={selectedTags}
          tags={nftTagSets}
          textKeyLabelsByTagset={DEFAULT_TAGSET_TEXTKEY}
          onChangeHanlder={handleChangeSelectedTags}
        />
      )}
      <NftSetShowComponents
        isFetched={isFetched}
        isLoading={isLoading}
        title={nftSetData?.name ?? ""}
        resourceId={id}
        items={items}
        paging={paging}
        listShowConfig={nftSetData?.listConfig}
        columnCountWeb={nftSetData?.listElement.columnCount_web ?? 5}
        columnCount={nftSetData?.listElement.columnCount ?? 2}
        onLoadMore={handleOnLoadMore}
        groupId={currentGroup?.id}
        hubGroupId={currentHubGroup?.id}
      />
    </Wrapper>
  );
};

export default NftSetShowContainer;
