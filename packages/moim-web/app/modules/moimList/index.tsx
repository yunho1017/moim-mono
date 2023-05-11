// vendor
import * as React from "react";
import { IRouteComponentProps } from "app/routes/client";
// component
import QuickJoinDialog from "common/components/quickJoinDialog";
import { Wrapper } from "./styled";
import MoimList from "./components/moimList";

import useHooks from "./hooks/useHook";
import MoimListHelmet from "./helmet";

export default function SubMoimList(props: IRouteComponentProps) {
  const {
    tags,
    subMoims,
    recommendMoims,
    channelData,
    isLoading,
    isRecommendMoimsLoading,
    handleGetMoimList,
    quickJoinOpenStatus,
    targetMoimUrl,
    targetMoimId,
    targetUsername,
    sortingOptions,
    selectedMoimTagIds,
    handleCloseQuickJoin,
    handleOpenQuickJoinDialog,
    handleSelectedTagsChange,
    handleChangeOption,
  } = useHooks(props);

  return (
    <>
      <MoimListHelmet actionName={channelData?.name || ""} />
      <Wrapper>
        {subMoims && (
          <MoimList
            tagName={channelData?.name ?? ""}
            displayTagSelector={Boolean(channelData?.tags?.length === 0)}
            tags={tags}
            moimList={subMoims}
            recommendMoims={recommendMoims}
            isLoading={isLoading}
            isRecommendMoimsLoading={isRecommendMoimsLoading}
            sortOptions={sortingOptions}
            handler={handleGetMoimList}
            selectedLabels={selectedMoimTagIds}
            onJoinClick={handleOpenQuickJoinDialog}
            onChangeOption={handleChangeOption}
            onChangeSelectedTags={handleSelectedTagsChange}
          />
        )}
        <QuickJoinDialog
          open={quickJoinOpenStatus}
          targetMoimDomain={targetMoimUrl}
          targetMoimId={targetMoimId}
          username={targetUsername}
          onClose={handleCloseQuickJoin}
        />
      </Wrapper>
    </>
  );
}
