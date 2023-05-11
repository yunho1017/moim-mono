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
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useIntlShort } from "common/hooks/useIntlShort";
import useOpenState from "common/hooks/useOpenState";
import useUsernameValidation, {
  ErrorStatusCode,
  REGEX_SPECIAL_CHARACTER,
} from "common/hooks/useValidNameCheck";

import { updateMyProfileWithHandlingResult } from "../../actions";

const UsernameSection: React.FC<{ username?: string }> = ({
  username: usernameProps,
}) => {
  const intl = useIntlShort();
  const cancelToken = useCancelToken();
  const inputDisabled = useProfileInputDisabled();
  const {
    close: endEditMode,
    open: startEditMode,
    isOpen: isEditMode,
  } = useOpenState();
  const { error, handleChange, state: username } = useUsernameValidation(
    usernameProps,
  );

  const { dispatchProfileEdit } = useActions({
    dispatchProfileEdit: updateMyProfileWithHandlingResult,
  });
  const helperMessage = React.useMemo(() => {
    if (Boolean(username)) {
      if (!error) {
        return (
          <FormattedMessage id="set_your_name/input_field_guide_success" />
        );
      }

      switch (error.code as ErrorStatusCode) {
        case "INVALID_USERNAME":
          return (
            <FormattedMessage
              id="set_your_name/input_field_error_substrings"
              values={{
                substring:
                  new RegExp(REGEX_SPECIAL_CHARACTER).exec(username)?.[0] || "",
              }}
            />
          );
        case "INVALID_USERNAME_LENGTH":
          return (
            <FormattedMessage id="set_your_name/input_field_error_character" />
          );

        case "DUPLICATED_USERNAME_IN_PARENT_GROUP":
        case "DUPLICATED_USERNAME":
          return (
            <FormattedMessage id="set_your_name/input_field_error_duplicated" />
          );
        case "FORBIDDEN_USERNAME":
          return (
            <FormattedMessage
              id="set_your_name/input_field_error_ban"
              values={{ name: username }}
            />
          );
        case "INVALID_PARAMETER": {
          return null;
        }

        default:
          return <span>{error.message}</span>;
      }
    }
  }, [username, error]);

  const handleSave = React.useCallback(() => {
    dispatchProfileEdit(
      {
        name: username !== "" ? username : null,
      },
      cancelToken.current.token,
      endEditMode,
    );
  }, [dispatchProfileEdit, username, endEditMode]);

  React.useEffect(() => {
    if (usernameProps && usernameProps !== username) {
      handleChange(usernameProps);
    }
  }, [usernameProps]);

  return (
    <Section>
      <SectionTitle>
        <FormattedMessage id="edit_profile_show/username_title" />
        {!inputDisabled &&
          (isEditMode ? (
            <TextButton size="s" onClick={handleSave} disabled={Boolean(error)}>
              <FormattedMessage id="save_button" />
            </TextButton>
          ) : (
            <GhostGeneralButton size="s" onClick={startEditMode}>
              <FormattedMessage id="edit_button" />
            </GhostGeneralButton>
          ))}
      </SectionTitle>
      <InputWrapper>
        {isEditMode ? (
          <SingleLineBoxInput
            size="Large"
            value={username}
            placeholder={intl("create_moim/set_username/placeholder")}
            onChange={handleChange}
            status={Boolean(error) ? "Error" : undefined}
            helperText={helperMessage}
          />
        ) : (
          <ReadonlySingleLineInputWrapper>
            {username}
          </ReadonlySingleLineInputWrapper>
        )}
      </InputWrapper>
    </Section>
  );
};

export default React.memo(UsernameSection);
