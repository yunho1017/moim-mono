import * as React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import moment from "moment";
import SettingCell from "app/modules/settingMoim/components/settingCell";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { Switch, Checkbox } from "common/components/designSystem/inputs";
import { Wrapper } from "./styled";
import { useActions } from "app/store";
import { updateMyProfile } from "app/actions/me";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import useIsMobile from "common/hooks/useIsMobile";
import SettingPageInfo from "app/modules/personalSetting/components/SettingPageInfo";

interface IProps {
  adAgreementSetting: {
    sms: boolean;
    appPush: boolean;
    email: boolean;
  };
  hasEmail: boolean;
}

export default function NotificationMarketingComponent(props: IProps) {
  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();
  const isMobile = useIsMobile();
  const intl = useIntl();
  const { openSnackbar } = useActions({
    openSnackbar: SnackbarActionCreators.openSnackbar,
  });
  const { putUserData } = useActions({
    putUserData: updateMyProfile,
  });
  const [adAgreement, setAdAgreement] = React.useState(
    props.adAgreementSetting,
  );

  const handlePutUserData = React.useCallback(
    async (value: string, checked: boolean) => {
      // TODO : webPush UI 생기기전까지는 appPush 값이 밖이면 webPush 값도 업데이트 되도록 처리, 추후 webpush 생기면 if 문 삭제
      if (value === "appPush") {
        await putUserData(
          {
            adAgreementV2: {
              [value]: {
                dayTime: {
                  agreement: checked ? "accepted" : "refused",
                },
              },
              webPush: {
                dayTime: {
                  agreement: checked ? "accepted" : "refused",
                },
              },
            },
          },
          cancelToken.current.token,
        );
      } else {
        await putUserData(
          {
            adAgreementV2: {
              [value]: {
                dayTime: {
                  agreement: checked ? "accepted" : "refused",
                },
              },
            },
          },
          cancelToken.current.token,
        );
      }
    },
    [cancelToken, putUserData],
  );

  const handleChangeAdAgreement = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      // TODO : webPush UI 생기기전까지는 appPush 텍스트키는 push, 추후 webPush 생기면 삭제
      const valueTextKey = value === "appPush" ? "push" : value;
      const onOffTextKey = checked ? "on" : "off";
      setAdAgreement(prevState => ({
        ...prevState,
        [value]: checked,
      }));
      handlePutUserData(value, checked);
      const currentDateMillisecond = new Date().toISOString();
      const dateTime = moment(currentDateMillisecond).format(
        intl.formatMessage({ id: "datetime_format_short_date" }),
      );
      openSnackbar({
        textElement: (
          <FormattedMessage
            id={`toast_message_marketing_notifications_${valueTextKey}_${onOffTextKey}`}
            values={{ moim_name: currentGroup?.name ?? "", date: dateTime }}
          />
        ),
      });
    },
    [currentGroup?.name, handlePutUserData, intl, openSnackbar],
  );

  return (
    <Wrapper>
      <SettingPageInfo
        title={
          <FormattedMessage id="personal_settings_menu_marketing_notifications" />
        }
        description={
          <FormattedMessage id="personal_settings_menu_marketing_notifications_guide" />
        }
      ></SettingPageInfo>
      <SettingCell hasDivider={false}>
        <SettingInput
          title={
            <FormattedMessage id="notification_settings_marketing_notifications_sms" />
          }
          input={
            !isMobile ? (
              <Checkbox
                name="notification_settings_marketing_notifications_sms"
                value="sms"
                onChange={handleChangeAdAgreement}
                checked={adAgreement.sms}
              />
            ) : (
              <Switch
                name="notification_settings_marketing_notifications_sms"
                value="sms"
                onChange={handleChangeAdAgreement}
                checked={adAgreement.sms}
              />
            )
          }
          direction="horizontal"
        />
        <SettingInput
          title={
            <FormattedMessage id="notification_settings_marketing_notifications_email" />
          }
          input={
            !isMobile ? (
              <Checkbox
                name="notification_settings_marketing_notifications_email"
                value="email"
                disabled={!props.hasEmail}
                onChange={handleChangeAdAgreement}
                checked={adAgreement.email}
              />
            ) : (
              <Switch
                name="notification_settings_marketing_notifications_email"
                value="email"
                disabled={!props.hasEmail}
                onChange={handleChangeAdAgreement}
                checked={adAgreement.email}
              />
            )
          }
          direction="horizontal"
        />
        <SettingInput
          title={
            <FormattedMessage id="notification_settings_marketing_notifications_push" />
          }
          input={
            !isMobile ? (
              <Checkbox
                name="notification_settings_marketing_notifications_push"
                value="appPush"
                onChange={handleChangeAdAgreement}
                checked={adAgreement.appPush}
              />
            ) : (
              <Switch
                name="notification_settings_marketing_notifications_push"
                value="appPush"
                onChange={handleChangeAdAgreement}
                checked={adAgreement.appPush}
              />
            )
          }
          direction="horizontal"
        />
      </SettingCell>
    </Wrapper>
  );
}
