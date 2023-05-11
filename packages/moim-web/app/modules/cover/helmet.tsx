import * as React from "react";
import PageUpdater from "common/components/pageUpdater";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useDefaultOgMetaRawData from "common/hooks/useDefaultOgMetaRawData";
import makeOgMetaData from "common/helpers/makeOgMetaData";

function CoverHelmet() {
  const currentMoim = useCurrentGroup();
  const metaObjects = makeOgMetaData(useDefaultOgMetaRawData());

  return <PageUpdater title={currentMoim?.name} metaObjects={metaObjects} />;
}

export default CoverHelmet;
