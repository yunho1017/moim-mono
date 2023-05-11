import * as React from "react";
import { FormattedMessage } from "react-intl";

import { ReasonInput } from "common/components/reasonInput";
import { REGEX_SPECIAL_CHARACTER } from "common/hooks/useValidNameCheck";

import { IStepProps } from "../interface";
import BaseTemplate from "../template";
import { Wrapper } from "./styled";
import useGroupTexts from "common/hooks/useGroupTexts";

const ErrorMessage = React.memo(
  ({ error, username }: { username: string; error?: Moim.IErrorResponse }) => {
    if (!error) {
      return (
        <FormattedMessage id="create_moim/set_username/input_field_guide_success" />
      );
    }

    switch (error.code) {
      case "INVALID_USERNAME":
        return (
          <FormattedMessage
            id="create_moim/set_username/input_field_error_substrings"
            values={{
              substring:
                new RegExp(REGEX_SPECIAL_CHARACTER).exec(username)?.[0] || "",
            }}
          />
        );
      case "INVALID_USERNAME_LENGTH":
        return (
          <FormattedMessage id="create_moim/set_username/input_field_error_character" />
        );
      case "DUPLICATED_USERNAME_IN_PARENT_GROUP":
      case "DUPLICATED_USERNAME":
        return (
          <FormattedMessage id="create_moim/set_username/input_field_error_duplicated" />
        );
      case "FORBIDDEN_USERNAME":
        return (
          <FormattedMessage
            id="create_moim/set_username/input_field_error_ban"
            values={{ name: username }}
          />
        );
      case "INVALID_PARAMETER": {
        return null;
      }
      default:
        return <span>{error.message}</span> || null;
    }
  },
);

interface IProps extends IStepProps<string> {
  extraElement?: React.ReactNode;
  disabledButton?: boolean;
}

export default function Username({
  handleButtonClick,
  data,
  stepData,
  extraElement,
  disabledButton,
}: IProps) {
  const signupNameSettingPlaceholder = useGroupTexts(
    "dialog_signup_name_setting_placeholder",
  );
  const reasonMessage = React.useMemo(
    () =>
      !data.value
        ? stepData?.description
        : Boolean(data.value) && (
            <ErrorMessage error={data.error} username={data.value} />
          ),
    [data.error, data.value, stepData],
  );

  const reasonType = React.useMemo(
    () => (!data.value ? "normal" : Boolean(data.error) ? "error" : "success"),
    [data.error, data.value],
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      data.handler(value);
    },
    [data],
  );

  if (!stepData) {
    return null;
  }

  return (
    <BaseTemplate
      stepData={stepData}
      onClick={handleButtonClick}
      disabledButton={disabledButton || !data.value || Boolean(data.error)}
      waitingButton={data.isLoading}
    >
      <Wrapper>
        <ReasonInput
          reasonMessage={reasonMessage}
          reasonType={reasonType}
          placeholder={signupNameSettingPlaceholder?.singular}
          value={data.value}
          onChange={handleChange}
          tabIndex={-1}
        />
        {extraElement}
      </Wrapper>
    </BaseTemplate>
  );
}
