// vendor
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { FlattenInterpolation } from "styled-components";
import { useInView } from "react-intersection-observer";
// component
import { MoimBannerUploader } from "common/components/moimImageUploader";
import BannerWithFixedSensor from "common/components/bannerWithFixedSensor";
import { DefaultLoader } from "common/components/loading";
import MediaUploadInput from "app/modules/mediaUpload/input";
import { EditButton } from "./styled";

interface IProps extends React.ComponentProps<typeof MoimBannerUploader> {
  banner: Moim.IBanner;
  isLoading: boolean;
  bannerFixedStyle?: FlattenInterpolation<any>;
}

function SettingMoimBanner(props: IProps) {
  const { banner, bannerFixedStyle, isLoading, ...rest } = props;
  const [bannerFixedSensorRef, isFixed] = useInView();

  const iconInputRef: React.RefObject<MediaUploadInput> = React.useRef(null);
  const handleClickBanner = React.useCallback(() => {
    const target = iconInputRef.current;
    if (target) {
      target.trigger();
    }
  }, [iconInputRef]);

  return (
    <>
      <BannerWithFixedSensor
        ref={bannerFixedSensorRef}
        banner={banner}
        isFixed={isFixed}
        bannerFixedStyle={bannerFixedStyle}
        onClick={handleClickBanner}
      >
        <EditButton>
          {!isLoading ? (
            <FormattedMessage id="overview_settings/edit_banner" />
          ) : (
            <DefaultLoader />
          )}
        </EditButton>
      </BannerWithFixedSensor>
      <MoimBannerUploader aspectRatio={3} ref={iconInputRef} {...rest} />
    </>
  );
}

export default SettingMoimBanner;
