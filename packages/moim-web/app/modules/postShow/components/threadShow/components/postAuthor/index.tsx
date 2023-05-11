import * as React from "react";
// components
import UserProfileImage from "common/components/userProfileImage";
import {
  Wrapper,
  UserWrapper,
  UserInfoWrapper,
  Username,
  CreatedAt,
} from "./styled";
import CreateDayOMeter from "common/components/createDayOMeter";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import WithPositionChip from "common/components/withPositionChip/new";
import { useOpenProfileDialog } from "common/hooks/profileDialog";
import { useStoreState } from "app/store";
import { UserStatusTypes } from "app/enums";
import useGroupTexts from "common/hooks/useGroupTexts";

interface IProps {
  position: Moim.Forum.ForumShowAuthorConfigPositionType;
  author: Moim.Id;
  anonymous?: Moim.Forum.IAnonymousData;
  showAuthor?: boolean;
  showDate?: boolean;
  createdAt: number;
  followerCount?: number;
}
const PostAuthor = ({
  position,
  author: authorId,
  showAuthor = true,
  showDate = true,
  anonymous,
  createdAt,
}: IProps) => {
  const author: Moim.User.INormalizedUser | undefined = useStoreState(
    state => state.entities.users[authorId],
  );
  const anonymousTextKey = useGroupTexts("anonymous_member");

  const openProfileDialog = useOpenProfileDialog();

  const handleUserClick: React.MouseEventHandler = React.useCallback(
    e => {
      if (author && author.status !== UserStatusTypes.DEACTIVATED) {
        openProfileDialog(author.id, { current: e.currentTarget });
      }
    },
    [openProfileDialog, author],
  );
  if (showAuthor && (author || anonymous)) {
    return (
      <Wrapper position={position}>
        <UserWrapper>
          <UserProfileImage
            userId={author?.id ?? anonymous ? "anonymous" : ""}
            src={author?.avatar_url ?? ""}
            size={position === "top" ? "m" : "l"}
            role={!anonymous ? "button" : undefined}
            onClick={handleUserClick}
            canOpenProfileDialog={!anonymous}
            isOnline={
              author
                ? author.presence === "ACTIVE"
                : Boolean(anonymous)
                ? undefined
                : false
            }
          />
          <UserInfoWrapper>
            <Username
              role={!anonymous ? "button" : undefined}
              onClick={handleUserClick}
            >
              <WithPositionChip positions={author?.positions ?? []}>
                <NativeEmojiSafeText
                  value={
                    author
                      ? author.name
                      : Boolean(anonymous)
                      ? anonymousTextKey?.singular ?? ""
                      : "Unknown"
                  }
                />
              </WithPositionChip>
            </Username>

            {showDate && createdAt ? (
              <CreatedAt>
                <CreateDayOMeter givenDate={createdAt} />
              </CreatedAt>
            ) : null}
          </UserInfoWrapper>
        </UserWrapper>
      </Wrapper>
    );
  }

  if (position === "top" && !showAuthor) {
    return showDate && createdAt ? (
      <Wrapper position={position}>
        <CreatedAt>
          <CreateDayOMeter givenDate={createdAt} />
        </CreatedAt>
      </Wrapper>
    ) : null;
  }

  return null;
};

export default PostAuthor;
