import * as React from "react";
import { css } from "styled-components";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/modules/navigation/navigation.min.css";
import { FormattedMessage } from "react-intl";
// hooks
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";
import useIsMobile from "common/hooks/useIsMobile";
// components
import Media from "../media";
import { Spacer } from "common/components/designSystem/spacer";
// styled
import {
  LeftIconResource,
  RightIconResource,
  SubMediaWrapper,
  ArrowBox,
  SubMediaTop,
} from "./styled";
import { SectionTitle, WideDivider } from "../../../styled";
import { px2rem } from "common/helpers/rem";

const VideoStyle = css`
  .vjs-seek-to-live-control.vjs-control,
  .vjs-remaining-time.vjs-time-control.vjs-control,
  .vjs-picture-in-picture-control.vjs-control.vjs-button {
    display: none;
  }
  .video-js .vjs-tech {
    border-radius: ${px2rem(4)};
    overflow: hidden;
  }
  .vjs-poster {
    border-radius: ${px2rem(4)};
    overflow: hidden;
  }
`;

interface IProps {
  subItemMetadata?: Moim.NFT.IResource[];
  subMediaTitle?: Moim.NFT.ISubMediaTitle[];
}

const SubMedia: React.FC<IProps> = ({
  subItemMetadata,
  subMediaTitle,
}: IProps) => {
  const isMobile = useIsMobile();
  const locale = useCurrentUserLocale();

  const subMediaTextKey = React.useMemo(() => {
    if (!subMediaTitle) return null;
    return subMediaTitle?.filter(
      item => item.locale.toUpperCase() === locale.toUpperCase(),
    )[0].value;
  }, [locale, subMediaTitle]);

  const itemElements = React.useMemo(() => {
    if (!subItemMetadata?.length) return null;

    return subItemMetadata.map(item => (
      <SwiperSlide>
        <Media
          key={item.url}
          src={item.url}
          metaData={{
            mimeType: item.mimeType ?? "",
            width: item.width ?? 180,
            height: item.height ?? 180,
          }}
          poster={item.previewUrl}
          videoOptions={{
            aspectRatio: item.ratio,
            autoplay: isMobile ? false : true,
          }}
          videoStyle={VideoStyle}
        />
      </SwiperSlide>
    ));
  }, [isMobile, subItemMetadata]);

  if (!subItemMetadata || !subItemMetadata?.length) return null;

  return (
    <SubMediaWrapper>
      <Spacer value={isMobile ? 12 : 16} />
      <WideDivider />
      <SubMediaTop>
        <SectionTitle disableSidePadding={true}>
          {subMediaTextKey?.length ? (
            subMediaTextKey
          ) : (
            <FormattedMessage id="nft_item_submedia_title_default" />
          )}
        </SectionTitle>
        {!isMobile && subItemMetadata.length > 2 && (
          <div>
            <ArrowBox className="swiper-prev-button">
              <LeftIconResource />
            </ArrowBox>
            <ArrowBox className="swiper-next-button">
              <RightIconResource />
            </ArrowBox>
          </div>
        )}
      </SubMediaTop>
      <Spacer value={9} />
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-prev-button",
          nextEl: ".swiper-next-button",
        }}
        slidesPerView={!isMobile ? 2 : subItemMetadata.length > 2 ? "auto" : 2}
        spaceBetween={12}
        preventClicksPropagation={true}
      >
        {itemElements}
      </Swiper>
      {isMobile && <Spacer value={24} />}
    </SubMediaWrapper>
  );
};

export default React.memo(SubMedia);
