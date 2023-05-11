import * as React from "react";
import { FormattedMessage } from "react-intl";

import MenuItem from "app/modules/navigationPanel/components/moimConfigMenu/component/menuItem";
import { MoimListIcon, SmallMoimListIcon } from "./styled";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import NavigationPanelContext from "app/modules/navigationPanel/context";
import useIsMobile from "common/hooks/useIsMobile";
import useGroupTexts from "common/hooks/useGroupTexts";

export interface IProps {
  onClickButton: () => void;
}

function MoimListButton({ onClickButton }: IProps) {
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const { expandSideNavigation } = useSideNavigationPanel();
  const { setJoinedSubMoimsStatus } = React.useContext(NavigationPanelContext);
  const childMoimText = useGroupTexts("child_moim");

  const handleMoimListOpen = React.useCallback(() => {
    onClickButton();
    if (isMobile) {
      expandSideNavigation();
    }
    setJoinedSubMoimsStatus("Expanded");
  }, [expandSideNavigation, isMobile, onClickButton, setJoinedSubMoimsStatus]);

  const label = React.useMemo(
    () => (
      <FormattedMessage
        id="menu_my_moim_list"
        values={{
          ref_child_moim: childMoimText?.plural ?? "",
        }}
      />
    ),
    [childMoimText],
  );

  if (
    !currentGroup ||
    (currentGroup.is_hub && currentGroup?.sub_groups_count === 0)
  ) {
    return null;
  }

  return (
    <MenuItem
      icon={<MoimListIcon />}
      smallIcon={<SmallMoimListIcon />}
      onClickButton={handleMoimListOpen}
    >
      {label}
    </MenuItem>
  );
}

export default MoimListButton;
