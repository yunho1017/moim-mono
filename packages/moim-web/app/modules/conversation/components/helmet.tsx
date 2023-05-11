import * as React from "react";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useDefaultOgMetaRawData from "common/hooks/useDefaultOgMetaRawData";
import PageUpdater from "common/components/pageUpdater";
import makeOgMetaData from "common/helpers/makeOgMetaData";

function ConversationHelmet() {
  const currentMoim = useCurrentGroup();
  const metaObjects = makeOgMetaData(useDefaultOgMetaRawData());

  return <PageUpdater title={currentMoim?.name} metaObjects={metaObjects} />;
}

export default ConversationHelmet;
