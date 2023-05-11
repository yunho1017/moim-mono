// vendor
import * as React from "react";
import { Link } from "react-router-dom";
// component
import { Wrapper, WriteIcon } from "./styledComponents";
// helper
import { MoimURL } from "common/helpers/url";
import useIsMobile from "common/hooks/useIsMobile";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export interface IProps {
  forumId: Moim.Id;
  visibleTopTabNavigation?: boolean;
}

function ThreadWriteButton({ forumId, visibleTopTabNavigation }: IProps) {
  const isMobile = useIsMobile();
  const writingUrlObject = React.useMemo(() => {
    if (isMobile) {
      return forumId
        ? new MoimURL.CreateForumThread({
            forumId,
          }).toString()
        : new MoimURL.MoimAppHome().toString();
    }
    const { pathname, search } = new MoimURL.BlockitEditor().toObject();
    const qs = new URLSearchParams(search);
    if (forumId) {
      qs.set("channel", forumId);
    }

    return {
      pathname,
      search: qs.toString(),
    };
  }, [forumId, isMobile]);

  return (
    <Link
      to={writingUrlObject}
      onClick={() => {
        AnalyticsClass.getInstance().forumListWritePostSelect({ forumId });
      }}
    >
      <Wrapper visibleTopTabNavigation={visibleTopTabNavigation}>
        <WriteIcon
          isMobile={isMobile}
          visibleTopTabNavigation={visibleTopTabNavigation}
        />
      </Wrapper>
    </Link>
  );
}

export default ThreadWriteButton;
