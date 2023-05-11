import * as React from "react";
import { useIntl } from "react-intl";
import PageUpdater from "common/components/pageUpdater";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import makeOgMetaData from "common/helpers/makeOgMetaData";
import useDefaultOgMetaRawData from "common/hooks/useDefaultOgMetaRawData";
import usePageTitleWithMoimName from "common/hooks/usePageTitleWithMoimName";

function MoimListHelmet({ actionName }: { actionName: string }) {
  const currentMoim = useCurrentGroup();
  const intl = useIntl();

  const title = usePageTitleWithMoimName(actionName);
  const metaObjects = makeOgMetaData({
    ...useDefaultOgMetaRawData(),
    title,
    description: intl.formatMessage(
      {
        id: "og_description_sub_moim_list",
      },
      {
        moim_name: currentMoim?.name,
        sub_moim_name: title,
      },
    ),
  });

  return <PageUpdater title={title} metaObjects={metaObjects} />;
}

export default MoimListHelmet;
