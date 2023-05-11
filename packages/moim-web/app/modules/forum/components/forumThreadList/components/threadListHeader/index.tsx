import * as React from "react";
import { Header } from "app/modules/forum/containers/forumThreadList/styledComponents";
import FilterBox from "../filterBox";
import ThreadSearchBox from "../threadSearchBox";
// type
import useIsMobile from "app/common/hooks/useIsMobile";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";
import {
  isForumRoute,
  isForumShowRoute,
} from "app/modules/forum/containers/channelInfoAppBar/mobile";

interface IProps {
  forumId: Moim.Id;
  visibleTopTabNavigation?: boolean;
}

// TODO 나중에 search 추가되면 context api로 handler 구현
const onSearchThread = (keyword: string) => {
  console.log("!!!", keyword);
};

function ThreadListHeader(props: IProps) {
  const { forumId, visibleTopTabNavigation } = props;
  const isMobile = useIsMobile();
  const [isOpenSearchBox, setIsOpenSearchBox] = React.useState<boolean>(false);

  const handleToggleSearchBox = React.useCallback(() => {
    setIsOpenSearchBox(!isOpenSearchBox);
  }, [isOpenSearchBox, setIsOpenSearchBox]);

  const element = React.useMemo(
    () => (
      <Header>
        {isOpenSearchBox ? (
          <ThreadSearchBox
            onSearch={onSearchThread}
            onClickClose={handleToggleSearchBox}
          />
        ) : (
          <FilterBox
            channelId={forumId}
            visibleTopTabNavigation={visibleTopTabNavigation}
          />
        )}
      </Header>
    ),
    [forumId, handleToggleSearchBox, isOpenSearchBox, visibleTopTabNavigation],
  );

  if (
    isMobile &&
    !(isForumRoute(location.pathname) && !isForumShowRoute(location.pathname))
  ) {
    return null;
  }

  if (isMobile && !props?.visibleTopTabNavigation) {
    return <TopNaviPortalContainer>{element}</TopNaviPortalContainer>;
  }

  return element;
}

export default ThreadListHeader;
