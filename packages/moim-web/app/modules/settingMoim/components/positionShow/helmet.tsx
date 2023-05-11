import * as React from "react";
import PageUpdater from "common/components/pageUpdater";
import useDefaultOgMetaRawData from "common/hooks/useDefaultOgMetaRawData";
import makeOgMetaData from "common/helpers/makeOgMetaData";
import usePageTitleWithMoimName from "common/hooks/usePageTitleWithMoimName";

interface IProps {
  positionTitle: string;
  positionDescription?: string;
}

function PositionShowHelmet(props: IProps) {
  const { positionTitle, positionDescription } = props;
  const title = usePageTitleWithMoimName(positionTitle);
  const metaObjects = makeOgMetaData({
    ...useDefaultOgMetaRawData(),
    title,
    description: positionDescription || "",
  });

  return <PageUpdater title={title} metaObjects={metaObjects} />;
}

export default PositionShowHelmet;
