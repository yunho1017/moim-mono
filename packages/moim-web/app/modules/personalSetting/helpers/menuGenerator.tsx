import { IntlShape } from "react-intl";
import { MoimURL } from "common/helpers/url";

export default function menuGenerator(
  intl: IntlShape,
  hasSuperPermission: boolean,
  isChildMoim: boolean,
  childMoimNameAlias?: string,
  deactivatedMarketingMenu: boolean = false,
) {
  const menus: Moim.Setting.ISettingMenu[] = [
    {
      text: intl.formatMessage({
        id: "moim_settings/menu_profile_settings",
      }),
      location: MoimURL.PersonalSettingProfile.pattern,
    },
    {
      text: intl.formatMessage({
        id: "notification_settings_navigation_title",
      }),
      location: MoimURL.PersonalSettingNotificationMoim.pattern,
      isParentMenu: true,
      childMenus: !deactivatedMarketingMenu
        ? [
            {
              text: intl.formatMessage({
                id: "personal_settings_menu_service_notifications",
              }),
              location: MoimURL.PersonalSettingNotificationService.pattern,
              isChildMenu: true,
            },
            {
              text: intl.formatMessage({
                id: "personal_settings_menu_marketing_notifications",
              }),
              location: MoimURL.PersonalSettingNotificationMarketing.pattern,
              isChildMenu: true,
            },
          ]
        : [
            {
              text: intl.formatMessage({
                id: "personal_settings_menu_service_notifications",
              }),
              location: MoimURL.PersonalSettingNotificationService.pattern,
              isChildMenu: true,
            },
          ],
    },
    {
      text: intl.formatMessage({
        id: "personal_settings_menu_privacy_and_safety",
      }),
      location: MoimURL.PersonalSettingPrivacy.pattern,
    },
  ];
  if (hasSuperPermission) {
    // Fill for Super permission user's menu
  }
  menus.push({
    text: intl.formatMessage({
      id: "moim_settings/menu_individual_moim_policy",
    }),
    location: MoimURL.AboutPolicy.pattern,
    openNewTab: true,
  });

  menus.push(
    ...[
      {
        text: intl.formatMessage(
          {
            id: isChildMoim
              ? "personal_settings_menu_leave_child_moim"
              : "personal_settings_menu_leave_parent_moim",
          },
          { ref_child_moim: childMoimNameAlias ?? "" },
        ),
        location: MoimURL.PersonalSettingMoimLeave.pattern,
      },
    ],
  );

  return menus;
}
