// vendor
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useRouteMatch } from "react-router";
// type
import { PermissionDeniedFallbackType } from "app/enums";
// component
import { Wrapper, GuideText, Button } from "./styledComponent";
import PermissionChecker, {
  useResourcePermission,
} from "common/components/permissionChecker";
// helper
import useCurrentUser from "common/hooks/useCurrentUser";
import { MoimURL } from "common/helpers/url";
import { ForumContext } from "app/modules/forum/context";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  onClickNewPost?(): void;
}

function EmptyThread({ onClickNewPost }: IProps) {
  const match = useRouteMatch<Moim.IMatchParams>();
  const { showType } = React.useContext(ForumContext);
  const currentUser = useCurrentUser();
  const forumId = match.params.forumId;
  const isMobile = useIsMobile();
  const { hasPermission, isLoading } = useResourcePermission(
    "WRITE_POST",
    forumId || "",
  );

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
    <Wrapper showType={showType}>
      <GuideText>
        <FormattedMessage id="post_list/page_empty" />
      </GuideText>
      {currentUser ? (
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.ALERT}
          hasPermission={hasPermission}
          isLoading={isLoading}
        >
          <Button to={writingUrlObject} onClick={onClickNewPost}>
            <FormattedMessage id="post_list/start_new_post_button" />
          </Button>
        </PermissionChecker>
      ) : null}
    </Wrapper>
  );
}

export default EmptyThread;
