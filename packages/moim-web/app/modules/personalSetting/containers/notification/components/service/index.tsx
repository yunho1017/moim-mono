import * as React from "react";
import { FormattedMessage } from "react-intl";
import SettingCell from "app/modules/settingMoim/components/settingCell";
import SettingInput from "app/modules/settingMoim/components/settingInput";
import { Radio, Switch, Checkbox } from "common/components/designSystem/inputs";
import { IProps, useProps, useHandlers } from "./useHook";
import {
  Wrapper,
  WarningWrapper,
  GuideText,
  IconWrapper,
  InfoIcon,
  Divider,
  SettingInputWrapper,
  NotiIconOff,
  NotiIconNothing,
} from "./styled";
import NotifyMeInput from "./components/notifyMeInput";
import useIsMobile from "common/hooks/useIsMobile";
import SettingPageInfo from "app/modules/personalSetting/components/SettingPageInfo";

function NotificationSettingComponent(props: IProps) {
  const {
    moimName,
    isDenied,
    notiSupport,
    status,
    hasEmail,
    notificationSetting,
    handleChangeStatus,
    handleChangeEmail,
    handleNotificationDetailChange,
  } = useHandlers(useProps(props));

  const isMobile = useIsMobile();

  const warningElement = React.useMemo(
    () =>
      (isDenied || !notiSupport) && (
        <WarningWrapper>
          <IconWrapper>
            <InfoIcon />
          </IconWrapper>
          <GuideText>
            <FormattedMessage
              id={
                isDenied
                  ? "notification_settings/alert_banner_turn_off_notification"
                  : "notification_settings/alert_banner_not_support_browser"
              }
            />
          </GuideText>
        </WarningWrapper>
      ),
    [isDenied, notiSupport],
  );

  return (
    <Wrapper>
      <SettingPageInfo
        title={
          <FormattedMessage id="personal_settings_menu_service_notifications" />
        }
      ></SettingPageInfo>
      {warningElement}
      <Divider />
      <SettingCell
        title={
          <FormattedMessage
            id="notification_settings_active_title"
            values={{ moim_name: moimName }}
          />
        }
        description={
          <FormattedMessage
            id="personal_settings_menu_service_notifications_guide"
            values={{ moim_name: moimName }}
          />
        }
        hasDivider={false}
      >
        <NotifyMeInput
          alarmNotificationSetting={notificationSetting.alarmNotification}
          status={status}
          onChangeStatus={handleChangeStatus}
          onChange={handleNotificationDetailChange}
        />
      </SettingCell>

      <SettingCell>
        <SettingInputWrapper>
          <SettingInput
            input={
              <Radio
                name="notification_global"
                value="mute"
                defaultChecked={status === "mute"}
                onChange={handleChangeStatus}
              />
            }
            direction="horizontal"
            title={<FormattedMessage id="notification_settings/mute" />}
            description={
              <FormattedMessage id="notification_settings/mute_guide" />
            }
            rightPadding={16}
            leftIconElement={<NotiIconOff></NotiIconOff>}
          />
        </SettingInputWrapper>

        <SettingInputWrapper>
          <SettingInput
            input={
              <Radio
                name="notification_global"
                value="nothing"
                defaultChecked={status === "nothing"}
                onChange={handleChangeStatus}
              />
            }
            direction="horizontal"
            title={<FormattedMessage id="notification_settings/nothing" />}
            description={
              <FormattedMessage id="notification_settings/nothing_guide" />
            }
            rightPadding={16}
            leftIconElement={<NotiIconNothing></NotiIconNothing>}
          />
        </SettingInputWrapper>
      </SettingCell>

      <SettingCell
        hasDivider={false}
        title={<FormattedMessage id="notification_settings/not_active_title" />}
        description={
          <FormattedMessage id="notification_settings/not_active_guide" />
        }
      >
        <SettingInput
          title={
            <FormattedMessage id="notification_settings/email_notification_option" />
          }
          input={
            isMobile ? (
              <Switch
                name="notification_type_email"
                value="email"
                disabled={!hasEmail}
                onChange={handleChangeEmail}
                checked={notificationSetting.alarmNotification.allowed.email}
              />
            ) : (
              <Checkbox
                name="notification_type_email"
                value="email"
                disabled={!hasEmail}
                onChange={handleChangeEmail}
                checked={notificationSetting.alarmNotification.allowed.email}
              />
            )
          }
          direction="horizontal"
          rightPadding={16}
        />
      </SettingCell>
    </Wrapper>
  );
}

export default React.memo(NotificationSettingComponent);
