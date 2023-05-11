export function getAgreementConfig(group?: Moim.Group.INormalizedGroup | null) {
  const agreementConfig = group?.sign_up_config_v2.adAgreement;

  if (!agreementConfig) {
    return {
      isRequiredEmailAgreement: false,
      isVisibleEmailAgreement: false,
      isRequiredSmsAgreement: false,
      isVisibleSmsAgreement: false,
      isRequiredAppAgreement: false,
      isVisibleAppAgreement: false,
    };
  }

  return {
    isRequiredEmailAgreement:
      agreementConfig.email.dayTime.state === "required",

    isVisibleEmailAgreement:
      agreementConfig.email.dayTime.state !== "deactivated",

    isRequiredSmsAgreement: agreementConfig.sms.dayTime.state === "required",

    isVisibleSmsAgreement: agreementConfig.sms.dayTime.state !== "deactivated",

    isRequiredAppAgreement:
      agreementConfig.appPush.dayTime.state === "required",

    isVisibleAppAgreement:
      agreementConfig.appPush.dayTime.state !== "deactivated",
  };
}
