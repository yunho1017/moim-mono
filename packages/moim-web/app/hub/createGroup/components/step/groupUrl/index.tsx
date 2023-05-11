import * as React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { IStepProps } from "../interface";

import { ReasonInput } from "common/components/reasonInput";
import BaseTemplate, { Description } from "../template";
import { Wrapper } from "./styled";

export type IProps = IStepProps<string>;

const ErrorMessage = React.memo(
  ({ url, error }: { url: string; error?: Moim.IErrorResponse }) => {
    if (!error) {
      return null;
    }
    switch (error.code) {
      case "INVALID_DOMAIN_LENGTH":
        return <FormattedMessage id="create_moim/moim_url/error_length" />;
      case "INVALID_DOMAIN_FORMAT":
        return <FormattedMessage id="create_moim/moim_url/error" />;
      case "FORBIDDEN_DOMAIN":
        return (
          <FormattedMessage
            id="create_moim/moim_url/error_forbidden"
            values={{ input_url: url }}
          />
        );
      case "DOMAIN_ALREADY_IN_USE":
        return <FormattedMessage id="create_moim/moim_url/error_duplicated" />;

      default:
        return <span>{error.message}</span> || null;
    }
  },
);

export default function GroupUrl({
  handleButtonClick,
  data,
  stepData,
}: IProps) {
  const intl = useIntl();
  const disableButton = !data.value || Boolean(data.error) || data.isLoading;
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
      disabledButton={disableButton}
    >
      <Wrapper>
        <ReasonInput
          reasonMessage={<ErrorMessage url={data.value} error={data.error} />}
          reasonType={data.error ? "error" : "normal"}
          placeholder={intl.formatMessage({
            id: "create_moim/moim_url/placeholder",
          })}
          value={data.value}
          suffix={intl.formatMessage({
            id: "create_moim/moim_url/service_url",
          })}
          onChange={handleChange}
          tabIndex={-1}
        />
        {!data.error && <Description>{stepData.description}</Description>}
      </Wrapper>
    </BaseTemplate>
  );
}
