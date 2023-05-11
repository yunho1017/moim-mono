import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { IStepProps } from "../interface";

import BaseTemplate from "../template";
import { Wrapper } from "./styled";
import { ReasonInput } from "common/components/reasonInput";

type IProps = IStepProps<string>;

const ErrorMessage = React.memo(
  ({ error }: { error?: Moim.IErrorResponse }) => {
    if (!error) {
      return null;
    }
    switch (error.code) {
      case "START_WITH_WHITE_SPACE":
      case "TOO_SHORT":
      case "TOO_LONG":
        return <FormattedMessage id="create_moim/moim_name/error" />;

      default:
        return <span>error.message</span> || null;
    }
  },
);

export default function GroupName({
  handleButtonClick,
  data,
  stepData,
}: IProps) {
  const intl = useIntl();
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
      disabledButton={!data.value || Boolean(data.error)}
    >
      <Wrapper>
        <ReasonInput
          reasonMessage={<ErrorMessage error={data.error} />}
          reasonType={data.error ? "error" : "normal"}
          value={data.value}
          placeholder={intl.formatMessage({
            id: "create_moim/moim_name/placeholder",
          })}
          onChange={handleChange}
          tabIndex={-1}
        />
      </Wrapper>
    </BaseTemplate>
  );
}
