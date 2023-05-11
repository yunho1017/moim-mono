import * as React from "react";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { Switch } from "common/components/designSystem/inputs";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  padding: 0 ${px2rem(16)};
  margin-bottom: ${px2rem(8)};
`;
const InputTitleWrapper = styled.div<{ disabled: boolean }>`
  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.colorV2.colorSet.grey200};
    `}
`;

interface IProps {
  checked: boolean;
  onChange(option: boolean): void;
}
const AuthorRightSwitchInput: React.FC<IProps> = ({ checked, onChange }) => {
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
          <InputTitleWrapper disabled={!checked}>
            <FormattedMessage id="channel_settings/rights/limited_author_title" />
          </InputTitleWrapper>
        }
        description={
          <FormattedMessage id="channel_settings/rights/limited_author_guide" />
        }
      />
    </Wrapper>
  );
};

export default AuthorRightSwitchInput;
