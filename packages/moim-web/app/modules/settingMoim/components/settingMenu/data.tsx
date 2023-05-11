import { IntlShape } from "react-intl";
import { MoimURL } from "common/helpers/url";

// TODO: 아직 어떤 매뉴들이 들어오는지 완전히 Fix 되지 않음.
export default function settingMenuGenerator(
  intl: IntlShape,
  hasSuperPermission: boolean,
  canCreateSubMoim: boolean,
) {
  const menus: Moim.Setting.ISettingMenu[] = [];

  if (hasSuperPermission) {
    menus.push(
      ...[
        {
          text: intl.formatMessage({ id: "overview_settings/page_title" }),
          location: MoimURL.SettingMoimOverview.pattern,
        },

        {
          text: intl.formatMessage({ id: "position_settings/title" }),
          location: MoimURL.SettingMoimPosition.pattern,
        },
        {
          text: intl.formatMessage({ id: "admin_tools/menu_analytics" }),
          location: MoimURL.SettingMoimAnalytics.pattern,
        },
      ],
    );

    if (canCreateSubMoim) {
      menus.push({
        text: "베이크 액션 만들기",
        location: MoimURL.SettingCreateSubMoim.pattern,
      });
    }
  }
  return menus;
}
