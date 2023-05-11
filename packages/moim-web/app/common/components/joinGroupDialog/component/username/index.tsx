import * as React from "react";
import { FormattedMessage } from "react-intl";
// components

import UsernameBase from "app/hub/createGroup/components/step/username";
import Agreement from "./agreement";
import { getAgreementConfig } from "./helpers";
// hooks
import { useStoreState } from "app/store";
import useUsernameValidation from "common/hooks/useValidNameCheck";
import useGroupTexts from "common/hooks/useGroupTexts";

// helpers
import { errorParseData } from "common/helpers/APIErrorParser";

export interface IProps {
  group?: Moim.Group.INormalizedGroup | null;
  onNext(
    user: Partial<PickValue<Moim.User.IPostUserRequestBody, "user">>,
  ): void;
}

export default function Username({ group, onNext }: IProps) {
  const { isLoading } = useStoreState(state => ({
    isLoading: state.joinGroupDialog.isLoading,
  }));

  const {
    state: username,
    error: usernameError,
    setError: usernameSetError,
    handleChange: handleUsernameChange,
  } = useUsernameValidation();
  const [agreement, setAgreement] = React.useState<{
    email: boolean;
    sms: boolean;
    appPush: boolean;
  }>({
    email: false,
    sms: false,
    appPush: false,
  });
  const {
    isRequiredEmailAgreement,
    isRequiredSmsAgreement,
    isRequiredAppAgreement,
    isVisibleEmailAgreement,
    isVisibleSmsAgreement,
    isVisibleAppAgreement,
  } = React.useMemo(() => getAgreementConfig(group), [group]);

  const usernameData = React.useMemo(
    () => ({
      isLoading,
      value: username,
      error: usernameError,
      handler: handleUsernameChange,
    }),
    [handleUsernameChange, isLoading, username, usernameError],
  );

  const getAgreement = React.useCallback(():
    | Moim.User.IPostUserAdAgreementRequest
    | undefined => {
    if (
      !isVisibleSmsAgreement &&
      !isVisibleEmailAgreement &&
      !isVisibleAppAgreement
    ) {
      return undefined;
    }

    return {
      sms: {
        dayTime: {
          agreement: isVisibleSmsAgreement
            ? agreement.sms
              ? "accepted"
              : "refused"
            : "none",
        },
      },
      email: {
        dayTime: {
          agreement: isVisibleEmailAgreement
            ? agreement.email
              ? "accepted"
              : "refused"
            : "none",
        },
      },
      appPush: {
        dayTime: {
          agreement: isVisibleAppAgreement
            ? agreement.appPush
              ? "accepted"
              : "refused"
            : "none",
        },
      },
      webPush: {
        dayTime: {
          agreement: isVisibleAppAgreement
            ? agreement.appPush
              ? "accepted"
              : "refused"
            : "none",
        },
      },
    };
  }, [
    agreement,
    isVisibleEmailAgreement,
    isVisibleSmsAgreement,
    isVisibleAppAgreement,
  ]);

  const handleNextButtonClick = React.useCallback(async () => {
    if (usernameError) {
      return;
    }
    try {
      onNext({
        name: username,
        adAgreementV2: getAgreement(),
      });
    } catch (error) {
      if (error instanceof Error) {
        usernameSetError(errorParseData(error));
      }
    }
  }, [onNext, username, usernameError, getAgreement, usernameSetError]);

  const signupNameSettingTitle = useGroupTexts(
    "dialog_signup_name_setting_title",
  );

  const signupNameSettingDescription = useGroupTexts(
    "dialog_signup_name_setting_description",
  );

  const joinMoimStepData: Moim.Group.ICreateMoimStepData = React.useMemo(
    () => ({
      title: signupNameSettingTitle?.singular,
      subTitle: signupNameSettingDescription?.singular,
      description: (
        <FormattedMessage id="set_your_name/input_field_guide_can_change" />
      ),
      buttonText: <FormattedMessage id="set_your_name/button_set" />,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signupNameSettingDescription?.singular, signupNameSettingTitle?.singular],
  );

  return (
    <UsernameBase
      stepData={joinMoimStepData}
      handleButtonClick={handleNextButtonClick}
      data={usernameData}
      disabledButton={
        (isRequiredEmailAgreement && !agreement.email) ||
        (isRequiredSmsAgreement && !agreement.sms) ||
        (isRequiredAppAgreement && !agreement.appPush)
      }
      extraElement={
        <Agreement group={group} value={agreement} onChange={setAgreement} />
      }
    />
  );
}
