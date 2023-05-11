// vendor
import * as React from "react";
// component
import SettingInput from "../../../settingInput";
import { ReasonInput } from "common/components/reasonInput";
import SettingCell from "../../../settingCell";

interface IProps {
  name: string;
  title: string;
  placeholder: string;
  errorMessage?: string;
  guideMessage?: string;
  onChange: (name: string) => void;
}

function NameInput(props: IProps) {
  const {
    name,
    title,
    placeholder,
    errorMessage,
    guideMessage,
    onChange,
  } = props;

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  return (
    <SettingCell title={title}>
      <SettingInput
        input={
          <ReasonInput
            value={name}
            onChange={handleChangeInput}
            placeholder={placeholder}
            reasonMessage={errorMessage || guideMessage}
            reasonType={errorMessage ? "error" : "normal"}
          />
        }
        direction="vertical"
      />
    </SettingCell>
  );
}

export default NameInput;
