import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Section,
  SectionTitle,
  InputWrapper,
  ReadonlySingleLineInputWrapper,
} from "../styled";
import { SingleLineBoxInput } from "common/components/designSystem/boxInput";

import {
  GhostGeneralButton,
  TextButton,
} from "common/components/designSystem/buttons";

import useProfileInputDisabled from "common/hooks/useProfileInputDisabled";
import { useIntlShort } from "common/hooks/useIntlShort";

const EmailSection: React.FC<{ email?: string }> = ({ email: emailProps }) => {
  const intl = useIntlShort();
  const inputDisabled = useProfileInputDisabled();
  const [readonly, setReadonly] = React.useState(true);
  const [email, setEmail] = React.useState(emailProps ?? "");

  const handleClickEditButton = React.useCallback(() => {
    setReadonly(false);
  }, []);
  const handleChangeEmail = React.useCallback((email: string) => {
    setEmail(email);
  }, []);

  React.useEffect(() => {
    if (emailProps && emailProps !== email) {
      setEmail(emailProps);
    }
  }, [emailProps]);

  return (
    <Section>
      <SectionTitle>
        <FormattedMessage id="edit_profile_show/email_title" />
        {/* TODO: 추후에 이메일 수정 기능 추가 */}
        {false &&
          inputDisabled &&
          (readonly ? (
            <GhostGeneralButton size="s" onClick={handleClickEditButton}>
              <FormattedMessage id="edit_button" />
            </GhostGeneralButton>
          ) : (
            <TextButton size="s">
              <FormattedMessage id="save_button" />
            </TextButton>
          ))}
      </SectionTitle>
      <InputWrapper>
        {readonly ? (
          <ReadonlySingleLineInputWrapper isEmpty={!email}>
            {email ? email : intl("edit_profile_show_email_placeholder")}
          </ReadonlySingleLineInputWrapper>
        ) : (
          <SingleLineBoxInput
            size="Large"
            disabled={true}
            value={email}
            onChange={handleChangeEmail}
          />
        )}
      </InputWrapper>
    </Section>
  );
};

export default React.memo(EmailSection);
