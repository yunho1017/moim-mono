import * as React from "react";
import useHook from "./useHook";

import { VotedUserListComponent } from "./component";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";

export default function VotedUserListDialog() {
  const {
    open,
    useTab,
    activeTab,
    setActiveTab,
    isLoading,
    likedVotes,
    dislikedVotes,
    handleClose,
    handleContentWrapperClick,
    handleLoadMoreLikeVotes,
    handleLoadMoreDislikeVotes,
  } = useHook();

  return (
    <FixedHeightBasicDialog open={open} onClose={handleClose}>
      <VotedUserListComponent
        useTab={useTab}
        isLoading={isLoading}
        activeTab={activeTab}
        likedVotes={likedVotes}
        dislikedVotes={dislikedVotes}
        setActiveTab={setActiveTab}
        onClose={handleClose}
        onWrapperClick={handleContentWrapperClick}
        onLoadMoreLikeVotes={handleLoadMoreLikeVotes}
        onLoadMoreDislikeVotes={handleLoadMoreDislikeVotes}
      />
    </FixedHeightBasicDialog>
  );
}
