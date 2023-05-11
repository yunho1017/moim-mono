import * as React from "react";
import { FormattedMessage } from "react-intl";
// hooks
import { IProps, useProps, useHandlers } from "./useHooks";
// components
import { ReasonInput, ReasonTextArea } from "common/components/reasonInput";
import ProfileImageChanger from "../profileImageChanger";
import {
  Wrapper,
  Section,
  SectionTitleWrapper,
  SectionTitle,
  SectionContent,
  ProfileImageWrapper,
  ReasonBoxStyle,
} from "./styledComponents";

const ProfileEditorComponent: React.FC<IProps> = props => {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    userData,
    intl,
    isAvatarUpdating,
    nameHandler,
    bioHandler,
    inputDisabled,
  } = hookProps;
  const {
    handleChangeName,
    nameErrorMessage,
    nameErrorType,
    handleChangeBio,
    bioErrorMessage,
    bioErrorType,
    handleChangeAvatar,
  } = hookHandlers;

  const nameValue = React.useMemo(
    () => (Boolean(nameHandler.state) ? nameHandler.state : undefined),
    [nameHandler.state],
  );
  const bioValue = React.useMemo(
    () => (Boolean(bioHandler.state) ? bioHandler.state : undefined),
    [bioHandler.state],
  );

  return (
    <Wrapper>
      <Section>
        <ProfileImageWrapper>
          <ProfileImageChanger
            src={userData.avatar_url || ""}
            isAvatarUpdating={isAvatarUpdating}
            onChange={handleChangeAvatar}
          />
        </ProfileImageWrapper>
      </Section>
      <Section>
        <SectionTitleWrapper>
          <SectionTitle>
            <FormattedMessage id="edit_profile_show/display_name_title" />
          </SectionTitle>
        </SectionTitleWrapper>
        <SectionContent>
          <ReasonInput
            value={nameValue}
            defaultValue={userData.name}
            placeholder={intl.formatMessage({
              id: "create_moim/set_username/placeholder",
            })}
            onChange={handleChangeName}
            reasonMessage={nameErrorMessage}
            reasonType={nameErrorType}
            reasonBoxOverrideStyle={ReasonBoxStyle}
            disabled={inputDisabled}
          />
        </SectionContent>
      </Section>
      <Section>
        <SectionTitleWrapper>
          <SectionTitle>
            <FormattedMessage id="edit_profile_show/bio_title" />
          </SectionTitle>
        </SectionTitleWrapper>
        <SectionContent>
          <ReasonTextArea
            value={bioValue}
            defaultValue={userData.bio}
            placeholder={intl.formatMessage({
              id: "edit_profile/set_bio/placeholder",
            })}
            onChange={handleChangeBio}
            reasonMessage={bioErrorMessage}
            reasonType={bioErrorType}
            reasonBoxOverrideStyle={ReasonBoxStyle}
            disabled={inputDisabled}
          />
        </SectionContent>
      </Section>
    </Wrapper>
  );
};

export default ProfileEditorComponent;
