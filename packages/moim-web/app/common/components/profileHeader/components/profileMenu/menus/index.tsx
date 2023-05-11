// vendor
import * as React from "react";
// component
import { Share } from "common/components/snsShareDialog/utils";
import ShareMenuItem from "./components/shareMenuItem";
import EditMenuItem from "./components/editMenuItem";
import LogoutMenuItem from "./components/logoutMenuItem";
import ReportMenuItem from "./components/reportMenuItem";
import UserBlockMenuItem from "./components/userBlockMenuItem";
import UserUnblockMenuItem from "./components/userUnblockMenuItem";

import { useStoreState } from "app/store";
import { blockedUserSelector } from "app/selectors/app";
import OpenInAdminMenuItem from "./components/openInAdminMenuItem";
import useSuperPermission from "common/hooks/useSuperPermission";
import { DefaultDivider } from "common/components/divider";

interface IProps {
  shareUrl: string;
  userId: Moim.Id;
  isSameUser: boolean;
  requestClose(): void;
  openUserBlockDialog(): void;
  openUserUnblockDialog(): void;
}

const Menus: React.FC<IProps> = ({
  userId,
  isSameUser,
  shareUrl,
  requestClose,
  openUserUnblockDialog,
  openUserBlockDialog,
}) => {
  const { hasPermission } = useSuperPermission();
  const { blockedUser } = useStoreState(state => ({
    blockedUser: blockedUserSelector(state, userId),
  }));

  const handleClickShareProfile: React.MouseEventHandler<HTMLLIElement> = React.useCallback(
    e => {
      e.stopPropagation();
      requestClose();
    },
    [requestClose],
  );

  const menus = [
    <Share key="share" shareUrl={shareUrl} onClick={handleClickShareProfile}>
      {handler => <ShareMenuItem handler={handler} />}
    </Share>,
  ];

  if (isSameUser) {
    menus.unshift(
      <EditMenuItem key="edit_profile" requestClose={requestClose} />,
    );
    menus.push(<LogoutMenuItem key="logout" requestClose={requestClose} />);
  } else {
    if (blockedUser) {
      menus.push(
        <UserUnblockMenuItem
          key="user_unblock"
          requestClose={requestClose}
          openUserUnblockDialog={openUserUnblockDialog}
        />,
      );
    } else {
      menus.push(
        <UserBlockMenuItem
          key="user_block"
          requestClose={requestClose}
          openUserBlockDialog={openUserBlockDialog}
        />,
      );
    }
    menus.push(
      <ReportMenuItem
        key="report"
        userId={userId}
        requestClose={requestClose}
      />,
    );
  }

  if (hasPermission) {
    menus.push(<DefaultDivider key="divider" />);
    menus.push(
      <OpenInAdminMenuItem
        key="openInAdmin"
        userId={userId}
        requestClose={requestClose}
      />,
    );
  }

  return <>{menus}</>;
};

export default Menus;
