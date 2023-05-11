import * as React from "react";

import MobileSearchButton from "app/modules/search/container/searchInput/mobile";
import MenuButton from "./components/menuButton";
import CurrentUser from "./components/currentUser";
import CurrentGroupProfile from "./components/currentGroupProfile";
import { Wrapper, CurrentUserWrapper } from "./styled";
import {
  useVisibleMobileTopTab,
  useVisibleTopSubNavigation,
} from "../../controller/hooks";
import useCurrentUser from "common/hooks/useCurrentUser";

export default function MobileTopNavigation() {
  const currentUser = useCurrentUser();
  const visibleTopSubNavigation = useVisibleTopSubNavigation();
  const visibleTopTabNavigation = useVisibleMobileTopTab();

  return (
    <Wrapper
      visibleTopSubNavigation={visibleTopSubNavigation}
      visibleTopTabNavigation={visibleTopTabNavigation}
    >
      <MenuButton />
      <CurrentGroupProfile />
      <CurrentUserWrapper hasCurrentUser={Boolean(currentUser)}>
        <MobileSearchButton
          elementPaletteProps={{ type: "topArea", key: "others" }}
        />
        <CurrentUser />
      </CurrentUserWrapper>
    </Wrapper>
  );
}
