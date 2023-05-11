import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Wrapper } from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import ProfileImageSection from "./components/profile";
import UsernameSection from "./components/username";
import BioSection from "./components/bio";
import EmailSection from "./components/email";
import PhoneNumberSection from "./components/phone";
import WalletAddressSection from "./components/walletAddress";
import SettingPageInfo from "../../components/SettingPageInfo";

import useCurrentUser from "common/hooks/useCurrentUser";
import useCurrentGroup from "common/hooks/useCurrentGroup";

const ProfileContainer: React.FC = () => {
  const currentUser = useCurrentUser();
  const currentGroup = useCurrentGroup();

  const visiblePhoneInput = React.useMemo(
    () =>
      currentGroup?.sign_up_config_v2.phone?.state === "optional" ||
      currentGroup?.sign_up_config_v2.phone?.state === "required",
    [currentGroup],
  );

  return (
    <Wrapper>
      <SettingPageInfo
        title={<FormattedMessage id="moim_settings/menu_profile_settings" />}
      />

      <ProfileImageSection />
      <Spacer value={16} />
      <UsernameSection username={currentUser?.name} />
      <Spacer value={16} />
      <BioSection bio={currentUser?.bio} />
      <Spacer value={16} />

      <EmailSection email={currentUser?.email} />
      <Spacer value={16} />

      {visiblePhoneInput && (
        <>
          <PhoneNumberSection phone={currentUser?.phoneNumber} />
          <Spacer value={16} />
        </>
      )}

      {currentUser?.metamask /* 추가 버튼 생길 떄 까지 임시로 넣어둠 */
        ? (currentUser?.metamask || currentGroup?.config.enableNFT) && (
            <>
              <WalletAddressSection metamask={currentUser?.metamask} />
              <Spacer value={16} />
            </>
          )
        : null}
    </Wrapper>
  );
};

export default ProfileContainer;
