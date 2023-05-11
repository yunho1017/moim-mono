// vendor
import * as React from "react";
import { FormattedMessage } from "react-intl";
// component
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { MenuText, BookmarkIcon, DraftMenuIcon } from "./styled";

import { useActions } from "app/store";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { ActionCreators as DraftActionCreators } from "app/actions/draft";
import { MoimURL } from "common/helpers/url";

interface IProps {
  userId: Moim.Id;
  requestClose(): void;
}

const Menus: React.FC<IProps> = ({ userId, requestClose }) => {
  const { redirect } = useNativeSecondaryView();
  const { openDraftListModal } = useActions({
    openDraftListModal: DraftActionCreators.openDraftListModal,
  });

  const handleBookmarkClick = React.useCallback(() => {
    requestClose();
    redirect(new MoimURL.UserBookmark({ userId }).toString());
  }, [userId, redirect, requestClose]);

  const handleDraftOpen = React.useCallback(() => {
    requestClose();
    openDraftListModal();
  }, [requestClose]);

  const menus = [
    <MenuItem onClick={handleBookmarkClick}>
      <BookmarkIcon />
      <MenuText>
        <FormattedMessage id="profile_show/contents_menu_bookmarks" />
      </MenuText>
    </MenuItem>,
    <MenuItem key="draft_list_open" onClick={handleDraftOpen}>
      <DraftMenuIcon />
      <MenuText>
        <FormattedMessage id="menu_draft_list" />
      </MenuText>
    </MenuItem>,
  ];

  return <>{menus}</>;
};

export default Menus;
