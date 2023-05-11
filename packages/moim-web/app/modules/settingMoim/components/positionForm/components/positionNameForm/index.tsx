import * as React from "react";
import { useIntl } from "react-intl";
import SettingCell from "app/modules/settingMoim/components/settingCell";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { ReasonInput } from "common/components/reasonInput";
import { getErrorMessage } from "./helper";

interface IProps {
  name: string;
  onChange: (name: string) => void;
  error?: Moim.IErrorResponse;
}

function PositionNameForm({ name, error, onChange }: IProps) {
  const intl = useIntl();
  const handleChangeName = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    event => {
      onChange(event.currentTarget.value);
    },
    [onChange],
  );

  const title = intl.formatMessage({
    id: "position_settings/create_position/position_name_title",
  });

  const placeholder = intl.formatMessage({
    id: "position_settings/create_position/position_name_placeholder",
  });

  const description = intl.formatMessage({
    id: "position_settings/create_position/position_name_guide",
  });

  const errorMessage = error ? getErrorMessage(intl, error) : "";

  return (
    <SettingCell title={title}>
      <SettingInput
        input={
          <ReasonInput
            reasonMessage={errorMessage || description}
            reasonType={error ? "error" : "normal"}
            value={name}
            onChange={handleChangeName}
            placeholder={placeholder}
          />
        }
        direction="vertical"
      />
    </SettingCell>
  );
}

export default PositionNameForm;
