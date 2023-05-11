import * as React from "react";
import ShavedText from "common/components/shavedText";
import UserProfileImage from "common/components/userProfileImage";
import PositionChip from "common/components/chips/preset/positionChip";
import ParsedText from "../parsedText";
import { Container, FromWhere } from "../styled";
import {
  Wrapper,
  AvatarHolder,
  UserDataHolder,
  UsernameContainer,
  UserBio,
  PositionChipsWrapper,
  Username,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps {
  user: Moim.User.ISearchedUserBody;
}

const SearchUser: React.FC<IProps> = ({ user }) => {
  return (
    <Container>
      <FromWhere>{user.moimName}</FromWhere>
      <Spacer value={8} />
      <Wrapper>
        <AvatarHolder>
          <UserProfileImage
            size="m"
            src={user.avatar}
            userId={user.id}
            canOpenProfileDialog={false}
          />
        </AvatarHolder>
        <UserDataHolder hasBio={Boolean(user.bio)}>
          <UsernameContainer>
            <Username>
              <ShavedText
                value={<ParsedText content={user.username} />}
                line={1}
              />
            </Username>
            {user.positions && (
              <PositionChipsWrapper>
                <PositionChip
                  id={user.positions[0].name}
                  size="small"
                  color={user.positions[0].color}
                  name={user.positions[0].name}
                />
              </PositionChipsWrapper>
            )}
          </UsernameContainer>
          {user.bio && (
            <UserBio>
              <ShavedText
                value={<ParsedText content={user.bio || ""} />}
                line={3}
              />
            </UserBio>
          )}
        </UserDataHolder>
      </Wrapper>
    </Container>
  );
};

export default React.memo(SearchUser);
