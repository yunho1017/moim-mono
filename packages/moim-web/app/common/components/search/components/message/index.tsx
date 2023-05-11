import * as React from "react";
import ShavedText from "common/components/shavedText";
import CreateDayOMeter from "common/components/createDayOMeter";
import UserProfileImage from "common/components/userProfileImage";
import { Spacer } from "common/components/designSystem/spacer";
import ParsedText from "../parsedText";
import { Container, FromWhere } from "../styled";
import {
  Wrapper,
  AvatarHolder,
  UserDataHolder,
  UsernameContainer,
  Username,
  TimeStamp,
  Message,
} from "./styled";
interface IProps {
  message: Moim.Conversations.ISearchedMessageBody;
}

const SearchMessage: React.FC<IProps> = ({ message }) => {
  return (
    <Container>
      <FromWhere>
        {message.moimName} ･ {message.channelName}
      </FromWhere>
      <Spacer value={16} />
      <Wrapper>
        <AvatarHolder>
          <UserProfileImage
            size="m"
            src={message.content.creator.avatar}
            userId={message.content.creator.id}
            canOpenProfileDialog={false}
          />
        </AvatarHolder>
        <UserDataHolder>
          <UsernameContainer>
            <Username>{message.content.creator.username}</Username>
            <TimeStamp>
              <CreateDayOMeter givenDate={message.content.createdAt} />
            </TimeStamp>
          </UsernameContainer>
          <Message>
            <ShavedText
              value={
                <ParsedText
                  content={message.content.body.texts?.join("\b") || ""}
                />
              }
              line={3}
            />
          </Message>
        </UserDataHolder>
      </Wrapper>
    </Container>
  );
};

export default SearchMessage;
