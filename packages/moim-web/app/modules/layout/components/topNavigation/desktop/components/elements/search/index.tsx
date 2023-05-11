import * as React from "react";

import DesktopSearchInput from "app/modules/search/container/searchInput/desktop";

import { TopNavigationContext } from "../../../../context";

export default function Search({
  elementPaletteProps,
}: {
  elementPaletteProps: Moim.Theme.CommonElementThemePaletteProps;
}) {
  const { visibleSimpSearch } = React.useContext(TopNavigationContext);

  if (visibleSimpSearch) {
    return null;
  }
  return <DesktopSearchInput elementPaletteProps={elementPaletteProps} />;
}
