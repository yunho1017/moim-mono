import * as React from "react";
import CurrentGroupProfile from "../elements/currentGroupProfile";
import CurrentUser from "../elements/currentUser";
import MenuElement from "../elements/menu";
import Search from "../elements/search";
import WrapperElement from "../elements/wrapper";
import SubMoimProfileElement from "app/modules/layout/components/topSubNavigation/components/subMoimProfile";

interface IProps {
  element: Moim.Layout.Navigation.ElementType;
}
export default function ElementRenderer({ element }: IProps) {
  const renderChildElement = React.useCallback(
    (target: Moim.Layout.Navigation.ElementType) => {
      switch (target.type) {
        case "wrapperElement": {
          return <WrapperElement element={target} />;
        }

        case "currentGroupProfileElement": {
          return <CurrentGroupProfile />;
        }

        case "subMoimProfileElement": {
          return <SubMoimProfileElement />;
        }

        case "currentUserElement": {
          return <CurrentUser />;
        }

        case "menuElement": {
          return (
            <MenuElement
              elementPaletteProps={{ type: "topArea", key: "menuText" }}
            />
          );
        }

        case "searchElement": {
          return (
            <Search elementPaletteProps={{ type: "topArea", key: "others" }} />
          );
        }
      }

      return null;
    },
    [],
  );

  return renderChildElement(element);
}
