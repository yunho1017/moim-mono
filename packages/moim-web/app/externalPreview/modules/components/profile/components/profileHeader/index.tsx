import * as React from "react";
// components
import UserProfileImage from "common/components/userProfileImage";
// styled
import { Wrapper, ProfileContainer, ProfileImageHolder } from "./styled";

export interface IProps {
  userId: Moim.Id;
  avatar: string;
}

const ProfileHeader: React.FC<IProps> = ({ userId, avatar }) => {
  return (
    <Wrapper>
      <ProfileContainer>
        <ProfileImageHolder type="show">
          <UserProfileImage
            size="xl"
            shape="round"
            src={avatar}
            userId={userId}
            isOnline={undefined}
            canOpenProfileDialog={false}
            enableBlockedPlaceholder={false}
          />
        </ProfileImageHolder>
      </ProfileContainer>
    </Wrapper>
  );
};

export default ProfileHeader;
