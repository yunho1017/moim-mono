import * as React from "react";
import SettingInput from "../../../settingInput";
import TextInputWithSuffix from "common/components/textInputWithSuffix";
import SettingCell from "../../../settingCell";
import { ReasonBox } from "common/components/reasonInput";

interface IProps {
  title: string;
  prefix: string;
  suffix: string;
  placeholder: string;
  guideMessage?: string;
  errorMessage?: string;
  onChange: (urlPrefix: string) => void;
}

function UrlPrefixInput(props: IProps) {
  const {
    title,
    prefix,
    suffix,
    placeholder,
    guideMessage,
    errorMessage,
    onChange,
  } = props;

  const handleChangeUrlPrefix: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      onChange(event.currentTarget.value);
    },
    [onChange],
  );

  return (
    <SettingCell title={title}>
      <SettingInput
        input={
          <TextInputWithSuffix
            suffix={suffix}
            value={prefix}
            onChange={handleChangeUrlPrefix}
            placeholder={placeholder}
          />
        }
        direction="vertical"
      />
      {errorMessage || guideMessage ? (
        <ReasonBox reasonType={errorMessage ? "error" : "normal"}>
          {errorMessage || guideMessage}
        </ReasonBox>
      ) : null}
    </SettingCell>
  );
}

export default UrlPrefixInput;
