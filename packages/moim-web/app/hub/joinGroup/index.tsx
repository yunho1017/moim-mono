import * as React from "react";

import MyGroup from "./components/myGroup";
import CreateGroup from "./components/createGroup";
import JoinGroup from "./components/joinGroup";

import { useProps, useEffects } from "./hooks";

import { FormattedMessage } from "react-intl";
import { Wrapper, MainTitle, Contents } from "./components/styled";
import { DefaultLoader as Loader } from "common/components/loading";

export default function() {
  const hookProps = useProps();
  useEffects(hookProps);

  return (
    <Wrapper>
      <MainTitle>
        <FormattedMessage id="get_started/page_title" />
      </MainTitle>
      <Contents>
        {!hookProps.isMyGroupsLoading ? (
          <MyGroup myGroups={hookProps.myGroups} />
        ) : (
          <Loader />
        )}
        <JoinGroup />
        <CreateGroup />
      </Contents>
    </Wrapper>
  );
}
