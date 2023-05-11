import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Spacer } from "common/components/designSystem/spacer";
import {
  Wrapper,
  SubmitButton,
  ResultContainer,
  ResultTitle,
  ResultDescription,
  SuccessIcon,
  FailureIcon,
  ResultButtonContainer,
} from "./styled";

interface IProps {
  type: "failed" | "succeed";
  onClose(): void;
}

const RemitResult: React.FC<IProps> = ({ type, onClose }) => {
  return (
    <Wrapper>
      <ResultContainer>
        {type === "succeed" ? <SuccessIcon /> : <FailureIcon />}
        <Spacer value={8} />
        <ResultTitle>
          <FormattedMessage
            id={
              type === "succeed"
                ? "transfer_fund_success_title"
                : "transfer_fund_fail_title"
            }
          />
        </ResultTitle>
        <ResultDescription>
          <FormattedMessage
            id={
              type === "succeed"
                ? "transfer_fund_success_description"
                : "transfer_fund_fail_description"
            }
          />
        </ResultDescription>

        <ResultButtonContainer>
          <SubmitButton onClick={onClose}>
            <FormattedMessage id="button_ok" />
          </SubmitButton>
        </ResultButtonContainer>
      </ResultContainer>
    </Wrapper>
  );
};

export default RemitResult;
