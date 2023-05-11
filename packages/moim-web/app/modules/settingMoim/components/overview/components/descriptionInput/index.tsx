// vendor
import * as React from "react";
// component
import SettingCell from "../../../settingCell";
import SettingInput from "../../../settingInput";
import ResponsiveTextArea from "common/components/responsiveTextArea";
import { descriptionTextAreaStyle } from "../../../../styled";
import { ReasonBox } from "common/components/reasonInput";

interface IProps {
  description: string;
  title: string;
  placeholder: string;
  guideMessage: string;
  errorMessage?: string;
  hasDivider?: boolean;
  onChange: (description: string) => void;
}

function DescriptionInput(props: IProps) {
  const {
    description,
    title,
    placeholder,
    guideMessage,
    errorMessage,
    onChange,
    hasDivider = false,
  } = props;

  return (
    <SettingCell title={title} hasDivider={hasDivider}>
      <SettingInput
        input={
          <ResponsiveTextArea
            placeholder={placeholder}
            content={description}
            styles={descriptionTextAreaStyle}
            onContentChange={onChange}
          />
        }
        direction="vertical"
      />

      <ReasonBox reasonType={errorMessage ? "error" : "normal"}>
        {errorMessage || guideMessage}
      </ReasonBox>
    </SettingCell>
  );
}

export default DescriptionInput;
