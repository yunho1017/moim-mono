// vendor
import * as React from "react";
import { useIntl } from "react-intl";
// component
import SettingCell from "app/modules/settingMoim/components/settingCell";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import ResponsiveTextArea from "common/components/responsiveTextArea";
// helper
import { getErrorMessage } from "./helper";
import { ErrorMessage } from "../../styled";
import { textAreaStyle } from "./styled";

interface IProps {
  onChange: (description: string) => void;
  description: string;
  error?: Moim.IErrorResponse;
}

function PositionDescriptionForm({ description, error, onChange }: IProps) {
  const intl = useIntl();
  const handleChangeDescription = React.useCallback(
    (changedDescription: string) => {
      onChange(changedDescription);
    },
    [onChange],
  );

  const title = intl.formatMessage({
    id: "position_settings/create_position/position_description_title",
  });
  const placeholder = intl.formatMessage({
    id: "position_settings/create_position/position_description_placeholder",
  });
  const guide = intl.formatMessage({
    id: "position_settings/create_position/position_description_guide",
  });

  const errorMessage = error ? getErrorMessage(intl, error) : "";

  return (
    <SettingCell title={title}>
      <SettingInput
        input={
          <ResponsiveTextArea
            content={description}
            onContentChange={handleChangeDescription}
            placeholder={placeholder}
            styles={textAreaStyle}
          />
        }
        direction="vertical"
        description={
          errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : guide
        }
      />
    </SettingCell>
  );
}

export default PositionDescriptionForm;
