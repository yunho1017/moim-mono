import * as React from "react";
import BannerContext from "../../context";

import { fixedBannerStyle } from "./styled";
import SettingMoimBanner from "common/components/settingMoimBanner";

export default function SettingMoimBannerContainer({
  isOpenBanner,
}: {
  isOpenBanner: boolean;
}) {
  if (!isOpenBanner) {
    return null;
  }
  return (
    <BannerContext.Consumer>
      {({
        banner,
        isLoading,
        handleSuccessBannerUpload,
        handleStartBannerUpload,
        handleEndBannerUpload,
      }) => (
        <SettingMoimBanner
          banner={banner}
          isLoading={isLoading}
          onSucceed={handleSuccessBannerUpload}
          onStartLoading={handleStartBannerUpload}
          onFailed={handleEndBannerUpload}
          bannerFixedStyle={fixedBannerStyle}
        />
      )}
    </BannerContext.Consumer>
  );
}
