// vendor
import * as React from "react";
// hook
import useDefaultOgMetaRawData from "common/hooks/useDefaultOgMetaRawData";
// component
import PageUpdater from "common/components/pageUpdater";
// helper
import makeOgMetaData from "common/helpers/makeOgMetaData";
import useCurrentGroup from "common/hooks/useCurrentGroup";

function RootHelmet() {
  const currentMoim = useCurrentGroup();
  const favicons = currentMoim?.favicon
    ? [
        ...currentMoim.favicon.android,
        ...currentMoim.favicon.ios,
        ...currentMoim.favicon.common,
      ]
    : [];

  return (
    <PageUpdater
      metaObjects={makeOgMetaData(useDefaultOgMetaRawData())}
      favicons={favicons}
    />
  );
}

export default RootHelmet;
