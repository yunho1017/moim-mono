import * as React from "react";
import UserProfileImage from "common/components/userProfileImage";
import ShavedTextBlock from "common/components/blockitEditorBase/components/blockitRenderer/components/shavedText";
import {
  Wrapper,
  ProfileSection,
  AvatarWrapper,
  ProfileName,
  MessageBody,
  Message,
  shavedTextWrapperStyle,
} from "./styled";

interface IProps {
  vote: Moim.Campaign.IDenormalizedExecutionVote;
}

const VoteItem: React.FC<IProps> = ({ vote }) => {
  const { user, thread } = vote;

  const content = React.useMemo(() => {
    if (!thread) return "";
    return thread.content
      .map(block => (block.type === "text" ? block.content : ""))
      .join("\n");
  }, [thread]);

  return (
    <Wrapper>
      <ProfileSection>
        <AvatarWrapper>
          <UserProfileImage
            size="s"
            src={user.avatar_url}
            canOpenProfileDialog={false}
          />
        </AvatarWrapper>
        <ProfileName>{user.name}</ProfileName>
      </ProfileSection>
      {content && (
        <MessageBody>
          <Message>
            <ShavedTextBlock
              shaveLine={3}
              wrapperStyle={shavedTextWrapperStyle}
              content={content}
            />
          </Message>
        </MessageBody>
      )}
    </Wrapper>
  );
};

export default VoteItem;
