import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { Checkbox, Radio, Switch } from "common/components/designSystem/inputs";
import { px2rem } from "common/helpers/rem";
import { B1Regular } from "common/components/designSystem/typos";

export interface ISwitchInputProps {
  checked: boolean;
  onChange: (option: boolean) => void;
}

export interface ISwitchInputTemplateProps extends ISwitchInputProps {
  titleKey: string;
  descriptionKey?: string;
}

const InputTitleWrapper = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: ${px2rem(12)};
  }
`;

export const SwitchInputTemplate: React.FC<ISwitchInputTemplateProps> = ({
  titleKey,
  descriptionKey,
  checked,
  onChange,
}) => {
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
    <SettingInput
      input={<Switch checked={checked} onChange={handleChange} />}
      direction="horizontal"
      title={
        <InputTitleWrapper>
          <FormattedMessage id={titleKey} />
        </InputTitleWrapper>
      }
      description={descriptionKey && <FormattedMessage id={descriptionKey} />}
    />
  );
};

export interface IRadioInputProps {
  status: Moim.NotificationStatusType;
  onChange: (option: Moim.NotificationStatusType) => void;
}

export interface IRadioInputTemplateProps extends IRadioInputProps {
  value: Moim.NotificationStatusType;
  titleKey: string;
  descriptionKey?: string;
  icon?: React.ReactNode;
}

export function RadioInputTemplate({
  value,
  titleKey,
  descriptionKey,
  status,
  icon,
  onChange,
}: IRadioInputTemplateProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      if (e.currentTarget.checked) {
        const value = e.currentTarget.value as Moim.NotificationStatusType;
        onChange(value);
      }
    },
    [onChange],
  );

  return (
    <SettingInput
      input={
        <Radio
          name={titleKey}
          value={value}
          checked={status === value}
          defaultChecked={status === value}
          onChange={handleChange}
        />
      }
      direction="horizontal"
      title={
        <InputTitleWrapper>
          {icon}
          <div>
            <FormattedMessage id={titleKey} />
          </div>
        </InputTitleWrapper>
      }
      description={descriptionKey && <FormattedMessage id={descriptionKey} />}
    />
  );
}

export interface ICheckBoxInputProps {
  titleKey: string;
  checked: boolean;
  onChange: (option: boolean) => void;
}

const CheckBoxInputWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
`;

const CheckBoxInputTitle = styled(B1Regular)`
  margin-right: ${px2rem(3)};
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

const CheckBoxTouchArea = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function CheckBoxInput({
  titleKey,
  checked,
  onChange,
}: ICheckBoxInputProps) {
  const handleClick = React.useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <CheckBoxInputWrapper>
      <CheckBoxInputTitle>
        <FormattedMessage id={titleKey} />
      </CheckBoxInputTitle>
      <CheckBoxTouchArea onClick={handleClick}>
        <Checkbox checked={checked} />
      </CheckBoxTouchArea>
    </CheckBoxInputWrapper>
  );
}
