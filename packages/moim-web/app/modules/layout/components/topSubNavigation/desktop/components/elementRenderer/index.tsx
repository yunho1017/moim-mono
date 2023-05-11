import * as React from "react";

import MenuElement from "app/modules/layout/components/topNavigation/desktop/components/elements/menu";
import WrapperElement from "../elements/wrapper";
import SubMoimProfileElement from "../../../components/subMoimProfile";

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

        case "subMoimProfileElement": {
          return <SubMoimProfileElement />;
        }

        case "menuElement": {
          return (
            <MenuElement
              elementPaletteProps={{ type: "topSubArea", key: "menuText" }}
            />
          );
        }
      }

      return null;
    },
    [],
  );

  return renderChildElement(element);
}
