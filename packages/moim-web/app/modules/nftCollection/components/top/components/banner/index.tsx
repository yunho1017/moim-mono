import * as React from "react";
// components
import { SkeletonBox } from "common/components/skeleton";
// styled
import {
  BannerEmptyBox,
  CollectionShowBannerImgWrapper,
  CollectionShowBannerWrapper,
  CollectionShowRepresentWrapper,
} from "./styled";

interface IProps {
  bannerUrl?: string;
  representImgUrl?: string;
  headerButtonElement?: React.ReactNode;
}

const CollectionShowBanner: React.FC<IProps> = ({
  bannerUrl,
  representImgUrl,
  headerButtonElement,
}: IProps) => (
  <CollectionShowBannerWrapper>
    {headerButtonElement}
    <CollectionShowBannerImgWrapper>
      {bannerUrl ? <img src={bannerUrl} /> : <BannerEmptyBox />}
    </CollectionShowBannerImgWrapper>
    <CollectionShowRepresentWrapper>
      {representImgUrl ? (
        <img src={representImgUrl} />
      ) : (
        <SkeletonBox width="100%" height="100%" />
      )}
    </CollectionShowRepresentWrapper>
  </CollectionShowBannerWrapper>
);

export default React.memo(CollectionShowBanner);
