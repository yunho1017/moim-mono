import * as React from "react";

import { Header, UsernameWrapper, Username } from "../styledComponent";
import ProfileHeader from "common/components/profileHeader";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

interface IProps {
  userData: Moim.User.IUser;
  onCloseRequest(): void;
  onProfileClick(): void;
}

const ProfileDialogHeader = ({
  userData,
  onCloseRequest,
  onProfileClick,
}: IProps) => {
  return (
    <>
      <Header>
        <ProfileHeader
          type="preview"
          userId={userData.id}
          avatar={userData.avatar_url || ""}
          isOnline={userData.presence === "ACTIVE"}
          onCloseRequest={onCloseRequest}
        />
      </Header>
      <UsernameWrapper>
        <Username role="button" onClick={onProfileClick}>
          <ShavedText
            value={<NativeEmojiSafeText value={userData.name} />}
            line={2}
          />
        </Username>
      </UsernameWrapper>
    </>
  );
};

export default ProfileDialogHeader;
