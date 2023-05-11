import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Section,
  SectionTitle,
  InputWrapper,
  ReadonlyMultiLineInputWrapper,
} from "../styled";
import { MultilineBoxInput } from "common/components/designSystem/boxInput";
import {
  GhostGeneralButton,
  TextButton,
} from "common/components/designSystem/buttons";

import useProfileInputDisabled from "common/hooks/useProfileInputDisabled";
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import useStateWithMaxLength from "common/hooks/useStateWithMaxLength";
import useOpenState from "common/hooks/useOpenState";

import { BIO_MAX_LENGTH } from "app/modules/profileEditor/components/baseLayout/useHooks";
import { updateMyProfileWithHandlingResult } from "../../actions";

const BioSection: React.FC<{ bio?: string }> = ({ bio: bioProps }) => {
  const intl = useIntl();
  const cancelToken = useCancelToken();
  const inputDisabled = useProfileInputDisabled();
  const {
    close: endEditMode,
    open: startEditMode,
    isOpen: isEditMode,
  } = useOpenState();
  const { error, handleChange, state: bio } = useStateWithMaxLength({
    maxLength: 300,
    minLength: 0,
  });

  const helperMessage = React.useMemo(() => {
    if (Boolean(bio)) {
      if (!error) {
        return <span></span>;
      }

      switch (error.code) {
        case "START_WITH_WHITE_SPACE":
        case "TOO_SHORT":
        case "TOO_LONG":
          return (
            <FormattedMessage
              id="error_character_number_limit"
              values={{ count: BIO_MAX_LENGTH }}
            />
          );

        default:
          return <span>{error.message}</span>;
      }
    }
  }, [bio, error]);

  const { dispatchProfileEdit } = useActions({
    dispatchProfileEdit: updateMyProfileWithHandlingResult,
  });

  const handleSave = React.useCallback(() => {
    dispatchProfileEdit(
      {
        bio: bio !== "" ? bio : null,
      },
      cancelToken.current.token,
      endEditMode,
    );
  }, [dispatchProfileEdit, bio, endEditMode]);

  React.useEffect(() => {
    if (bioProps && bioProps !== bio) {
      handleChange(bioProps);
    }
  }, [bioProps]);

  return (
    <Section>
      <SectionTitle>
        <FormattedMessage id="edit_profile_show/bio_title" />
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
          <MultilineBoxInput
            value={bio}
            placeholder={intl.formatMessage({
              id: "edit_profile/set_bio/placeholder",
            })}
            onChange={handleChange}
            disabled={inputDisabled}
            status={Boolean(error) ? "Error" : undefined}
            helperText={helperMessage}
          />
        ) : (
          <ReadonlyMultiLineInputWrapper isEmpty={!bio}>
            {bio
              ? bio
              : intl.formatMessage({
                  id: "edit_profile/set_bio/placeholder",
                })}
          </ReadonlyMultiLineInputWrapper>
        )}
      </InputWrapper>
    </Section>
  );
};

export default React.memo(BioSection);
