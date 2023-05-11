// vendor
import * as React from "react";
import { useHistory } from "react-router";
import { useIntl } from "react-intl";
// hook
import useMedia from "common/hooks/useMedia";
import useSuperPermission from "common/hooks/useSuperPermission";
// component
import { BaseItemCell } from "common/components/itemCell";
import { Title } from "./styled";
// helper
import { MEDIA_QUERY } from "common/constants/responsive";
import { MoimURL } from "common/helpers/url";

function SettingMenuContainer() {
  const { hasPermission: hasSuperPermission } = useSuperPermission();
  const isExceptMobile = useMedia([MEDIA_QUERY.EXCEPT_MOBILE], [true], false);
  const history = useHistory();
  const intl = useIntl();
  // TODO: Text Resource Key 변경 필요 아직 기획서에 명시되지 않음.
  const title = intl.formatMessage({ id: "overview_settings/page_title" });

  React.useEffect(() => {
    if (isExceptMobile && hasSuperPermission) {
      history.replace({
        ...new MoimURL.SettingMoimOverview().toObject(),
        state: {
          modal: true,
        },
      });
    }
  }, [hasSuperPermission, history, isExceptMobile]);

  return <BaseItemCell title={<Title>{title}</Title>} size="xl" />;
}

export default SettingMenuContainer;
