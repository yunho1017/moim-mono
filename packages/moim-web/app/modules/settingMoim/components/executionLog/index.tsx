import * as React from "react";
import { useIntl } from "react-intl";
import { ExecutionTitle, LogButton } from "./styled";
import { BaseItemCell } from "common/components/itemCell";

interface IProps {
  onClickButton?: () => void;
}

function ExecutionLog({ onClickButton }: IProps) {
  const intl = useIntl();

  return (
    <BaseItemCell
      title={
        <ExecutionTitle>
          {intl.formatMessage({ id: "execution_right/title" })}
        </ExecutionTitle>
      }
      rightElement={
        <LogButton size="s" onClick={onClickButton}>
          {intl.formatMessage({ id: "logs/title" })}
        </LogButton>
      }
      size="m"
    />
  );
}

export default ExecutionLog;
