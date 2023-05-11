import * as React from "react";
import useDefaultOgMetaRawData from "common/hooks/useDefaultOgMetaRawData";
import PageUpdater from "common/components/pageUpdater";
import replaceLineBreakString from "common/helpers/string/replaceLineBreakString";
import makeOgMetaData from "common/helpers/makeOgMetaData";
import usePageTitleWithMoimName from "common/hooks/usePageTitleWithMoimName";

interface IProps {
  threadTitle: string;
  threadDescription?: string;
  threadContent: Moim.Blockit.Blocks[];
}

function ForumThreadShowHelmet(props: IProps) {
  const { threadTitle, threadDescription, threadContent } = props;
  const title = usePageTitleWithMoimName(threadTitle);
  const description =
    threadDescription ??
    threadContent.find(
      (content): content is Moim.Blockit.ITextBlock => content.type === "text",
    )?.content ??
    "";
  const metaObjects = makeOgMetaData({
    ...useDefaultOgMetaRawData(),
    title,
    description: replaceLineBreakString(description, " "),
  });

  return <PageUpdater title={title} metaObjects={metaObjects} />;
}

export default ForumThreadShowHelmet;
