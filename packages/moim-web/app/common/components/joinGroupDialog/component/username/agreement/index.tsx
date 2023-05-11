import * as React from "react";
import { FormattedMessage } from "react-intl";

import { Checkbox } from "common/components/designSystem/inputs";
import {
  AgreementWrapper,
  CheckBoxTouchArea,
  CheckBoxInputTitle,
  AgreementAll,
  AgreementDetailWrapper,
  AgreementDetailItem,
} from "./styled";
import { getAgreementConfig } from "../helpers";

interface IProps {
  group?: Moim.Group.INormalizedGroup | null;
  value: {
    email: boolean;
    sms: boolean;
    appPush: boolean;
  };

  onChange: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      sms: boolean;
      appPush: boolean;
    }>
  >;
}

export default function Agreement({ group, value, onChange }: IProps) {
  const {
    isRequiredEmailAgreement: isRequiredEmail,
    isVisibleEmailAgreement: isVisibleEmail,
    isRequiredSmsAgreement: isRequiredSms,
    isVisibleSmsAgreement: isVisibleSms,
    isRequiredAppAgreement: isRequiredApp,
    isVisibleAppAgreement: isVisibleApp,
  } = React.useMemo(() => getAgreementConfig(group), [group]);

  const agreementAllTextKey = React.useMemo(() => {
    if (isVisibleEmail && isVisibleSms && isVisibleApp) {
      return isRequiredEmail && isRequiredSms && isRequiredApp
        ? "ad_push_agreement_all_required"
        : "ad_push_agreement_all_optional";
    } else if (isVisibleSms) {
      return isRequiredSms
        ? "ad_push_agreement_sms_required"
        : "ad_push_agreement_sms_optional";
    } else if (isVisibleEmail) {
      return isRequiredEmail
        ? "ad_push_agreement_email_required"
        : "ad_push_agreement_email_optional";
    } else if (isVisibleApp) {
      return isRequiredApp
        ? "ad_push_agreement_app_required"
        : "ad_push_agreement_app_optional";
    }
    return "";
  }, [
    isVisibleEmail,
    isVisibleSms,
    isVisibleApp,
    isRequiredEmail,
    isRequiredSms,
    isRequiredApp,
  ]);

  const isAllChecked = React.useMemo(() => {
    if (!isVisibleApp) {
      return value.email && value.sms;
    } else if (!isVisibleSms) {
      return value.email && value.appPush;
    } else if (!isVisibleEmail) {
      return value.sms && value.appPush;
    } else {
      return value.email && value.sms && value.appPush;
    }
  }, [
    isVisibleApp,
    isVisibleEmail,
    isVisibleSms,
    value.appPush,
    value.email,
    value.sms,
  ]);

  const handleChangeAgreementAll: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const checked = e.currentTarget.checked;
      onChange({
        email: checked,
        sms: checked,
        appPush: checked,
      });
    },
    [onChange],
  );
  const handleChangeAgreementEmail: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const checked = e.currentTarget.checked;
      onChange(currentValue => ({ ...currentValue, email: checked }));
    },
    [onChange],
  );
  const handleChangeAgreementSms: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const checked = e.currentTarget.checked;
      onChange(currentValue => ({ ...currentValue, sms: checked }));
    },
    [onChange],
  );
  const handleChangeAgreementApp: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const checked = e.currentTarget.checked;
      onChange(currentValue => ({ ...currentValue, appPush: checked }));
    },
    [onChange],
  );

  if (!isVisibleSms && !isVisibleEmail && !isVisibleApp) {
    return null;
  }
  return (
    <AgreementWrapper>
      <AgreementAll
        required={isRequiredSms && isRequiredEmail && isRequiredApp}
      >
        <CheckBoxTouchArea>
          <Checkbox
            checked={isAllChecked}
            onChange={handleChangeAgreementAll}
          />
        </CheckBoxTouchArea>
        <CheckBoxInputTitle>
          <FormattedMessage id={agreementAllTextKey} />
        </CheckBoxInputTitle>
      </AgreementAll>
      <AgreementDetailWrapper>
        {isVisibleSms && (
          <AgreementDetailItem>
            <CheckBoxTouchArea>
              <Checkbox
                checked={value.sms}
                onChange={handleChangeAgreementSms}
              />
            </CheckBoxTouchArea>
            <CheckBoxInputTitle hasRequiredMark={isRequiredSms}>
              <FormattedMessage id="ad_push_agreement_all_sms" />
            </CheckBoxInputTitle>
          </AgreementDetailItem>
        )}
        {isVisibleEmail && (
          <AgreementDetailItem>
            <CheckBoxTouchArea>
              <Checkbox
                checked={value.email}
                onChange={handleChangeAgreementEmail}
              />
            </CheckBoxTouchArea>
            <CheckBoxInputTitle hasRequiredMark={isRequiredEmail}>
              <FormattedMessage id="ad_push_agreement_all_email" />
            </CheckBoxInputTitle>
          </AgreementDetailItem>
        )}
        {isVisibleApp && (
          <AgreementDetailItem>
            <CheckBoxTouchArea>
              <Checkbox
                checked={value.appPush}
                onChange={handleChangeAgreementApp}
              />
            </CheckBoxTouchArea>
            <CheckBoxInputTitle hasRequiredMark={isRequiredApp}>
              <FormattedMessage id="ad_push_agreement_all_push" />
            </CheckBoxInputTitle>
          </AgreementDetailItem>
        )}
      </AgreementDetailWrapper>
    </AgreementWrapper>
  );
}
