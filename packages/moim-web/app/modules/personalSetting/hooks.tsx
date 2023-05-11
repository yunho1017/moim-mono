import * as React from "react";
import { useIntl } from "react-intl";
// helpers
import menuGenerator from "./helpers/menuGenerator";
// hooks
import useSuperPermission from "common/hooks/useSuperPermission";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useGroupTexts from "common/hooks/useGroupTexts";

export function useProps(props: any) {
  const intl = useIntl();
  const currentGroup = useCurrentGroup();
  const signUpAdagreement = currentGroup?.sign_up_config_v2.adAgreement;
  const childMoimNameTexts = useGroupTexts("child_moim");
  const { hasPermission: hasSuperPermission } = useSuperPermission();

  const deactivatedMarketingMenu = React.useMemo(() => {
    if (signUpAdagreement) {
      return (
        signUpAdagreement.appPush.dayTime.state === "deactivated" &&
        signUpAdagreement.sms.dayTime.state === "deactivated" &&
        signUpAdagreement.email.dayTime.state === "deactivated"
      );
    } else {
      return false;
    }
  }, [signUpAdagreement]);

  const menus = React.useMemo(
    () =>
      menuGenerator(
        intl,
        hasSuperPermission,
        Boolean(currentGroup?.parent),
        childMoimNameTexts?.singular,
        deactivatedMarketingMenu,
      ),
    [
      intl,
      hasSuperPermission,
      currentGroup,
      childMoimNameTexts,
      deactivatedMarketingMenu,
    ],
  );

  return {
    ...props,
    menus,
  };
}
