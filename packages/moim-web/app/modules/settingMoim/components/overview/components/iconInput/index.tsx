// vendor
import * as React from "react";
// component
import SettingCell from "../../../settingCell";
import SettingInput from "../../../settingInput";
import SettingMoimIcon from "common/components/settingMoimIcon";

interface IProps extends React.ComponentProps<typeof SettingMoimIcon> {
  title: string;
  guideMessage: string;
}

function IconInput(props: IProps) {
  const { title, guideMessage, ...rest } = props;

  return (
    <SettingCell title={title}>
      <SettingInput
        input={<SettingMoimIcon {...rest} />}
        direction="horizontal"
        description={guideMessage}
      />
    </SettingCell>
  );
}

export default IconInput;
