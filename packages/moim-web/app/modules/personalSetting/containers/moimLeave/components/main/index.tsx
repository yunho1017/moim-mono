import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { SingleLineBoxInput } from "common/components/designSystem/boxInput";
import {
  Wrapper,
  Title,
  Section,
  Description,
  LeaveButton,
  Warning,
  InputLabel,
} from "./styled";
import useGroupTexts from "common/hooks/useGroupTexts";

interface IProps {
  moimName: string;
  username: string;
  isValidUsername?: boolean;
  isChildMoim: boolean;
  onChangeUsernameInput(value: string): void;
  onLeaveClick(): void;
}

const MoimLeaveComponent: React.FC<IProps> = ({
  moimName,
  isValidUsername,
  isChildMoim,
  onChangeUsernameInput,
  onLeaveClick,
}) => {
  const intl = useIntl();
  const warningTexts = useGroupTexts("leave_parent_moim_notice");

  return (
    <Wrapper>
      <Title>
        <FormattedMessage
          id={
            isChildMoim
              ? "personal_settings_leave_child_moim"
              : "personal_settings_leave_parent_moim"
          }
          values={{ moim_name: moimName }}
        />
      </Title>
      <Warning>
        {isChildMoim ? (
          <FormattedMessage id="leave_child_moim_notice" />
        ) : (
          warningTexts?.singular
        )}
      </Warning>
      <Section>
        <Description>
          <FormattedMessage
            id={
              isChildMoim
                ? "personal_settings_leave_child_moim_confirm_guide_text"
                : "personal_settings_leave_parent_moim_confirm_guide_text"
            }
            values={{ moim_name: moimName }}
          />
        </Description>
        <InputLabel>
          <FormattedMessage
            id={
              isChildMoim
                ? "personal_settings_leave_child_moim_confirm_input"
                : "personal_settings_leave_parent_moim_confirm_input"
            }
          />
        </InputLabel>
        <SingleLineBoxInput
          size="Large"
          status={
            isValidUsername
              ? "Focused"
              : isValidUsername === undefined
              ? "Inactive"
              : "Error"
          }
          placeholder={intl.formatMessage({
            id: isChildMoim
              ? "personal_settings_leave_child_moim_confirm_input_placeholder"
              : "personal_settings_leave_parent_moim_confirm_input_placeholder",
          })}
          helperText={
            isValidUsername === false &&
            intl.formatMessage(
              {
                id: isChildMoim
                  ? "personal_settings_leave_child_moim_confirm_error_identify_name"
                  : "personal_settings_leave_parent_moim_confirm_error_identify_name",
              },
              { moim_name: moimName },
            )
          }
          onChange={onChangeUsernameInput}
        />
      </Section>
      <Section>
        <LeaveButton disabled={!isValidUsername} onClick={onLeaveClick}>
          <FormattedMessage
            id={
              isChildMoim
                ? "button_leave_child_moim"
                : "button_leave_parent_moim"
            }
          />
        </LeaveButton>
      </Section>
    </Wrapper>
  );
};

export default MoimLeaveComponent;
