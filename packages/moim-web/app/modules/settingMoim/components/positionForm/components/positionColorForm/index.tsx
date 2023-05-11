import * as React from "react";
import { useIntl } from "react-intl";
import SettingInput from "../../../settingInput";
import SettingCell from "../../../settingCell";
import ColorPalette from "../colorPalette";
import COLOR_SET from "./colorSet";
import { ColorInputWrapper } from "../../styled";

interface IProps {
  color?: string;
  onChange: (color: string) => void;
}

function PositionColorForm(props: IProps) {
  const { color, onChange } = props;
  const intl = useIntl();

  const title = intl.formatMessage({
    id: "position_settings/create_position/position_color_title",
  });

  const description = intl.formatMessage({
    id: "position_settings/create_position/position_color_guide",
  });

  return (
    <SettingCell title={title} hasDivider={false}>
      <SettingInput
        input={
          <ColorInputWrapper>
            <ColorPalette
              selectedColor={color}
              colorSet={COLOR_SET}
              onChange={onChange}
            />
          </ColorInputWrapper>
        }
        direction="vertical"
        description={description}
      />
    </SettingCell>
  );
}

export default PositionColorForm;
