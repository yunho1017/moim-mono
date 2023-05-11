import * as React from "react";
import { useIntl } from "react-intl";
import ShavedText from "common/components/shavedText";
import CreateDayOMeter from "common/components/createDayOMeter";
import UserProfileImage from "common/components/userProfileImage";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ParsedText from "../parsedText";
import { Container, FromWhere } from "../styled";
import {
  Wrapper,
  ParentPost,
  Title,
  EngageStateWrapper,
  StatContainer,
  CommentContainer,
  AvatarHolder,
  UserDataHolder,
  UsernameContainer,
  Username,
  TimeStamp,
  Content,
  ParentUsername,
  ParentTimeStamp,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import useGroupTexts, {
  useCurrentUserLocale,
} from "common/hooks/useGroupTexts";

interface IProps {
  comment: Moim.Forum.ISearchedThreadBody &
    Required<Pick<Moim.Forum.ISearchedThreadBody, "parentContent">>;
}

const SearchComment: React.FC<IProps> = ({ comment }) => {
  const intl = useIntl();
  const anonymousTextKey = useGroupTexts("anonymous_member");
  const locale = useCurrentUserLocale();

  const parentContentCreateName = React.useMemo(() => {
    if (comment.parentContent.creator.anonymousSuffix) {
      return `${anonymousTextKey?.singular}${comment.parentContent.creator.anonymousSuffix?.[locale]}`;
    }
    return comment.parentContent.creator.username;
  }, [
    anonymousTextKey?.singular,
    comment.parentContent.creator.anonymousSuffix,
    comment.parentContent.creator.username,
    locale,
  ]);

  const creatorName = React.useMemo(() => {
    if (comment.content.creator.anonymousSuffix) {
      return `${anonymousTextKey?.singular}${comment.content.creator.anonymousSuffix[locale]}`;
    }
    return comment.content.creator.username;
  }, [
    anonymousTextKey?.singular,
    comment.content.creator.anonymousSuffix,
    comment.content.creator.username,
    locale,
  ]);

  return (
    <Container>
      <FromWhere>
        {comment.moimName} ･ {comment.channelName}
      </FromWhere>
      <Spacer value={16} />
      <Wrapper>
        <ParentPost>
          <Title>
            <ShavedText
              value={
                <ParsedText
                  id={`${comment.parentContent.id}_title`}
                  content={comment.parentContent.title || ""}
                />
              }
              line={1}
            />
          </Title>
          <EngageStateWrapper>
            {/*
            TODO: 백엔드 내용 추가 후 해제
            <EngageContainer>
              <SmallLike
                liked={false}
                likeCount={comment.parentContent.upVoteScore || 0}
                threadId={comment.parentContent.id}
                disabled={true}
              />
              <CommentCountWrapper>
                <Comment count={comment.parentContent.replies || 0} />
              </CommentCountWrapper>
            </EngageContainer> */}
            <StatContainer>
              <ParentUsername>
                <NativeEmojiSafeText value={parentContentCreateName ?? ""} />
              </ParentUsername>

              <ParentTimeStamp>
                <CreateDayOMeter
                  key={`${comment.parentContent.id}-create-at`}
                  givenDate={comment.parentContent.createdAt || 0}
                  className="time"
                  useChange={false}
                  normalFormat={intl.formatMessage({
                    id: "datetime_format_short_tiny_date",
                  })}
                />
              </ParentTimeStamp>
            </StatContainer>
          </EngageStateWrapper>
        </ParentPost>
        <CommentContainer>
          <AvatarHolder>
            <UserProfileImage
              size="m"
              src={comment.content.creator.avatar}
              userId={comment.content.creator.id}
              canOpenProfileDialog={false}
            />
          </AvatarHolder>
          <UserDataHolder>
            <UsernameContainer>
              <Username>
                <ShavedText
                  value={<NativeEmojiSafeText value={creatorName} />}
                  line={1}
                />
              </Username>
              <TimeStamp>
                <CreateDayOMeter givenDate={comment.content.createdAt} />
              </TimeStamp>
            </UsernameContainer>
            <Content>
              <ShavedText
                value={
                  <ParsedText
                    id={`${comment.content.id}_title`}
                    content={comment.content.body.texts?.join("\n") || ""}
                  />
                }
                line={3}
              />
            </Content>
          </UserDataHolder>
        </CommentContainer>
      </Wrapper>
    </Container>
  );
};

export default SearchComment;
