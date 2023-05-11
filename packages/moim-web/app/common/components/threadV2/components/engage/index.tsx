import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { PermissionDeniedFallbackType } from "app/enums";
import PermissionChecker, {
  useResourcePermission,
} from "common/components/permissionChecker";
import Reply from "common/components/engage/reply";
import { MiddleLike } from "common/components/engage/like";
import { MiddleUpDown } from "common/components/engage/upDown";

const Wrapper = styled.div`
  display: inline-flex;
  margin-left: ${px2rem(-6)};
  align-items: center;
`;

interface ILikeProps
  extends React.ComponentProps<typeof MiddleLike>,
    React.ComponentProps<typeof Reply> {
  type: "like";
  withoutVotePermissionCheck?: boolean;
  groupId?: Moim.Id;
}

interface IUpdownProps
  extends React.ComponentProps<typeof MiddleUpDown>,
    React.ComponentProps<typeof Reply> {
  type: "updown";
  withoutVotePermissionCheck?: boolean;
  groupId?: Moim.Id;
}

export default function Engage(props: ILikeProps | IUpdownProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    replyCount,
    canReply,
    replyText,
    onReplyClick,
    withoutVotePermissionCheck,
    groupId,
    ...restProps
  } = props;
  const { hasPermission: votePermission } = useResourcePermission(
    "COMMENT_VOTE",
    props.threadId,
  );
  const vote = React.useMemo(
    () =>
      props.type === "like" ? (
        <MiddleLike {...(restProps as ILikeProps)} />
      ) : (
        <MiddleUpDown {...(restProps as IUpdownProps)} />
      ),
    [props.type, restProps],
  );

  return (
    <Wrapper>
      {withoutVotePermissionCheck ? (
        vote
      ) : (
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.ALERT}
          hasPermission={votePermission}
          isLoading={false}
          groupId={groupId}
        >
          {vote}
        </PermissionChecker>
      )}

      <Reply
        replyCount={replyCount}
        canReply={canReply}
        replyText={replyText}
        onReplyClick={onReplyClick}
      />
    </Wrapper>
  );
}
