import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const {
  boolean: booleanKnob,
  number: numberKnob,
} = require("@storybook/addon-knobs");
const { action } = require("@storybook/addon-actions");

import { VotedUserListComponent } from "./component";
import { RAW } from "app/__mocks__/index";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forums/VotedUserList dialog`,
  module,
).add("Default", () => {
  const voteCount = numberKnob("Vote Count", 0, {
    range: true,
    min: 0,
    max: 20,
    step: 1,
  });

  const votes = React.useMemo(() => {
    const voteArray: Moim.Forum.IDenormalizedVote[] = [];
    for (let i = 0; i < voteCount; i++) {
      voteArray.push({
        ...RAW.THREAD_VOTE,
        user: {
          ...RAW.GROUP_WITH_USER.user,
          name: `USERNAME-${i}`,
          bio: `User ${i} description h2h89f2kjhf8fd2kj ho812kjhd, hello world`,
        },
      });
    }
    return voteArray;
  }, [voteCount]);

  return (
    <VotedUserListComponent
      isLoading={booleanKnob("isLoading", false)}
      useTab={booleanKnob("useTab", false)}
      activeTab="like"
      likedVotes={{
        data: votes,
        paging: {},
      }}
      dislikedVotes={{
        data: [],
        paging: {},
      }}
      setActiveTab={action("setActiveTab")}
      onClose={action("onClose")}
      onWrapperClick={action("onWrapperClick")}
      onLoadMoreLikeVotes={action("onLoadMoreLikeVotes")}
      onLoadMoreDislikeVotes={action("onLoadMoreDislikeVotes")}
    />
  );
});
