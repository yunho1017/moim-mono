import * as React from "react";
import { useIntl } from "react-intl";
import ShavedText from "common/components/shavedText";
import Image from "common/components/thread/templates/post/components/image";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import CreateDayOMeter from "common/components/createDayOMeter";
import ParsedText from "../parsedText";
import { Container, FromWhere } from "../styled";
import {
  Wrapper,
  Left,
  Right,
  Title,
  Content,
  Thumbnail,
  StatContainer,
  Username,
  TimeStamp,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import useGroupTexts, {
  useCurrentUserLocale,
} from "common/hooks/useGroupTexts";

interface IProps {
  post: Moim.Forum.ISearchedThreadBody;
}

const SearchPost: React.FC<IProps> = ({ post }) => {
  const intl = useIntl();
  const body = post.content.body.texts?.join("\n") || "";
  const anonymousTextKey = useGroupTexts("anonymous_member");
  const locale = useCurrentUserLocale();

  const creatorName = React.useMemo(() => {
    if (post.content.creator.anonymousSuffix) {
      return `${anonymousTextKey?.singular}${post.content.creator.anonymousSuffix?.[locale]}`;
    }
    return post.content.creator.username;
  }, [
    anonymousTextKey?.singular,
    locale,
    post.content.creator.anonymousSuffix,
    post.content.creator.username,
  ]);

  return (
    <Container>
      <FromWhere>
        {post.moimName} ･ {post.channelName}
      </FromWhere>
      <Spacer value={16} />
      <Wrapper>
        <Left>
          <Title>
            <ShavedText
              value={
                <ParsedText
                  id={`${post.channelId}_${post.content.id}_title`}
                  content={post.content.title || ""}
                />
              }
              line={1}
            />
          </Title>
          {body && (
            <Content>
              <ShavedText
                value={
                  <ParsedText
                    id={`${post.channelId}_${post.content.id}_body`}
                    content={body}
                  />
                }
                line={5}
              />
            </Content>
          )}
          {/*
          TODO: 백엔드 내용 추가 후 해제
          <EngageContainer>
            <SmallLike
              liked={
                (post.userVoteType ?? VoteStatus.NONE) === VoteStatus.POSITIVE
              }
              likeCount={post.content.upVoteScore || 0}
              threadId={post.content.id}
              disabled={true}
            />
            <CommentCountWrapper>
              <Comment count={post.content.replies || 0} />
            </CommentCountWrapper>
          </EngageContainer> */}
          <StatContainer>
            <Username>
              <NativeEmojiSafeText value={creatorName} />
            </Username>
            <TimeStamp>
              <CreateDayOMeter
                key={`${post.content.id}-create-at`}
                givenDate={post.content.createdAt}
                className="time"
                useChange={false}
                normalFormat={intl.formatMessage({
                  id: "datetime_format_short_tiny_date",
                })}
              />
            </TimeStamp>
          </StatContainer>
        </Left>
        {post.content.thumbnails && (
          <Right>
            <Thumbnail>
              <Image thumbnail={post.content.thumbnails} />
            </Thumbnail>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default SearchPost;
