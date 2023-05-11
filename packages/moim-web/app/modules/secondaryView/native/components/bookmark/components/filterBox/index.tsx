import * as React from "react";
import { useIntl } from "react-intl";

import { Wrapper, MoimFilterBox, DownArrowIcon, MenuWrapper } from "./styled";
import ResponsiveMenu from "common/components/responsiveMenu";
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import ShavedText from "common/components/shavedText";

import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import { selectMoimResources } from "app/selectors/profile";
import { getBookmarks, ActionCreators } from "app/actions/bookmark";
import useCurrentGroup from "common/hooks/useCurrentGroup";

interface IProps {
  userId: Moim.Id;
}

function MoimMenuItem({
  id,
  name,
  onClick,
}: {
  id: Moim.Id;
  name: string;
  onClick(id: Moim.Id): void;
}) {
  const handleClick = React.useCallback(() => {
    onClick(id);
  }, []);

  return (
    <MenuItem onClick={handleClick}>
      <ShavedText value={name} line={1} />
    </MenuItem>
  );
}

const BookmarkFilterBox: React.FC<IProps> = ({ userId }) => {
  const intl = useIntl();
  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();
  const refMoimFilterBox = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isOpenMoimFilterBox,
    open: handleOpenMoimFilterBox,
    close: handleCloseMoimFilterBox,
  } = useOpenState();

  const { moimResources } = useStoreState(state => ({
    moimResources: selectMoimResources(state),
  }));
  const {
    dispatchChangeCurrentMoimResource,
    dispatchGetBookmarks,
  } = useActions({
    dispatchGetBookmarks: getBookmarks,
    dispatchChangeCurrentMoimResource: ActionCreators.changeCurrentMoimResource,
  });
  const [selectedGroupId, setSelectedGroupId] = React.useState<
    Moim.Id | undefined
  >(currentGroup?.id);

  const selectedGroup = React.useMemo(
    () => moimResources.find(item => item.id === selectedGroupId),
    [moimResources, selectedGroupId],
  );

  const handleMoimFilterClick = React.useCallback(
    (moimId?: Moim.Id) => {
      setSelectedGroupId(moimId);
      handleCloseMoimFilterBox();
      dispatchGetBookmarks(
        {
          userId,
          filter: {
            groupId: moimId,
          },
        },
        cancelToken.current.token,
      );
      dispatchChangeCurrentMoimResource(moimId === undefined ? "all" : moimId);
    },
    [userId, handleCloseMoimFilterBox],
  );

  React.useEffect(() => {
    dispatchChangeCurrentMoimResource(currentGroup?.id ?? "all");
  }, []);

  const handleAllMoimFilterClick = React.useCallback(() => {
    handleMoimFilterClick(undefined);
  }, [handleMoimFilterClick]);

  return (
    <Wrapper>
      <MoimFilterBox ref={refMoimFilterBox} onClick={handleOpenMoimFilterBox}>
        <span>
          {selectedGroup
            ? selectedGroup.name
            : intl.formatMessage({ id: "menu_all" })}
        </span>
        <DownArrowIcon />
      </MoimFilterBox>
      <ResponsiveMenu
        anchorElement={refMoimFilterBox.current}
        open={isOpenMoimFilterBox}
        onCloseRequest={handleCloseMoimFilterBox}
      >
        <MenuWrapper>
          <MenuItem onClick={handleAllMoimFilterClick}>
            <ShavedText
              value={intl.formatMessage({ id: "menu_all" })}
              line={1}
            />
          </MenuItem>
          {moimResources.map(resource => (
            <MoimMenuItem
              key={resource.id}
              id={resource.id}
              name={resource.name}
              onClick={handleMoimFilterClick}
            />
          ))}
        </MenuWrapper>
      </ResponsiveMenu>
    </Wrapper>
  );
};

export default BookmarkFilterBox;
