import * as React from "react";
import { FormattedMessage } from "react-intl";
import SettingCell from "app/modules/settingMoim/components/settingCell";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { Switch, Checkbox } from "common/components/designSystem/inputs";
import useGroupTexts from "common/hooks/useGroupTexts";
import useIsMobile from "common/hooks/useIsMobile";
import SettingPageInfo from "app/modules/personalSetting/components/SettingPageInfo";

interface IProps {
  checked: boolean;
  onChange(config: Partial<Moim.User.INotificationConfig>): void;
}

export default function BlockDmSettingCell(props: IProps) {
  const isMobile = useIsMobile();
  const memberTexts = useGroupTexts("member");
  const { checked, onChange } = props;

  const handleChangeBlockDm = React.useCallback(() => {
    onChange({ blockDm: !checked });
  }, [onChange, checked]);

  return (
    <>
      <SettingPageInfo
        title={
          <FormattedMessage id="personal_settings_menu_privacy_and_safety" />
        }
      ></SettingPageInfo>
      <SettingCell hasDivider={false}>
        <SettingInput
          title={
            <FormattedMessage
              id="personal_settings_privacy_and_safety_alllow_dm_title"
              values={{
                ref_member: memberTexts?.plural ?? "",
              }}
            />
          }
          input={
            !isMobile ? (
              <Checkbox
                name="privacy_type_blockDm"
                value="email"
                onChange={handleChangeBlockDm}
                checked={!checked}
              />
            ) : (
              <Switch
                name="privacy_type_blockDm"
                value="email"
                onChange={handleChangeBlockDm}
                checked={!checked}
              />
            )
          }
          direction="horizontal"
          description={
            <FormattedMessage
              id="personal_settings_privacy_and_safety_alllow_dm_guide"
              values={{
                ref_member: memberTexts?.plural ?? "",
              }}
            />
          }
        />
      </SettingCell>
    </>
  );
}
