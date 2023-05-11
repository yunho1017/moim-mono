import * as React from "react";
import { useLocation } from "react-router";
import PopupBanner from "common/components/popupBanner";
import AppDownloadPromoteBottomSheet from "common/components/promotion/bottomSheet/appDownload";
import { MoimURL } from "common/helpers/url";

const BLACK_LIST = [
  MoimURL.ExternalMoimBlockitEditor,
  MoimURL.MeetingHome,
  MoimURL.About,
];

/**
 * NOTE: 만약 각각 다른 Black-list를 가져야한다면 다이알로그별로 블랙리스트를 쪼개고, disable 환경을 다르게 해주시면 됩니다.
 */
const GlobalDialogControlCenter: React.FC = () => {
  const location = useLocation();
  const commonDisable = React.useMemo(
    () => Boolean(BLACK_LIST.find(urlObj => urlObj.isSame(location.pathname))),
    [location],
  );

  if (commonDisable) {
    return null;
  }

  return (
    <>
      <PopupBanner />
      <AppDownloadPromoteBottomSheet />
    </>
  );
};

export default React.memo(GlobalDialogControlCenter);
