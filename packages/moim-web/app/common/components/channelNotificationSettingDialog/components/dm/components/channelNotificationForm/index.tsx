import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import SettingInput from "app/modules/settingMoim/components/settingInput";
import { Switch } from "common/components/designSystem/inputs";
import { H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(5)} 0;
`;

const Wrapper = styled.div`
  padding: 0 ${px2rem(16)} ${px2rem(8)};
`;

interface IProps {
  checked: boolean;
  onChange(option: boolean): void;
}

function ChannelNotificationForm({ checked, onChange }: IProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const newChecked = e.currentTarget.checked;

      if (checked !== newChecked) {
        onChange(newChecked);
      }
    },
    [checked, onChange],
  );

  return (
    <Wrapper>
      <SettingInput
        input={<Switch checked={checked} onChange={handleChange} />}
        direction="horizontal"
        title={
          <Title>
            <FormattedMessage id="channel_notification_settings/dm_notification_title" />
          </Title>
        }
        description={
          <FormattedMessage id="channel_notification_settings/dm_notification_guide" />
        }
      />
    </Wrapper>
  );
}

export default ChannelNotificationForm;
